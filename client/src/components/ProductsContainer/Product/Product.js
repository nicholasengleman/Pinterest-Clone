import React from "react";
import PropTypes from "prop-types";

import Highlight from "react-highlight-words";
import Tag from "./Tag/Tag";
import SaveProductToBoardModal from "./SaveProductToBoardModal/SaveProductToBoardModal";
import {Button} from "gestalt";

import "gestalt/dist/gestalt.css";
import "./Product.css";

class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayModal: false
		};
	}

	static propTypes = {
		removeProduct: PropTypes.func,
		submitNewProductInfo: PropTypes.func,
		addToFavorites: PropTypes.func,
		removeFromFavorites: PropTypes.func,
		searchString: PropTypes.string,

		productImage: PropTypes.string,
		productName: PropTypes.string,
		productPrice: PropTypes.number,
		productDescription: PropTypes.string,
		productTags: PropTypes.array,
		productID: PropTypes.number
	};

	toggleModal = event => {
		if (event.event) {
			event.event.preventDefault();
		} else {
			event.preventDefault();
		}
		this.setState(prevState => ({displayModal: !prevState.displayModal}));
	};


	render() {
		return (
			<div>
				<div className="productBox">
					<div className="productPic">
						<img src={this.props.productImageAddress} alt=""/>
					</div>
					{this.state.tags && (
						<div className="tagContainer">
							{this.props.productTags.map(tag => <Tag text={tag} key={tag}/>)}
						</div>
					)}

					<div className="saveIcon" onClick={(event) => event.preventDefault()}>
						<Button onClick={this.toggleModal} text="Save" color="red" inline/>
						<SaveProductToBoardModal
							modalStatus={this.state.displayModal}
							toggleModal={this.toggleModal}
							productName={this.props.productName}
							productDescription={this.props.productDescription}
							productImage={this.props.productImageAddress}
							productID={this.props.productID}
							boards={this.props.boards}
							addPinToExistingBoard={this.props.addPinToExistingBoard}
							addPinToNewBoard={this.props.addPinToNewBoard}
						/>
					</div>
					<h1>
						<Highlight
							caseSensitive={false}
							searchWords={[this.props.searchString]}
							textToHighlight={this.props.productName}
						/>
					</h1>
					<div className="productPrice">${this.props.productPrice}</div>
					<div className="productDescription">
						<Highlight
							caseSensitive={false}
							searchWords={[this.props.searchString]}
							textToHighlight={this.props.productDescription}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Product;
