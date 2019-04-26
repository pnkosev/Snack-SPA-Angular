const passport = require('passport');
const localRegisterStrategy = require('../passport/local-signup');
const localLoginStrategy = require('../passport/local-login');
const jwtStrategy = require('../passport/jwt');
const jwtCookieCombo = require('../passport/jwtCookieCombo');

module.exports = () => {
  passport.use('local-signup', localRegisterStrategy);
  passport.use('local-login', localLoginStrategy);
  passport.use('jwt', jwtStrategy);
  passport.use('jwt-cookiecombo', jwtCookieCombo);
}
