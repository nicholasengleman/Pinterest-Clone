import React from 'react';
import {Text, Heading, Icon, Button, IconButton} from "gestalt";
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

	closeModal = () => {
		this.setState({ createBoard: false });
		this.props.toggleModal();
	};

	createBoardInputChange = (event) => {
		this.setState({ newBoardName : event.target.value });
	};

	addPinToExistingBoard = (productKey, boardID) => {
		this.props.addPinToExistingBoard(productKey, boardID);
		this.closeModal();
	};

	addPinToNewBoard = () => {
		this.props.addPinToNewBoard(this.props.productKey, this.state.newBoardName);
		this.closeModal();
	};

	render() {
		return (
			<ReactModal
				isOpen={this.props.modalStatus}
				onRequestClose={this.closeModal}
				className="modalPin"
				overlayClassName="ReactModalPin__Overlay"
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
								<form id='createBoard'>
									<input
										name='createBoard'
										placeholder="Like 'Places to Go' or 'Recipies to Make'"
										type='text'
										onChange={this.createBoardInputChange}
										value={this.state.newBoardName}
									/>
								</form>
							</div>
							<div className='submitNewBoard'>
								<Button
									text="Cancel"
									color="gray"
									inline
									alt="cancel this board creation"
									onClick={() => this.setState({ createBoard: false })}
								/>
								{
									this.state.newBoardName
									? <Button
										text="Create"
										color="red"
										inline
										alt="create this board"
										onClick={this.addPinToNewBoard}
									/>
									: <Button
										text="Create"
										color="gray"
										inline
										alt="create this board"
									/>
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
							{this.props.boards.map(board => (
								<div className='board'
									 onClick={() => this.addPinToExistingBoard(this.props.productKey, board.boardID)}>
									<div>
										<img src={board.pic} alt=''/>
										<span className='boardTitle'>
											{board.name}
										</span>
									</div>
									<span className='boardSaveButton'>
									<Button
										text="Save"
										color="red"
										inline
										alt="pin this product"
									/>
									</span>
								</div>
							))
							}
							<div className='createBoardContainer'
								 onClick={() => this.setState({createBoard: true})}>
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