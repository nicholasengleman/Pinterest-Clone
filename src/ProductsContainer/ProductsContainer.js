import React from 'react';
import './ProductsContainer.css';
import Product from './Product/Product';

class ProductsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [
				{
					productImageAddress: 'https://www.villagehatshop.com/photos/product/giant/4511390S61354/alt/61354.jpg',
					productName: 'hat',
					productPrice: '$5',
					productDescription: 'goes on your head',
					productKey: 123123

				},
				{
					productImageAddress: 'https://images-na.ssl-images-amazon.com/images/I/71QpFBDc2CL._SL1000_.jpg',
					productName: 'trees',
					productPrice: '$34',
					productDescription: 'makes oxygen',
					productKey: 6778678
				},
			]
		};

		this.removeProduct = this.removeProduct.bind(this);
	}

	removeProduct(productToRemove) {
		let newProductList = this.state.products.filter(product  => {
			if(product.productKey !== productToRemove) {
				return true;
			} else {
				return false;
			}
		});
		this.setState({ products: newProductList });
	}


	render() {
		return (
			<div className="productContainer">
				{
					this.state.products.map(product => (
						<Product
							key = {product.productKey}
							removeProduct = {this.removeProduct}
							productImage = {product.productImageAddress}
							productName = {product.productName}
							productPrice = {product.productPrice}
							productDescription = {product.productDescription}
							publicKey = {product.productKey}
						/>
					))
				}
			</div>
		)
	}
}

export default ProductsContainer;