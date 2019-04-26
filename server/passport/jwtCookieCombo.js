var JwtCookieComboStrategy = require('passport-jwt-cookiecombo');
const config = require('../config/config');

module.exports = new JwtCookieComboStrategy({
    secretOrPublicKey: config.jwt.secret,
    jwtCookieName: 'jwt'
}, (payload, done) => {
    // console.log(payload.sub);
    console.log('we here yo!');
    return done(null, payload);
});