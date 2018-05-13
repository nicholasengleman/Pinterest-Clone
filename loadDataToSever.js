let data = require('./data/MoreData');
const axios = require('axios');

for(var e = 0; e<data.length; e++) {

axios.post('http://localhost:7777/api/product', {
		"name": data[e].productName,
		"productImageAddress": data[e].productImageAddress,
		"price": data[e].productPrice,
		"description": data[e].productDescription,
		"tags": data[e].productTags,
		"productKey": data[e].productKey
	}).then(function(response) {
		console.log(reponse);
	}).catch(function (error) {
		console.log(error);
	})

}