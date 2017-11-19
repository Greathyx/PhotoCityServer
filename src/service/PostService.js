const PostModel = require('../model').Post;


async function addPost(post) {

    let result = await PostModel.create({
        description: post.description,
        authorId: post.authorId
    });
    return result.id;
}

module.exports = {
    addPost,
};