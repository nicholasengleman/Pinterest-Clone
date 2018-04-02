import React from 'react';
import Highlight from 'react-highlight-words';
import './Product.css';
import Tag from './Tag/Tag';
import ReactTags from 'react-tag-autocomplete';

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
					? <div>
						<p className="optionalWarning">All fields are optional.</p>
						<input id='imageSrc' type='text' placeholder='Image URL' onChange={this.edit} value={this.state.imageSrc}/>
						<input id='tags' type='text' placeholder='Tags seperated by comma' onChange={this.edit} value={this.state.tags} />
						<input id='name' type='text' placeholder='Name' onChange={this.edit} value={this.state.name}/>
						<input id='price' type='number' placeholder='Price' value={this.state.price}/>
						<textarea id='description' rows='5' placeholder='Description' value={this.state.description} onChange={this.edit}/>
					  </div>

					: <div>
						<div className="productPic"><img src={this.props.productImage} alt=""/></div>
						{this.state.tags.length>0
							? <div className='tagContainer'>
								{this.props.productTags.map(tag => (
									<Tag text={tag} key={tag}/>
								))}
							</div>
							: null
						}
						<h1><Highlight searchWords={[this.props.searchString.toString()]} textToHighlight={this.props.productName}/></h1>
						<p className='productText'>${this.props.productPrice}</p>
						<div className='productText'><Highlight searchWords={[this.props.searchString.toString()]} textToHighlight={this.props.productDescription}/></div>
					</div>
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