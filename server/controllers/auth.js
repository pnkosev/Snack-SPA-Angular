const { validationResult } = require('express-validator/check');
const passport = require('passport');
const User = require('../models/User');

const config = require('../config/config');

function validateUser(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).json({
			success: false,
			message: 'Validation failed, entered data is incorrect',
			errors: errors.array()
		});
		return false;
	}
	return true;
}

module.exports = {
	register: (req, res, next) => {
		if (validateUser(req, res)) {
			// const { username, email, password } = req.body;
			// const salt = encryption.generateSalt();
			// const hashedPassword = encryption.generateHashedPassword(salt, password);

			// User
			// 	.create({
			// 		username,
			// 		email,
			// 		salt,
			// 		hashedPassword,
			// 		roles: ['User']
			// 	})
			// 	.then((user) => {

			// 		const token = jwt.sign({
			// 			username: user.username,
			// 			userId: user._id.toString()
			// 		}, config.JWTSecret, {
			// 				expiresIn: '1h'
			// 			});

			// 		res.status(201)
			// 			.json({
			// 				success: true,
			// 				message: `User created successfully! Welcome, ${user.username}!`,
			// 				token,
			// 				userId: user._id,
			// 				username: user.username,
			// 				isAdmin: user.roles.indexOf('Admin') !== -1,
			// 			});
			// 	})
			// 	.catch((error) => {
			// 		if (!error.statusCode) {
			// 			error.statusCode = 500;
			// 		}
			// 		next(error);
			// 	});
			passport.authenticate('local-signup', (err) => {
				if (err) {
					return next(err);
				} else {
					res
						.json({
							success: true,
							message: `You have successfully signed up! Now you should be able to log in.`
						});
				}
			})(req, res, next)
		}
	},
	login: (req, res, next) => {
		if (validateUser(req, res)) {
			passport.authenticate('local-login', (err, token, userData) => {
				if (err) {
					return next(err);
				} else {
					res
						.cookie('jwt', token, config.jwt.cookie)
						.json({
							success: true,
							message: `You have successfully logged in, ${userData.username}!`,
							jwt: token,
							user: userData,
						});
				}
			})(req, res, next)
		}
	},
	getProfile: (req, res, next) => {
		const userId = req.userId;

		User
			.findById(userId)
			.populate({
				path: 'posts',
				match: { status: 'Approved' },
				populate: {
					path: 'creator',
					select: 'username _id'
				}
			})
			.then(user => {
				if (user.posts.length) {
					res
						.status(200)
						.json({
							success: true,
							message: `Here are your posts, ${user.username}!`,
							posts: user.posts
						});
				} else {
					res
						.status(200)
						.json({
							success: true,
							message: `Currently you have no posts, ${user.username}!`,
							posts: user.posts
						});
				}
			})
			.catch(error => {
				if (!error.statusCode) {
					error.statusCode = 500;
				}

				next(error);
			})
	},
	logout: (req, res, next) => {
		res
			.status(200)
			.json({
				success: true,
				message: `You successfully logged out!`
			});
	},
	protected: (req, res, next) => {
		// passport.authenticate('jwt-cookiecombo', (err, payload) => {

		// })(req, res, next)

		return res.status(200).json({
			success: true,
			message: 'oyoyoy'
		})

		// passport.authenticate('jwt-cookiecombo', (err, user, info) => {
		// 	console.log(user)
		// 	if (err) return console.warn(err);

		// 	user.from = 'cookie';
		// 	console.log(user);

		// })(req, res, next)
	}
}