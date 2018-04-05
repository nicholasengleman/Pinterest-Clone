import React from 'react';
import './ProductsContainer.css';
import Product from './Product/Product';

class ProductsContainer extends React.Component {

	render() {
		return (
			<div className="productContainer">
				{this.props.products.length> 0 ?
					this.props.products.map(product => (
						<Product
							removeProduct = {this.props.removeProduct}
							submitNewProductInfo={this.props.submitNewProductInfo}
							addToFavorites={this.props.addToFavorites}
							favorites={this.props.favorites}
							removeFromFavorites={this.props.removeFromFavorites}
							searchString={this.props.searchString}

							key = {product.productKey}
							productImage = {product.productImageAddress}
							productName = {product.productName}
							productPrice = {product.productPrice}
							productDescription = {product.productDescription}
							productTags = {product.productTags}
							productKey = {product.productKey}
						/>
					)) : <p>Sorry, we are out of products!</p>
				}
			</div>
		)
	}
}

export default ProductsContainer;

