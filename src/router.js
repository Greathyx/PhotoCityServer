var router = require('koa-router')();
const passport = require('koa-passport');
const UserService = require('./service/UserService');
const hostUrl = require('./utils/hostUrl');

/**
 *
 * the basic route
 *
 */
router.get('/',
    ctx => {
        ctx.response.body = {message: 'hello koa'};
    }
);


/**
 *
 * login route
 *
 */
router.post('/login', ctx => {

    // if use form-data, the data passed by bodyParser is in ctx.request.body.fields
    ctx.request.body.username = ctx.request.body.fields.username;
    ctx.request.body.password = ctx.request.body.fields.password;

    // 会调用策略
    return passport.authenticate('local', function (err, user, info, status) {
        if (err) {
            ctx.response.body = {message: 'error'}
        }
        else if (user === false) {
            ctx.response.body = info;
            //ctx.throw(401)
        } else {
            ctx.response.body = info;
            return ctx.login(user)
        }
    })(ctx)
});


/**
 *
 * register route
 *
 */
router.post('/register', async ctx => {

    // let fields = ctx.request.body;
    let fields = ctx.request.body.fields;

    if (!fields.username || !fields.password || !fields.email) {
        ctx.throw(500);
    }

    let result = await UserService.addUser({username: fields.username, password: fields.password, email: fields.email});

    ctx.response.body = result;
});


/**
 *
 * logout route
 *
 */
router.get('/logout', ctx => {
    ctx.logout();
    ctx.body = {auth: ctx.isAuthenticated(), user: ctx.state.user};
    ctx.response.body = {auth: ctx.isAuthenticated()};
});


/**
 *
 * To confirm if a user has logged in
 *
 * Usage: use isAuthenticated as a middleware
 *
 * @param ctx
 * @param next: the next middleware
 * @returns {*}
 */
var isAuthenticated = (ctx, next) => {
    if (ctx.isAuthenticated())
        return next();
    else
        ctx.response.body = {message: 'Please login first!'};
};


/**
 *
 * To test if authenticated
 *
 */
router.get('/testAuth', isAuthenticated, ctx => {
    ctx.response.body = {message: 'You have logged in.'};
});


/**
 *
 * upload photos route
 *
 * accept formData: {file[type=file]: value}
 *
 */
router.post('/uploadPhotos', ctx => {
    let fields = ctx.request.body.files;
    let absoluteUrl = fields.file.path;
    let hostImgName = absoluteUrl.substring(absoluteUrl.lastIndexOf('/'), absoluteUrl.length);
    // console.log(hostImgName);
    ctx.body = {imgUrl: hostUrl.ip + hostImgName};
});


module.exports = router;