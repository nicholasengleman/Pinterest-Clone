import React from "react";
import { Link } from "react-router-dom";
import LoginRegisterModal from "../LoginRegisterModal/LoginRegisterModal";

import PropTypes from "prop-types";
import "./ProductsContainer.css";
import Product from "./Product/Product";

const ProductsContainer = props => {
  return (
    <div className="productContainer">
      <LoginRegisterModal
        isOpen={props.loginRegisterModalisOpen}
        toggleLoginRegisterModal={props.toggleLoginRegisterModal}
        setUserData={props.setUserData}
      />
      {props.products.length > 0 ? (
        props.products.map(product => (
          <Link key={product.productID} to={`/products/${product.productID}`}>
            <Product {...props} {...product} />
          </Link>
        ))
      ) : (
        <p>Sorry, we are out of products!</p>
      )}
    </div>
  );
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
