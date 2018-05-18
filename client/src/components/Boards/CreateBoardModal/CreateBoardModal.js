import React from "react";
import Modal from "react-modal";

import { Text, IconButton, Heading, Button } from "gestalt";

import "gestalt/dist/gestalt.css";
import "./CreateBoardModal.css";

class CreateBoardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createNewBoardInputValue: ""
    };
  }

	componentWillMount() {
		Modal.setAppElement('body');
	};

  onChangeOfcreateNewBoardInputValue = () => {
    this.setState({ createNewBoardInputValue: this.input.value });
  };

  createNewBoard = () => {
    this.props.createNewBoard(this.state.createNewBoardInputValue);
    this.setState({ createNewBoardInputValue: "" });
  };

  render() {
    return (
      <Modal
        isOpen={this.props.displayModal}
        className="createNewBoardModal"
        onRequestClose={this.toggleCreateNewBoardModal}
        contentLabel="create New Board Modal"
        overlayClassName="Overlay"
        bodyOpenClassName="ReactModal__Body--open"
      >
        <div className="Modal_CreateBoard_Header">
          <Heading size="xs">Create Board</Heading>
          <IconButton
            accessibilityLabel="close this Modal"
            icon="cancel"
            onClick={this.props.toggleCreateNewBoardModal}
          />
        </div>
        <div className="Modal_CreateBoard_Input">
          <Text>Name</Text>
          <input
            type="text"
            placeholder="Like &quot;Places to Go&quot; or &quot;Recipies to Make&quot;"
            ref={input => (this.input = input)}
            onChange={this.onChangeOfcreateNewBoardInputValue}
          />
        </div>
        <div className="Modal_CreateBoard_Footer">
          <Button
            inline
            text="Cancel"
            color="gray"
            onClick={this.props.toggleCreateNewBoardModal}
          />
          {this.state.createNewBoardInputValue ? (
            <Button
              inline
              text="Create"
              color="red"
              onClick={this.createNewBoard}
            />
          ) : (
            <Button inline text="Create" color="gray" />
          )}
        </div>
      </Modal>
    );
  }
}

export default CreateBoardModal;
