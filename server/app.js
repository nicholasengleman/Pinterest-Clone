const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('promisify');
const flash = require('flash');
const expressValidator = require('express-validator');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());
app.use(cookieParser());

const { User } = require('./models/user');
const { Product } = require('./models/product');

app.get('/api/GetAllProducts', (req, res) => {
	Product.find((err, doc) => {
		if(err) {
			return res.status(400).send(err);
		} else {
			res.send(doc);
		}
	});
});

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



// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
	secret: process.env.SECRET,
	key: process.env.KEY,
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// // Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// // The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
	res.locals.h = helpers;
	res.locals.flashes = req.flash();
	res.locals.user = req.user || null;
	res.locals.currentPath = req.path;
	next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
	req.login = promisify(req.login, req);
	next();
});


// done! we export it so we can start the site in start.js
module.exports = app;