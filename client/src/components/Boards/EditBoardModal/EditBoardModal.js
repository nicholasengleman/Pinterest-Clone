import React from 'react';
import Modal from "react-modal";

import {Text, IconButton, Heading, Button} from "gestalt";

import "gestalt/dist/gestalt.css";
import "./EditBoardModal.css";

class EditBoardModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newName: this.props.board.name,
			newDescription: this.props.board.description || ''
		}
	}

	static getDerivedStateFromProps = (nextProps) => {
		return {
			newName: nextProps.board.name,
			newDescription: nextProps.board.description || ''
		}
	};

	deleteBoard = () => {
		this.props.deleteBoard(this.props.board.boardID);
		this.props.toggleEditBoardModal();
	};

	updateInput = (event) => {
		event.preventDefault();
		this.setState({
			newName: this.nameInput.value,
			newDescription: this.descriptionInput.value
		});
	};

	editBoard = (event) => {
		this.props.editBoard(this.props.board.boardID, this.state.newName, this.state.newDescription);
		this.setState({
			newName: '',
			newDescription: ''
		});
		this.props.toggleEditBoardModal(event, this.props.board.boardID);
	};


	render() {
		return (
			<Modal
				isOpen={this.props.displayModal}
				className="editBoardModal"
				onRequestClose={this.props.toggleEditBoardModal}
				contentLabel="create New Board Modal"
				overlayClassName="Overlay"
			>
				<div className="Modal_EditBoard_Container" onClick={(event) => event.preventDefault()}>
					<div className="Modal_EditBoard_Header">
						<Heading size="xs">Edit Board</Heading>
						<IconButton accessibilityLabel="edit this Modal"
									icon="cancel"
									onClick={(event) => this.props.toggleEditBoardModal(event, this.props.board.boardID)}/>
					</div>
					<div className="Modal_EditBoard_EditName">
						<Text>Name</Text>
						<input type="text"
							   placeholder='Things to do'
							   ref={input => (this.nameInput = input)}
							   onChange={this.updateInput}
							   value={this.state.newName}
						/>
					</div>
					<div className="Modal_EditBoard_EditDescription">
						<Text>Description</Text>
						<textarea
							placeholder='What is your board about?'
							ref={input => (this.descriptionInput = input)}
							onChange={this.updateInput}
							value={this.state.newDescription}
						/>
					</div>
					<div className="Modal_EditBoard_Footer">
						<Button inline
								text="Delete"
								color="gray"
								onClick={this.deleteBoard}
						/>
						<div>
							<Button inline
									text="Cancel"
									color="gray"
									onClick={(event) => this.props.toggleEditBoardModal(event, this.props.board.boardID)}
							/>
							<Button inline
									text="Save"
									color="red"
									onClick={this.editBoard}
							/>
						</div>
					</div>
				</div>
			</Modal>
		)
	}
}

export default EditBoardModal;



