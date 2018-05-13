// const mongoose = require('mongoose');
// const User = mongoose.model('User');
// const promisify = require('promisify');
//
// exports.validateRegister = 	(req, res, next) => {
// 	req.checkBody('email', "That email is not valid!").isEmail();
// 		req.sanitizeBody('email').normalizeEmail({
// 			remove_dots: false,
// 			remove_extensions: false,
// 			gmail_remove_subaddress: false
// 		});
// 		req.checkBody('password', 'Password cannot be blank!').notEmpty();
// 		req.checkBody('password-confirm', 'Confirmed password cannot be blank!').notEmpty();
// 		req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);
//
// 		const errors = req.validationErrors();
// 		if (errors) {
// 			req.flash('error', errors.map(err => err.msg));
// 		}
// 		next();
// };
//
// exports.register = async (req, res, next) => {
// 	const user = new User({ email: req.body.email });
// 	const register = promisify(User.register, User);
// 	await register(user, req.body.password);
// 	res.send('it works');
// 	next();
// };