let env = process.env.NODE_ENV || 'development';
let config = require('./config/config');

const cookieParser = require('cookie-parser');
const passport = require('passport');
const app = require('express')();

require('./config/express')(app);
require('./config/database')(config[env]);
app.use(cookieParser(config.jwt.secret));
require('./config/routes')(app);
require('./config/passport')(passport);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
    next();
})

app.listen(config[env].port);
console.log(`Server listening on port ${config[env].port}...`);