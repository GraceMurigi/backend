const bcrypt = require('bcrypt'); 
const User = require('../models/user'); 
const jwt = require('jsonwebtoken'); 

// create users
exports.signup = (req, res, next) => {
	bcrypt.hash(req.body.password, 10).then(
		(hash) => {
			const user = new User({
				email: req.body.email, 
				password: hash
			}); 
			user.save().then(
				() => {
					res.status(201).json({
						message: 'User added successfuly!'
					}); 
				}
			).catch(
				(error) => {
					res.status(500).json({
						error:error
					});
				}
			);
		}
	);
};

// check credentials and allow login 
exports.login = (req, res, next) => {
	// does user exist? 
	User.findOne({ email: req.body.email }).then(
		(user) => {
			if (!user) {
				return res.status(401).json({
					error: new Error('User not found')
				});
			}
			// check if valid user has entered the right password
			bcrypt.compare(req.body.password, user.password).then(
				(valid) => {
					if (!valid) {
						return res.status(401).json({
							error: Error('Incorrect password!')
						});
					}
					const token = jwt.sign(
						{ userId: user._id}, 
						'RANDOM_TOKEN_SECRET', 
						{ expressIn: '24h'});
					res.status(200).json({
						userId: user._id,
						token: token
					});
				}
			).catch(
				(error) => {
					res.status(500).json({
						error: error
					});
				}
			);
		}
	).catch(
		(error) => {
			res.status(500).json({
				error: error
			});
		}
	);
};