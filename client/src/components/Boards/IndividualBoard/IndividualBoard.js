import React from "react";
import { Link } from "react-router-dom";

import { Text, Heading, Icon, IconButton } from "gestalt";

import "gestalt/dist/gestalt.css";
import "./IndividualBoard.css";

class IndividualBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thisboard: []
    };
  }

  static getDerivedStateFromProps = nextProps => {
    if (nextProps.boards) {
      let board = nextProps.boards.filter(board => {
        if (parseFloat(nextProps.boardID) === board.boardID) {
          return true;
        } else {
          return false;
        }
      });
      return {
        thisboard: board
      };
    }
    return {
      thisboard: []
    };
  };

  deletePinFromBoard = (event, productID, imageAddress) => {
    event.event.preventDefault();
    this.props.deletePinFromBoard(this.props.boardID, productID, imageAddress);
  };

  render() {
    return (
      <div>
        <Link to="/boards">
          <div className="homepageLink wider">
            <Icon
              accessibilityLabel="return to homepage"
              icon="arrow-back"
              color="darkGray"
              size="20"
            />
            <Text bold size="md">
              Back to Boards
            </Text>
          </div>
        </Link>
        <div className="pinHeader">
          <Heading>
            {this.state.thisboard[0] && this.state.thisboard[0].name}
          </Heading>
        </div>
        <div className="pinContainer">
          {this.state.thisboard[0] && this.state.thisboard[0].pins ? (
            this.state.thisboard[0].pins.map(product => (
              <Link to={`/products/${product.productID}`} key={product.productID}>
                <div className="pin">
                  <span className="deletePinButton">
                    <IconButton
                      accessibilityLabel="delete this pin"
                      icon="cancel"
                      bgColor="white"
                      iconColor="red"
                      size="md"
                      onClick={event =>
                        this.deletePinFromBoard(
                          event,
                          product.productID,
                          product.productImage
                        )
                      }
                    />
                  </span>
                  <div className="pinImage">
                    <img src={product.productImage} alt="product" />
                  </div>
                  <br />
                  <div>
                    <Text>{product.productDescription}</Text>
                  </div>
                  <br />
                  <div>
                    <Text>${product.productID}</Text>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>This board has no pins!</p>
          )}
        </div>
      </div>
    );
  }
}

export default IndividualBoard;
