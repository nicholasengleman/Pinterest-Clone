const config = {
	production: {
		SECRET: process.env.SECRET,
		DATABASE: process.env.MONGODB_URI
	},
	default: {
		SECRET:'secretpassword123',
		DATABASE: 'mongodb://localhost:27017/pinterest'
	}
};

exports.get = function get(env) {
	return config[env] || config.default;
};