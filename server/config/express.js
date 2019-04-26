const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
    next();
  });
  console.log('Express ready!');
}
