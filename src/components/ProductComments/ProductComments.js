import React from 'react';
import Comment from './Comment/Comment';
import ModalPin from '../ProductsContainer/Product/Modal-Pin/Modal-Pin';

import {Button, Avatar} from "gestalt";

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
		if(event.event) {
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
		event.preventDefault();
		this.props.addNewComment(this.props.productKey - 1, this.state.newComment, 'john');
		this.setState({newComment: ''});
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
						<h2>Comments</h2>
						{this.props.comments &&
						this.props.comments.map(comment => (
							<div className='commentBox'>
								<Avatar name={comment.user} size='md'/>
								<Comment name={comment.user} comment={comment.newComment}/>
							</div>
						))
						}

						<form id="addComment"
							  onSubmit={this.addNewComment}>
							<input className='addCommentInput'
								   name='addComment'
								   type='text'
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