const router = require('express').Router();
const { body } = require('express-validator/check');

const authController = require('../controllers/auth');
const { isAuth, authorized } = require('../config/auth-check');
const User = require('../models/User');

router.post('/register',
  [
    body('email')
      .trim()
      .not().isEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User
          .findOne({ email: value })
          .then(user => {
            if (user) {
              return Promise.reject('Username already exists!');
            }
          })
      }),
    body('firstName')
      .trim()
      .not().isEmpty()
      .isLength({ min: 3 })
      .withMessage('Please enter a valid first name.'),
    body('lastName')
      .trim()
      .not().isEmpty()
      .isLength({ min: 3 })
      .withMessage('Please enter a valid last name.'),
    body('password')
      .trim()
      .not().isEmpty()
      .isLength({ min: 3 })
      .withMessage('Please enter a valid password.'),
  ],
  authController.register);

router.post('/login',
  [
    body('email')
      .trim()
      .not().isEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please enter a valid username.'),
    body('password')
      .trim()
      .not().isEmpty()
      .isLength({ min: 3 })
      .withMessage('Please enter a valid password.'),
  ],
  authController.login);

router.get('/protected', authorized, authController.protected);

// passport.authenticate('jwt-cookiecombo', {
//   session: false
// }), (req, res, next) => {
//   console.log(req.signedCookies.jwt);
//   return next();
// }

router.get('/logout', isAuth, authController.logout);

router.get('/profile', isAuth, authController.getProfile);

module.exports = router;