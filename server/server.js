const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = express.Router();

require('dotenv').config({ path: 'variables.env' });


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);
mongoose.connection.on('error', (err) => {
	console.log("BEEP BEEP BEEP " + err.message);
});



// // GET //
// app.get('/api/getProduct', (req, res) => {
// 	let id = req.query.id;
// 	Product.findById(id, (err, doc) => {
// 		if(err) {
// 			return res.status(400).send(err);
// 		} else {
// 			res.send(doc);
// 		}
// 	})
// });
//

//
// // POST //

//
// app.post('/api/register', (req, res) => {
// 	const user = new User(req.body);
//
// 	user.save((err, doc) => {
// 		if(err) {
// 			return res.json({success: false});
// 		} else {
// 			res.status(200).json({
// 				success: true,
// 				user: doc
// 			})
// 		}
// 	})
// })
//
// app.post('/api/login', (req, res) => {
// 	User.findOne({'email': req.body.email}, (err, user) => {
// 		if(!user) {
// 			return res.json({ isAuth: false, message: 'Auth failed, email not found' });
// 		} else {
// 			user.comparePassword(req.body.password, (err, isMatch) => {
// 				if(!isMatch) {
// 					return res.json({
// 						isAuth: false,
// 						message: 'Wrong password'
// 					});
//
// 					user.generateToken((err, user) => {
// 						if(err) {
// 							return res.send(400).send(err);
// 						} else {
// 							res.cookie('auth', user.token).json({
// 							isAuth: true,
// 							id:user._id,
// 							email:user.emai
// 						});
// 					}});
// 				}
// 			});
// 		}
// 	});
// });
//
//
// // UPDATE //
// app.post('/api/product_update', (req, res) => {
// 	Product.findOneAndUpdate(req.body._id, req.body,{new:true}, (err, doc) => {
// 		if(err) {
// 			return res.send(400).send(err);
// 		} else {
// 			res.json({
// 				succcess: true,
// 				doc
// 			})
// 		}
// 	})
// })
//
// // DELETE //
// app.delete('/api/delete_product', (req, res) => {
// 	let id = req.query.id;
// 	Product.findByIdAndRemove(id, (err, doc) => {
// 		if(err) {
// 			return res.status(400).send(err);
// 		} else {
// 			res.json(true);
// 		}
// 	})
// });


app.set('port', process.env.PORT || 3001);
const server = app.listen(app.listen(app.get('port'), () => {
	console.log("SERVER RUNNING");
}));

