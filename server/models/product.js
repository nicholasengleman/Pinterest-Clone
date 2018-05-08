const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	productImageAddress: {
		type: String
	},
	price: {
		type: Number
	},
	description: {
		type: String
	},
	tags: {
		type: String
	}
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };