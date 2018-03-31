import React from 'react';
import Highlight from 'react-highlight-words';
import './Product.css';
import Tag from './Tag/Tag';

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
				<div className='tagContainer'>
					{this.props.productTags.map(tag => (
						<Tag text={tag} key={tag}/>
					))}
				</div>
				<div className="productPic"><img src={this.props.productImage} alt=""/></div>
				<h1>
					<Highlight
						searchWords={[this.props.searchString.toString()]}
						textToHighlight={this.props.productName}
					/>
				</h1>

				<p>{this.props.productPrice}</p>
				<Highlight
					searchWords={[this.props.searchString.toString()]}
					textToHighlight={this.props.productDescription}
				/>
			</div>
		)
	}
}

export default Product;