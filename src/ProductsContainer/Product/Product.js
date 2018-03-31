import React from 'react';
import Highlight from 'react-highlight-words';
import './Product.css';
import Tag from './Tag/Tag';

class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editMode: false,
			imageSrc: this.props.productImage,
			name: this.props.productName,
			price: this.props.productPrice,
			description: this.props.productDescription
		};

		this.removeProduct = this.removeProduct.bind(this);
		this.toggleEditMode = this.toggleEditMode.bind(this);
		this.submitNewProductInfo = this.submitNewProductInfo.bind(this);
		this.edit = this.edit.bind(this);
	}

	removeProduct(event) {
		this.props.removeProduct(this.props.publicKey);
		event.preventDefault();
	}

	toggleEditMode(event) {
		this.setState(prevState => ({
			editMode: !prevState.editMode
		}));
		event.preventDefault();
	}

	submitNewProductInfo(event) {
		this.props.submitNewProductInfo(this.props.publicKey,this.state.imageSrc,this.state.name,this.state.price,this.state.description);
		this.toggleEditMode(event);
		event.preventDefault();
	}

	edit(e) {
		this.setState({ [e.target.id] : e.target.value });
	}


	render() {
		return (
			<div className="productBox">
				<div className='tagContainer'>
					{this.props.productTags.map(tag => (
						<Tag text={tag} key={tag}/>
					))}
				</div>

				{this.state.editMode ? <input id='imageSrc' type='text' placeholder='Product Image URL' onChange={this.edit} value={this.state.imageSrc} /> : <div className="productPic"><img src={this.props.productImage} alt=""/></div>}


				{this.state.editMode ? <input id='name' type='text' placeholder='Product Name' onChange={this.edit} value={this.state.name}/> : <h1><Highlight
					searchWords={[this.props.searchString.toString()]}
					textToHighlight={this.props.productName}/>
				</h1>}

				{this.state.editMode ? <input id='price' type='number' placeholder='Product Price' onChange={this.edit} value={this.state.price} /> : <p>${this.props.productPrice}</p>}
				{this.state.editMode ? <textarea id='description' rows='5' placeholder='Product Description' value={this.state.description} onChange={this.edit} />: <Highlight
					searchWords={[this.props.searchString.toString()]}
					textToHighlight={this.props.productDescription}/> }
				<div className="editPanel">
					{
						this.state.editMode
						? <button onClick={this.submitNewProductInfo}>Submit</button>
						: <div><button onClick={this.toggleEditMode}>Edit</button><button onClick={this.removeProduct}>Remove</button></div>
					}
				</div>



			</div>
		)
	}
}

export default Product;