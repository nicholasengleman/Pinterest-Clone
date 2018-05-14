const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config  = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	firstName: {
		type: String,
		required: true,
		trim: true,
		maxlength: 100
	},
	boards: {
		type: String,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	token: {
		type: String
	}
});


userSchema.pre('save', function(next){
	let user = this;
	if(user.isModified('password')){

		bcrypt.genSalt(SALT_I, function(err, salt) {
			if(err) {
				return next(err);
			} else {
				bcrypt.hash(user.password, salt, function(err, hash) {
					if(err) {
						return next(err)
					} else {
						user.password = hash;
						next();
					}
				})
			}
		})
	} else {
		next();
	}
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) {
			return cb(err);
		} else {
			cb(null, isMatch);
		}
	})
};

userSchema.methods.generateToken = function(cb) {
	let user = this;

	let token = jwt.sign(user._id.toHexString(),"secret");

	user.token = token;
	user.save(function(err, user) {
		if(err) {
			return cb(err);
		} else {
			cb(null, user);
		}
	});
};


userSchema.statics.findByToken = function(token, cb) {
	let user = this;

	console.log("TOKEN:" + token);
	jwt.verify(token, "secert", function(err, decode) {
		console.log("ERRR" + err);
		user.findOne({ "_id": decode, "token": token}, function (err, user) {
			if(err) {
				return cb(err);
			} else {

				cb(user);
			}
		})
	})
};

userSchema.methods.deleteToken = function(token, cb) {
	let user = this;
	user.update({sunset: { token: 1}}, (err, user) => {
		if(err) {
			return cb(err);
		} else {
			cb(null, user);
		}
	})
};



const User = mongoose.model('User', userSchema);

module.exports = { User };