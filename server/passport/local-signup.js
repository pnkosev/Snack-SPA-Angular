const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const encryption = require('../utilities/encryption');

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const user = {
    email: email.trim(),
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
  }
  User
    .findOne({ email: email })
    .then(u => {
      if (u) {
        return done('Email already exists!');
      }

      const salt = encryption.generateSalt();
      user.salt = salt;
      user.hashedPassword = encryption.generateHashedPassword(salt, req.body.password);
      user.roles = ['User'];

      User
        .create(user)
        .then(() => {
          return done(null);
        })
        .catch(() => {
          return done('Something went wrong :( Check the form for errors.');
        })
    })
    .catch(err => {
      return done(err);
    })
})
