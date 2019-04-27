const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;

const config = require('../config/config');
const User = require('../models/User');


module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userToLogin = {
    email: email.trim(),
    password: password.trim()
  }

  User
    .findOne({ email: userToLogin.email })
    .then(user => {
      if (!user || !user.authenticate(userToLogin.password)) {
        const error = new Error('Incorrect username or password');
        error.name = 'IncorrectCredentialsError';
        return done(error)
      }

      const payload = {
        sub: user._id
      }
      const token = jwt.sign(payload, config.jwt.secret, config.jwt.options);
      const data = {
        email: user.email,
        userId: user._id
      };

      if (user.roles) {
        data.roles = user.roles
      };

      return done(null, token, data);
    })
})
