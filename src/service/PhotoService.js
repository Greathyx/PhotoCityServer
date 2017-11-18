const PhotoModel = require('../model').Photo;

/**
 * photo:{
 *      origin: string
 *      sImg: string
 *      bImg: string
 * }
 *
 * return:
 *      message: success
 *
 */
async function addPhoto(photo) {

    await PhotoModel.create({
        origin: photo.origin,
        sImg: photo.sImg,
        bImg: photo.bImg
    });

}

/**
 *
 * delete a photo from database
 *
 * @param id
 * @returns {Promise.<void>}
 */
async function deletePhoto(id) {

    let photo = await getPhotoById(id);
    photo.destroy();

}

/**
 *
 * id: int
 *
 */
async function getPhotoById(id) {

    return await PhotoModel.findById(id);

}

/**
 *
 * add liked times by 1 to a certain photo
 *
 * @param id
 * @returns {Promise.<void>}
 */
async function likePhoto(id) {

    let photo = await getPhotoById(id);
    photo.increment('liked_times');

}

/**
 *
 * minus liked times by 1 to a certain photo
 *
 * @param id
 * @returns {Promise.<void>}
 */
async function cancelLikePhoto(id) {

    let photo = await getPhotoById(id);
    photo.decrement('liked_times');

}