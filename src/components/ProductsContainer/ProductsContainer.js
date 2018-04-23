import React from 'react';
import PropTypes from 'prop-types';
import './ProductsContainer.css';
import Product from './Product/Product';

const ProductsContainer = (props) => {
		return (
			<div className="productContainer">
				{props.products.length> 0 ?
					props.products.map(product => (
						<Product
							removeProduct = {props.removeProduct}
							submitNewProductInfo={props.submitNewProductInfo}
							addToFavorites={props.addToFavorites}
							favorites={props.favorites}
							removeFromFavorites={props.removeFromFavorites}
							searchString={props.searchString}
							adminMode={props.adminMode}


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
	};

ProductsContainer.propTypes = {
	products: PropTypes.array,
	favorites: PropTypes.array,
	searchString: PropTypes.string,
	removeProduct: PropTypes.func,
	editProduct: PropTypes.func,
	submitNewProductInfo: PropTypes.func,
	addToFavorites: PropTypes.func,
	removeFromFavorites: PropTypes.func
};

export default ProductsContainer;

