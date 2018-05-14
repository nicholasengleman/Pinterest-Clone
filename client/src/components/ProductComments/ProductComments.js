import React from 'react';
import {Link} from "react-router-dom";
import {Button, Heading, Text, Icon} from "gestalt";
import LoginRegisterModal from '../LoginRegisterModal/LoginRegisterModal';

import Comment from './Comment/Comment';
import ModalPin from '../ProductsContainer/Product/Modal-Pin/Modal-Pin';

import "gestalt/dist/gestalt.css";
import './ProductComments.css';

class ProductComments extends React.Component {
	constructor(props) {
		super(props);


		this.state = {
			displayModal: false,
			newComment: '',
		};
	}

	static getDerivedStateFromProps(nextProps) {
		let product = nextProps.productList.filter(product => {
			if (product.productID == nextProps.productID) {
				return true;
			} else {
				return false;
			}
		});
		return {
			...product[0]
		}
	}


	toggleModal = (event) => {
		if (event.event) {
			event.event.preventDefault();
		} else {
			event.preventDefault();
		}
		if (this.props.userData.name) {
			this.setState(prevState => ({
				displayModal: !prevState.displayModal
			}));
		} else {
			this.props.toggleLoginRegisterModal();
		}
	};

	newCommentChange = (event) => {
		if (this.props.userData.name) {
			this.setState({newComment: event.target.value});
		} else {
			this.props.toggleLoginRegisterModal();
		}
	};

	addNewComment = (event) => {
		if (event.key === 'Enter') {
			let newDate = new Date();
			const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			let date = `${months[newDate.getMonth()]} ${newDate.getDate()}`;

			this.props.addNewComment(this.state.productID, this.state.newComment, this.props.userData.name, this.props.userData.userID, date);
			this.setState({newComment: ''});
			event.target.blur();
		}
	};


	render() {
		return (
			<div className='commentsContainerContainer'>
				<Link to='/'>
					<div className='homepageLink'>
						<Icon accessibilityLabel='return to homepage' icon='arrow-back' color="darkGray" size='20'/>
						<Text bold size='md'>Home</Text>
					</div>
				</Link>
				<main className='commentsContainer'>
					<LoginRegisterModal
						isOpen={this.props.LoginRegisterModalisOpen}
						toggleLoginRegisterModal={this.props.toggleLoginRegisterModal}
						setUserData={this.props.setUserData}
					/>
					<div className='productSummary'>
						<div className='productImage'>
							<img src={this.state.productImageAddress} alt=''/>
						</div>
						<Heading size="sm">{this.state.productName}</Heading>
						<br/>
						<Text>{this.state.productDescription}</Text>
						<br/>
						<Text>${this.state.productPrice}</Text>
					</div>
					<div className='comments'>
						<div className="productComments__toggleSaveProductModalButton">
							<Button text='Save' color='red' align="right" onClick={this.toggleModal} inline/>
						</div>
						<ModalPin modalStatus={this.state.displayModal}
								  toggleModal={this.toggleModal}
								  productDescription={this.state.productDescription}
								  productImage={this.state.productImageAddress}
								  boards={this.props.boards}
								  productID={this.props.productID}
								  addPinToExistingBoard={this.props.addPinToExistingBoard}
								  addPinToNewBoard={this.props.addPinToNewBoard}
						/>
						<Heading size='xs'>Comments</Heading>
						<br/>
						<Text>Share feedback, ask a question or give a high five.</Text>
						<div className='commentBox'>
							{this.state.productComments && this.state.productComments.map(comment => {
								return <Comment key={comment.commentId}
												{...comment}
												{...this.props}
												{...this.state}
								/>
							})
							}
						</div>

						<form id="addComment" onKeyUp={this.addNewComment}>
							<textarea className='addCommentInput'
									  form='addComment'
									  placeholder='add a comment'
									  onChange={this.newCommentChange}
									  value={this.state.newComment}
							/>
						</form>

					</div>
				</main>
			</div>
		)
	}
}

export default ProductComments;