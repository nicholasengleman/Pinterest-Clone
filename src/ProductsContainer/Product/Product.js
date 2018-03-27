import React from 'react';
import './Product.css';

class Product extends React.Component {
	constructor(props) {
		super(props);

		this.removeProduct = this.removeProduct.bind(this);
	}

	removeProduct(event) {
		this.props.removeProduct(this.props.publicKey);
		event.preventDefault();
	}


	render() {
		return (
			<div className="productBox">
				<div className="editPanel">
					<button onClick={this.removeProduct}>Remove</button>
				</div>
				<div className="productPic"><img src={this.props.productImage} alt="" /></div>
				<h1>{this.props.productName}</h1>
				<p>{this.props.productPrice}</p>
				<p>{this.props.productDescription}</p>
			</div>
		)
	}
}

export default Product;