import React from 'react';
import Highlight from 'react-highlight-words';
import './Product.css';
import Tag from './Tag/Tag';

class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editMode: false,
			tags: this.props.productTags.toString(),
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

	componentDidMount() {
		if(this.state.tags.length === 0) {
			this.setState({editMode: true, newProduct: true});
		}
	}

	componentDidUpdate() {
		if(this.state.newProduct === true) {
			let content = document.getElementById('newProduct');
			let parent = content.parentNode;
			parent.insertBefore(content, parent.firstChild);
			this.setState({newProduct: false});
		}
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
		this.props.submitNewProductInfo(this.props.publicKey,this.state.tags,this.state.imageSrc,this.state.name,this.state.price,this.state.description);
		this.toggleEditMode(event);
		if(this.state.newProduct === true) {
			this.setState({newProduct: false});
		}
		event.preventDefault();
	}

	edit(e) {
		this.setState({ [e.target.id] : e.target.value });
	}


	render() {
		return (
			<div className="productBox" id={this.state.newProduct ? 'newProduct' : null}>
				{this.state.editMode
					? <div><p className="optionalWarning">All fields are optional.</p><input id='tags' type='text' placeholder='Product Tags seperated by a comma' onChange={this.edit} value={this.state.tags} /></div>
					: this.props.productTags.length>0
						? <div className='tagContainer'>
					    	{this.props.productTags.map(tag => (
					 	 	<Tag text={tag} key={tag}/>
					   		))}
						   </div>
						: null
				}

				{this.state.editMode
					? <input id='imageSrc' type='text' placeholder='Product Image URL' onChange={this.edit} value={this.state.imageSrc} />
					: <div className="productPic"><img src={this.props.productImage} alt=""/></div>
				}

				{this.state.editMode
					? <input id='name' type='text' placeholder='Product Name' onChange={this.edit} value={this.state.name}/>
					: <h1><Highlight searchWords={[this.props.searchString.toString()]}
									 textToHighlight={this.props.productName}/>
					  </h1>
				}

				{this.state.editMode
					? <input id='price' type='number' placeholder='Product Price' onChange={this.edit} value={this.state.price} />
					: this.props.productPrice.length>0
						? <p>${this.props.productPrice}</p>
						: null
				}

				{this.state.editMode
					? <textarea id='description' rows='5' placeholder='Product Description' value={this.state.description} onChange={this.edit} />
					: <Highlight searchWords={[this.props.searchString.toString()]}
								 textToHighlight={this.props.productDescription}/>
				}

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