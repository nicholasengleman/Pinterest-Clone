import React from 'react';
import Comment from './Comment/Comment';
import ModalPin from '../ProductsContainer/Product/Modal-Pin/Modal-Pin';

import {Button, Heading, Text} from "gestalt";

import "gestalt/dist/gestalt.css";
import './ProductComments.css';

class ProductComments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayModal: false,
			newComment: ''
		}
	}

	toggleModal = (event) => {
		if (event.event) {
			event.event.preventDefault();
		} else {
			event.preventDefault();
		}
		this.setState(prevState => ({
			displayModal: !prevState.displayModal
		}));
	};

	newCommentChange = (event) => {
		this.setState({newComment: event.target.value});
	};

	addNewComment = (event) => {
		if(event.key === 'Enter') {
			let newDate = new Date();
			const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			let date = `${months[newDate.getMonth()]} ${newDate.getDate()}`;

			this.props.addNewComment(this.props.productKey - 1, this.state.newComment, 'john', date);
			this.setState({newComment: ''});
			event.target.blur();
		}
	};

	render() {
		return (
			<div className='commentsContainerContainer'>
				<main className='commentsContainer'>
					<div className='header'>
						<Button text='Save' color='red' onClick={this.toggleModal} inline/>
						<ModalPin modalStatus={this.state.displayModal}
								  toggleModal={this.toggleModal}
								  productDescription={this.props.productDescription}
								  productImage={this.props.productImageAddress}
								  boards={this.props.boards}
								  productKey={this.props.productKey}
								  addPinToExistingBoard={this.props.addPinToExistingBoard}
								  addPinToNewBoard={this.props.addPinToNewBoard}
						/>
					</div>
					<div className='productImage'>
						<img src={this.props.productImageAddress} alt=''/>
						<p>{this.props.productName}</p>
						<p>{this.props.productDescription}</p>
						<p>{this.props.productPrice}</p>
					</div>
					<div className='comments'>
						<Heading size='xs'>Comments</Heading>
						<br/>
						<Text>Share feedback, ask a question or give a high five.</Text>
						<div className='commentBox'>
							{this.props.comments && this.props.comments.map(comment => (
								<Comment key={comment.commentId} user={comment.user} comment={comment.newComment} date={comment.date}/>
							))
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