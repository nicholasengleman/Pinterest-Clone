import axios from 'axios';

export const deleteComment = (productID, commentId) => {
	let ProductList = this.state.DisplayedProductList;
	ProductList.forEach(product => {
		if (product.productID === productID) {
			product.productComments = product.productComments.filter((comment) => {
				return comment.commentId !== commentId;
			});

			axios.post('/api/product_update', {
				productKey: productID,
				comments: product.productComments
			})
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				})
		}
	});
	this.setState({DisplayedProductList: ProductList});
};
