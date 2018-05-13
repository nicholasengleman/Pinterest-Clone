import React from 'react';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import './ProductsContainer.css';
import Product from './Product/Product';

const ProductsContainer = (props) => {
	return (
			<div className="productContainer">
				{props.products.length > 0 ?
					props.products.map(product => (
						<Link to={`/products/${product.productID - 1}`}>
							<Product
								{...props}
								{...product}

								key={product.productID}
							/>
						</Link>
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

