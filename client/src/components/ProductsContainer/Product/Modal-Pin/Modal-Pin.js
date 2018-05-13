import React from 'react';
import {Text, Heading, Icon, IconButton} from "gestalt";
import ReactModal from "react-modal";

import "gestalt/dist/gestalt.css";
import "./Modal-Pin.css";

class ModalPin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newBoardName: '',
			createBoard: false,
			editModalProductDescription: false
		};
	}

	submitNewPersonalizedDescription = (event) => {
		if (this.state.editModalProductDescription && event.target.id !== "description") {
			this.setState({editModalProductDescription: false});
		}
		event.preventDefault();
	};

	closeModal = (event) => {
		this.setState({createBoard: false});
		this.props.toggleModal(event);
	};

	createBoardInputChange = (event) => {
		event.stopPropagation();
		this.setState({newBoardName: event.target.value});
	};

	toggleCreateBoardDialog = (event) => {
		event.preventDefault();
		this.setState({createBoard: !this.state.createBoard});
	};

	addPinToExistingBoard = (event, boardID) => {
		event.preventDefault();
		this.props.addPinToExistingBoard(this.props.productName, this.props.productDescription, this.props.productImage, this.props.productKey, boardID);
		this.closeModal(event);
	};

	addPinToNewBoard = (event) => {
		event.preventDefault();
		this.props.addPinToNewBoard(this.props.productName, this.props.productDescription, this.props.productImage, this.props.productKey, this.state.newBoardName);
		this.closeModal(event);
	};

	render() {
		return (
			<ReactModal
				isOpen={this.props.modalStatus}
				onRequestClose={this.closeModal}
				className="modalPin"
				overlayClassName="Overlay"
				contentLabel="Pin Modal"
			>
				<div className="modalPin_ProductSummary" onClick={this.submitNewPersonalizedDescription}>
					<div className="productPic">
						<img src={this.props.productImage} alt=""/>
					</div>
					<div>
						{this.state.editModalProductDescription
							? <form>
								<textarea
									id="description"
									rows="6"
									placeholder="Description"
									value={this.props.productDescription}
									onChange={this.edit}
								/>
							</form>
							: <div onClick={() =>
								this.setState({editModalProductDescription: true})
							}>
								<div className="modalPin_productDescription">
									<Text color="midnight"
										  bold={true}
										  size="sm">
										{this.props.productDescription}
									</Text>
								</div>
								<div className="modalPin_productDescriptionEdit">
									<Icon
										accessibilityLabel="edit"
										icon="edit"
										color="darkGray"
										inline={true}
										size={20}
									/>
								</div>
							</div>
						}
					</div>
				</div>
				<div className="modalPin_Boards">
					{this.state.createBoard
						? <div>
							<div className='boardheading'>
								<Text align='left'>
									<Heading size='xs'>
										Create board
									</Heading>
								</Text>
							</div>
							<div className='createBoardInputContainer'>
								<Text color='gray'>Name</Text>
								<form id='createBoard' onClick={(event) => event.preventDefault()}>
									<input
										name='createBoard'
										placeholder='Like "Places to Go" or "Recipies to Make"'
										type='text'
										onChange={this.createBoardInputChange}
										value={this.state.newBoardName}
									/>
								</form>
							</div>
							<div className='submitNewBoard'>
								<button className='button_pin' onClick={this.toggleCreateBoardDialog}>Cancel</button>
								{
									this.state.newBoardName
										? <button className='button_pin' onClick={this.addPinToNewBoard}>Save</button>
										: <button>Save</button>
								}
							</div>
						</div>
						: <div>
							<div className='boardheading'>
								<Text align='left'>
									<Heading size='xs'>
										Choose board
									</Heading>
								</Text>
								<IconButton accessibilityLabel='cancel'
											icon='cancel'
											onClick={this.props.toggleModal}
											size='sm'/>
							</div>
							{this.props.boards && this.props.boards.map(board => (
								<div className='board'
									 onClick={(event) => this.addPinToExistingBoard(event, board.boardID)}>
									<div>
										<img src={board.pic} alt=''/>
										<span className='boardTitle'>
											{board.name}
										</span>
									</div>
									<span className='boardSaveButton'>
									<button className='button_pin'>Save</button>
									</span>
								</div>
							))
							}
							<div className='createBoardContainer'
								 onClick={this.toggleCreateBoardDialog}>
								<Icon icon='add-circle' color='red' size='40' accessibilityLabel='add board'/>
								<span>
									<Text inline={true} size='md'>Create board</Text>
								</span>
							</div>
						</div>
					}
				</div>
			</ReactModal>
		)
	}
}

export default ModalPin;