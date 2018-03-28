import React from 'react';
import './ProductsContainer.css';
import Product from './Product/Product';

class ProductsContainer extends React.Component {

	render() {
		return (
			<div className="productContainer">
				{
					this.props.products.map(product => (
						<Product
							key = {product.productKey}
							removeProduct = {this.props.removeProduct}
							productImage = {product.productImageAddress}
							productName = {product.productName}
							productPrice = {product.productPrice}
							productDescription = {product.productDescription}
							searchString={this.props.searchString}
							publicKey = {product.productKey}
						/>
					))
				}
			</div>
		)
	}
}

export default ProductsContainer;