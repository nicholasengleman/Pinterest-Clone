const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

const {User} = require('./models/user');
const {Product} = require('./models/product');
const { auth } = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());


const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log('SERVER RUNNUNG');
});

// GET //
app.get('/api/getProduct', (req, res) => {
	let id = req.query.id;
	Product.findById(id, (err, doc) => {
		if (err) {
			return res.status(400).send(err);
		} else {
			res.send(doc);
		}
	})
});

app.get('/api/GetAllProducts', (req, res) => {
	Product.find().exec((err, doc) => {
		if (err) {
			return res.status(400).send(err);
		} else {
			res.send(doc);
		}
	})
});

app.get('/api/user_boards', (req, res) => {
	User.find({_id: req.query.user }).exec((err, docs) => {
		if(err) {
			return res.status(400).send(err);
		} else {
			res.send(docs[0].boards);
		}
	})
});

app.get('/api/product_comments', (req, res) => {
	Product.find({_id: req.query.product }).exec((err, docs) => {
		if(err) {
			return res.status(400).send(err);
		} else {
			res.send(docs[0].comments);
		}
	})
});

app.get('/api/logout', auth,(req, res) => {
	req.user.deleteToken(req.token, (err, user) => {
		console.log("reached here");
		if(err) {
			return res.status(400).send(err);
		} else {
			res.status(200);
		}
	})
});


// POST //
app.post('/api/register', (req, res) => {
	const user = new User(req.body);

	user.save((err, doc) => {
		if (err) {
			return res.json({success: false});
		} else {
			res.status(200).json({
				success: true,
				user: doc
			})
		}
	})
});

app.post('/api/login', (req, res) => {
	User.findOne({'email': req.body.email}, (err, user) => {
		if (!user) {
			return res.json({isAuth: false, message: 'Auth failed, email not found'});
		} else {
			user.comparePassword(req.body.password, (err, isMatch) => {
				if (!isMatch) {
					return res.json({
						isAuth: false,
						message: 'Wrong password'
					});
				}
				user.generateToken((err, user) => {
					if (err) {
						return res.status(400).send(err);
					} else {
						res.cookie('auth', user.token).json({
							isAuth: true,
							boards: user.boards,
							id: user._id,
							name: user.firstName,
							email: user.email
						});
					}
				});
			});
		}
	});
});


// UPDATE //
//update user boards
app.post('/api/board_update', (req, res) => {
	User.findOneAndUpdate(req.body._id, req.body, {new: true, upsert: true}, (err, doc) => {
		if (err) {
			return res.status(400).send(err);
		} else {
			res.json({
				succcess: true,
				doc
			})
		}
	})
});


//update product comments
app.post('/api/product_update', (req, res) => {
	Product.findOneAndUpdate(req.body.id, req.body, {new: true, upsert: true}, (err, doc) => {
		if (err) {
			return res.status(400).send(err);
		} else {
			res.json({
				succcess: true,
				doc
			})
		}
	})
});



// DELETE //
app.delete('/api/delete_product', (req, res) => {
	let id = req.query.id;
	Product.findByIdAndRemove(id, (err, doc) => {
		if (err) {
			return res.status(400).send(err);
		} else {
			res.json(true);
		}
	})
});


