const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections
mongoose.connect('mongodb://engleman:11july2017@ds119650.mlab.com:19650/pinterest-7512');
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
	console.error(`BEEP BEEP BEEP ${err.message}`);
});

// Start our app!
const app = require('./app');
app.set('port', 7777);
const server = app.listen(app.get('port'), () => {
	console.log(`Express running → PORT ${server.address().port}`);
});