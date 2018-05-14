const config = {
	production: {
		SECRET: process.env.SECRET,
		DATABASE: process.env.MONGODB_URI
	},
	default: {
		SECRET: 'supersecretpassword',
		DATABASE: 'mongodb://engleman:11july2017@ds119650.mlab.com:19650/pinterest-7512'
	}
};

exports.get = function get(env) {
	return config[env] || config.default;
};