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
app.get('/api/getProduct', (req, res) => {
	let id = req.query.id;
	Product.findById(id, (err, doc) => {
		if(err) {
			return res.status(400).send(err);
		} else {
			res.send(doc);
		}
	})
});

app.get('/api/GetAllProducts', (req, res) => {
	let skip = parseInt(req.query.skip);
	let limit = parseInt(req.query.limit);
	let order = req.query.order;

	Product.find((err, doc) => {
		if(err) {
			return res.status(400).send(err);
		} else {
			res.send(doc);
		}
	});
});

// POST //
app.post('/api/product', (req, res) => {
	const product = new Product(req.body);

	product.save((err, doc) => {
		if(err) {
			return res.status(400).send(err);
		} else {
			res.status(200).json({
				post: true,
				productId: doc._id
			})
		}
	});
});

app.post('/api/register', (req, res) => {
	const user = new User(req.body);

	user.save((err, doc) => {
		if(err) {
			return res.json({success: false});
		} else {
			res.status(200).json({
				success: true,
				user: doc
			})
		}
	})
})

app.post('/api/login', (req, res) => {
	User.findOne({'email': req.body.email}, (err, user) => {
		if(!user) {
			return res.json({ isAuth: false, message: 'Auth failed, email not found' });
		} else {
			user.comparePassword(req.body.password, (err, isMatch) => {
				if(!isMatch) {
					return res.json({
						isAuth: false,
						message: 'Wrong password'
					});

					user.generateToken((err, user) => {
						if(err) {
							return res.send(400).send(err);
						} else {
							res.cookie('auth', user.token).json({
							isAuth: true,
							id:user._id,
							email:user.emai
						});
					}});
				}
			});
		}
	});
});


// UPDATE //
app.post('/api/product_update', (req, res) => {
	Product.findOneAndUpdate(req.body._id, req.body,{new:true}, (err, doc) => {
		if(err) {
			return res.send(400).send(err);
		} else {
			res.json({
				succcess: true,
				doc
			})
		}
	})
})

// DELETE //
app.delete('/api/delete_product', (req, res) => {
	let id = req.query.id;
	Product.findByIdAndRemove(id, (err, doc) => {
		if(err) {
			return res.status(400).send(err);
		} else {
			res.json(true);
		}
	})
});

const port  = process.env.PORT || 3001;

app.listen(port, () => {
	console.log("SERVER RUNNING");
});

