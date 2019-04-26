module.exports = {
    development: {
        port: process.env.PORT || 9999,
        dbPath: 'mongodb://localhost:27017/snack-spa-db',
    },
    staging: {
    },
    production: {
        port: process.env.PORT
    },
    jwt: {
        secret: process.env.JWT_SECRET || '5ht175M3g4S3cr37',
        options: {
            // audience: 'https://example.io',
            expiresIn: '1h',
            // issuer: 'example.io'
        },
        cookie: {
            httpOnly: true,
            signed: true,
            // secure: true  >>> for https only!!!
        }
    }
};