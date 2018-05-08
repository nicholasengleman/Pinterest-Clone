const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config  = require('./config/config').get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

const { User } = require('./models/user');
const { Product } = require('./models/product');

app.use(bodyParser.json());
app.use(cookieParser());

// GET //

// POST //
app.post('/api/book', (req, res) => {
	const product = new Product(req.body);

	product.save((err. doc) => {
		if(err) {
			return res.status(400).send(err);
		} else {
			res.status(200).json({
				post: true,
				productId: doc._id
			})
		}
	}
});
// UPDATE //

// DELETE //

const port  = process.env.PROT || 3001;

app.listen(port, () => {
	console.log("SERVER RUNNING");
});

