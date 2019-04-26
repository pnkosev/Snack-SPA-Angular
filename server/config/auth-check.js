const jwt = require('jsonwebtoken');
const User = require('../models/User');

const config = require('../config/config');

function verifyToken(req, res) {
    const token = req.get('Authorization').split(' ')[1];
    return new Promise((res, rej) => {
        jwt.verify(token, config.jwt.secret, (err, decodedToken) => {
            if (err) {
                rej();
            }
            req.userId = decodedToken.userId;
            res();
        })
    })
}

function httpOnlyCookie(req, res) {
    const token = req.signedCookies.jwt;
    return new Promise((res, rej) => {
        jwt.verify(token, config.jwt.secret, (err, decodedToken) => {
            if (err) {
                rej();
            }
            req.userId = decodedToken.sub;
            res();
        })
    })
}

module.exports = {
    isAuth: (req, res, next) => {

        const authHeaders = req.get('Authorization');

        if (!authHeaders) {
            return res.status(401)
                .json({ message: 'You have to be authenticated to have access.' });
        }

        verifyToken(req)
            .then(() => {
                next();
            })
            .catch(() => {
                return res.status(401).json({
                    //message: 'Token verification failed!'
                    message: 'Access denied!'
                });
            });
    },
    isInRole: (role) => {
        return (req, res, next) => {
            if (req.headers.authorization) {
                verifyToken(req)
                    .then(() => {
                        User.findById(req.userId).then((user) => {
                            let isInRole = user.roles.indexOf(role) !== -1;

                            if (isInRole) {
                                next();
                            } else {
                                return res.status(401).json({
                                    message: 'You need to be an admin to access this!'
                                });
                            }
                        })
                    })
                    .catch(() => {
                        return res.status(401).json({
                            message: 'Access denied!'
                        });
                    });
            } else {
                return res.status(401).json({
                    message: 'You need to be logged in to access this!'
                });
            }
        };
    },
    authorized: (req, res, next) => {
        if (req.signedCookies) {
            httpOnlyCookie(req)
                .then(() => {
                    next();
                })
                .catch(() => {
                    return res.status(401).json({
                        //message: 'Token verification failed!'
                        message: 'Access denied!'
                    });
                });
        } else {
            return res.status(401).json({
                //message: 'Token verification failed!'
                message: 'Access denied!'
            });
        }
    }
}