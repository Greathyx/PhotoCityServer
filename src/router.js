var router = require('koa-router')();
const passport = require('koa-passport');

router.get('/',
    ctx => {
        ctx.body = {message: 'hello koa'};
    }
);

router.post('/login', ctx => {
    // 会调用策略
    return passport.authenticate('local', function (err, user, info, status) {
        if (err) {
            ctx.body = {message: 'some error!!!'}
        }
        if (user === false) {
            // ctx.body = {username: user.username, password: user.password}
            ctx.body = {message: 'wrong password or username not exist'}
            //ctx.throw(401)
        } else {
            ctx.body = {message: 'login success', userId: user.id, username: user.username, password: user.password};
            return ctx.login(user)
        }
    })(ctx)
});

router.get('/logout', ctx => {
    ctx.logout();
    ctx.body = {auth: ctx.isAuthenticated(), user: ctx.state.user}
});

var isAuthenticated = (ctx, next) => {
    if (ctx.isAuthenticated())
        return next();
    else
        //ctx.redirect('/login');
        ctx.body = {message: 'Please login first!'};
};

router.get('/testAuth', isAuthenticated, ctx => {
    ctx.body = {message: 'You have logged in.'};
});


module.exports = router;