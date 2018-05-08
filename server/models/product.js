const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	picURL: {
		type: String,
		required: false
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	}
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };