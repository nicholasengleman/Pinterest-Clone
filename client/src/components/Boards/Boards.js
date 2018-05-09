import React from 'react';
import {Link} from "react-router-dom";
import Modal from "react-modal";

import {Text, Icon, IconButton, Heading, Button} from "gestalt";

import "gestalt/dist/gestalt.css";
import './Boards.css';

class Boards extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayModal: false,
			createNewBoardInputValue: ''
		};
		this.textInput = React.createRef();
	}

	toggleCreateNewBoardModal = () => {
		this.setState(
			{
				displayModal: !this.state.displayModal,
				createNewBoardInputValue: ''
			});
	};

	onChangeOfcreateNewBoardInputValue = () => {
		this.setState(
			{
				createNewBoardInputValue: this.input.value
			});
	};

	createNewBoard = () => {
		this.props.createNewBoard(this.state.createNewBoardInputValue);
		this.setState(
			{
				displayModal: false,
				createNewBoardInputValue: ''
			});
	};


	render() {
		return (
			<div>
				<Link to='/'>
					<div className='homepageLink'>
						<Icon accessibilityLabel='return to homepage' icon='arrow-back' color="darkGray" size='20'/>
						<Text bold size='md'>Home</Text>
					</div>
				</Link>
				<div className='myBoardsContainer'>
					<div className='createMyBoardContainer'>
						<div className='createMyBoard'>
							<IconButton accessibilityLabel='createBoard'
										icon='add-circle'
										iconColor='red'
										size='xl'
										onClick={this.toggleCreateNewBoardModal}
							/>
							<Modal
								isOpen={this.state.displayModal}
								className="createNewBoardModal"
								onRequestClose={this.toggleCreateNewBoardModal}
								contentLabel="create New Board Modal"
								overlayClassName="ReactModalPin__Overlay"
							>
								<div className="Modal_CreateBoard_Header">
									<Heading size="xs">Create Board</Heading>
									<IconButton accessibilityLabel="close this Modal"
												icon="cancel"
												onClick={this.toggleCreateNewBoardModal}/>
								</div>
								<div className="Modal_CreateBoard_Input">
									<Text>Name</Text>
									<input type="text"
										   placeholder='Like "Places to Go" or "Recipies to Make"'
										   ref={input => (this.input = input)}
										   onChange={this.onChangeOfcreateNewBoardInputValue}/>
								</div>
								<div className="Modal_CreateBoard_Footer">
									<Button inline text="Cancel" color="gray"/>
									{
										this.state.createNewBoardInputValue
											? <Button inline
													  text="Create"
													  color="red"
													  onClick={this.createNewBoard}
											/>
											: <Button inline
													  text="Create"
													  color="gray"/>
									}

								</div>
							</Modal>
						</div>
						<div className='createMyBoardFooter'>
							<Text bold color="gray" size="lg">Create Board</Text>
						</div>
					</div>
					{this.props.Boards.map(board => (
						<div className='myBoard'>
							<div className='myBoardFooter'>
								<h1>{board.name}</h1>
							</div>
						</div>
					))
					}
				</div>
			</div>
		)
	}
}

export default Boards;