import React from 'react';

import './Comment.css';

class Comment extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='individualCommentContainer'>
				<div className='comment'>
					<span className='commentUsername'>{this.props.name}</span>
					{this.props.comment}
				</div>
			</div>
		)
	}

}

export default Comment;