const { User } = require('./../models/user');

let auth = (req, res, next) => {
	let token = req.cookies.auth;
	User.findByToken(token, (user) => {
		// if (err) throw err;

		// if (!user) {
		// 	return res.json({
		// 		error: true
		// 	});
		// }
		req.token = token;
		req.user = user;
		console.log("REQ USER: " + req.user);
		next();
	});
};

module.exports = { auth };