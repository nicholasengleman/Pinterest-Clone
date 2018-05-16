import axios from 'axios';

export function deleteComment(productID, commentId){
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
}

export function openEditCommentWindow(productID, commentId) {
	let ProductList = this.state.DisplayedProductList;
	ProductList.forEach(product => {
		if (product.productID === productID) {
			product.productComments.forEach((comment) => {
				if (comment.commentId === commentId) {
					comment['edit'] = true;
				}
			});
		}
	});
	this.setState({DisplayedProductList: ProductList});
}

export function editComment(productID, commentId, newCommentText) {
	let ProductList = this.state.DisplayedProductList;
	ProductList.forEach(product => {
		if (product.productID === productID) {
			product.productComments.forEach((comment) => {
				if (comment.commentId === commentId) {
					comment.comment = newCommentText;
					comment.edit = false;
				}
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
}

export function addNewComment(productID, comment, name, userId, date) {
	let ProductList = this.state.DisplayedProductList;
	const commentId = Math.random();
	ProductList.forEach(product => {
		if (product.productID === productID) {
			if (product.productComments) {
				product.productComments.push({name, userId, comment, date, commentId});
			} else {
				product.productComments = [{name, userId, comment, date, commentId}];
			}
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
	this.displayConfirmationToast('', 'thanks for', 'your comment!');
}

