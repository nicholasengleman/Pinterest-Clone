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
					{this.props.comment}
				</div>
			</div>
		)
	}

}

export default Comment;