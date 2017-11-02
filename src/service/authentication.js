const passport = require('koa-passport');
var LocalStrategy = require('passport-local').Strategy;

const fetchUser = (() => {
    // This is an example! Use password hashing in your
    const user = {id: 1, username: 'test', password: 'test'};
    return async function () {
        return user
    }
})();

// 序列化ctx.login()触发
passport.serializeUser(function (user, done) {
    console.log('serializeUser: ', user);
    done(null, user.id)
});

// 反序列化（请求时，session中存在{"username":"xxx","password":"xxx"}时触发）
passport.deserializeUser(async function (id, done) {
    try {
        const user = await fetchUser();
        done(null, user)
    } catch (err) {
        done(err)
    }
    console.log('deserializeUser: ', id);
});

// 提交数据(策略)
passport.use(new LocalStrategy({
        // usernameField: 'email',
        // passwordField: 'password'
    },
    function (username, password, done) {
        fetchUser()
            .then(user => {
                if (username === user.username && password === user.password) {
                    done(null, user)
                } else {
                    done(null, false, {message: 'wrong password or username not exist'})
                }
            })
            .catch(err => done(err))
    }));

module.exports = passport;