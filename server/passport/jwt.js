const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;

const config = require('../config/config');

module.exports = (new JWTStrategy({
    jwtFromRequest: req => req.signedCookies.jwt,
    jwtCookieName: 'jwt',
    secretOrKey: config.jwt.secret,
}, (jwtPayload, done) => {

    // if (Date.now() > jwtPayload.expires) {
    //     return done('jwt expired');
    // }
    return done(null, jwtPayload);
}
));;