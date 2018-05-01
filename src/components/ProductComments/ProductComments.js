import React from 'react';
import Comment from './Comment/Comment';

import { Button } from "gestalt";

import "gestalt/dist/gestalt.css";
import './ProductComments.css';

class ProductComments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newComment: ''
		}
	}

	newCommentChange = (event) => {
		this.setState({newComment: event.target.value });
	};

	addNewComment = (event) => {
		event.preventDefault();
		this.props.addNewComment(this.props.productKey - 1, this.state.newComment);
		this.setState({newComment: ''});
	};

	render() {
		return (
			<div className='commentsContainerContainer'>
				<main className='commentsContainer'>
					<div className='header'>
						<Button text='Save' color='red' inline/>
					</div>
					<div className='productImage'>
						<img src={this.props.productImageAddress} alt='' />
					</div>
					<div className='comments'>
						<h2>Comments</h2>
						{ this.props.comments &&
							this.props.comments.map(comment => (
								<Comment comment={comment} />
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