const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	productImageAddress: {
		type: String,
		trim: true
	},
	price: {
		type: Number,
		trim: true
	},
	description: {
		type: String,
		trim: true
	},
	tags: {
		type: String
	},
	productKey: {
		type: Number,
		trim: true
	}
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };