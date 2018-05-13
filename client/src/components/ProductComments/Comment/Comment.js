import React from 'react';

import {Avatar, IconButton, Text} from "gestalt";

import "gestalt/dist/gestalt.css";

import './Comment.css';

class Comment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userLikesComment: false,
			OpenCommentEditMenu: false,
			newComment: this.props.comment
		};
	}

	toggleCommentEditMenu = (event) => {
		if (event.event) {
			event.event.preventDefault();
		} else {
			event.preventDefault();
		}
		this.setState({OpenCommentEditMenu: !this.state.OpenCommentEditMenu});
	};

	deleteComment = (event) => {
		event.preventDefault();
		event.stopPropagation();
		this.toggleCommentEditMenu(event);
		this.props.deleteComment(this.props.productID, this.props.commentId);
	};

	editComment = (event) => {
		if (event.key === 'Enter') {
			this.props.editComment(this.props.productID, this.props.commentId, this.state.newComment);
		}
	};

	openEditCommentWindow = (event) => {
		this.toggleCommentEditMenu(event);
		this.props.openEditCommentWindow(this.props.productID, this.props.commentId);
	};

	toggleLike = () => {
		this.setState({userLikesComment: !this.state.userLikesComment});
	};

	newCommentChange = (event) => {
		this.setState({newComment: event.target.value});
	};


	render() {
		return (
				<div className='individualCommentContainer'>
					<div className='commentHeader'>
						<div className='commentHeaderRight'>
							<Avatar name={this.props.user} size='sm'/>
							<span className='commentUsername'>
							<Text bold>{this.props.user}</Text>
						</span>
						</div>
						<div className='editCommentButtonContainer' tabIndex="0">
							<IconButton accessibilityLabel="edit comment"
										icon='ellipsis'
										size='xs'
										onClick={this.toggleCommentEditMenu}
							/>
							{this.state.OpenCommentEditMenu && (
								<div className='tooltip' >
									<div className='tooltipActions first' onClick={this.openEditCommentWindow}>
										<Text bold inline align='center' color="darkGray" size="md">Edit</Text>
									</div>
									<div className='tooltipActions second' onClick={this.deleteComment}>
										<Text bold inline align='center' color="darkGray" size="md">Delete</Text>
									</div>
								</div>)
							}
						</div>
					</div>
					<div className='commentBody'>
						{this.props.edit
							? <form id="addComment" onKeyUp={this.editComment}>
									<textarea className='addCommentInput'
											  form='addComment'
											  placeholder='add a comment'
											  onChange={this.newCommentChange}
											  value={this.state.newComment}
									/>
							</form>
							: <Text inline>{this.props.comment}</Text>
						}
					</div>
					<div className='commentFooter'>
						<Text size='sm' color='gray'>{this.props.date}</Text>
						{/*<span className='commentInteractions'><Text size='sm' bold>Reply</Text></span>*/}
						{
							this.state.userLikesComment
								? <span className='commentInteractions' onClick={this.toggleLike}>
									<Text size='sm' bold>You like this.</Text>
								</span>
								: <span className='commentInteractions' onClick={this.toggleLike}>
									<Text size='sm' bold>Like?</Text>
								</span>
						}
					</div>
				</div>
		)
	}

}

export default Comment;