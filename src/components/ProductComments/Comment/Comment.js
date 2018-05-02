import React from 'react';

import {Avatar, IconButton, Text} from "gestalt";

import "gestalt/dist/gestalt.css";

import './Comment.css';

class Comment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			OpenCommentEditMenu: false
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

	closeCommentEditMenu = () => {
		this.setState({OpenCommentEditMenu: false});
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
					<div className='editCommentButtonContainer'>
						<IconButton accessibilityLabel="edit comment"
									icon='ellipsis'
									size='sm'
									onClick={this.toggleCommentEditMenu}
						/>
						{this.state.OpenCommentEditMenu && (
							<div className='tooltip'>
								<div className='tooltipActions first'><Text bold inline align='center' color="darkGray" size="md">Edit</Text></div>
								<div className='tooltipActions second'><Text bold inline align='center' color="darkGray" size="md">Delete</Text></div>
							</div> )
						}
					</div>
				</div>
				<div className='commentBody'>
					<Text inline>{this.props.comment}</Text>
				</div>
				<div className='commentFooter'>
					<Text size='sm' color='gray'>{this.props.date}</Text>
					<Text size='sm' bold>Reply</Text>
					<Text size='sm' bold>Like</Text>
				</div>
			</div>
		)
	}

}

export default Comment;