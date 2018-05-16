import React from "react";
import { Link } from "react-router-dom";

import { Text, Heading, Icon, IconButton } from "gestalt";

import "gestalt/dist/gestalt.css";
import "../Boards/IndividualBoard/IndividualBoard.css";

class AllPins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: []
    };
  }

  deletePinFromBoard = (event, boardID, productID, imageAddress) => {
    event.event.preventDefault();
    this.props.deletePinFromBoard(boardID, productID, imageAddress);
  };

  render() {
    return (
      <div>
        <Link to="/">
          <div className="homepageLink wider">
            <Icon
              accessibilityLabel="return to homepage"
              icon="arrow-back"
              color="darkGray"
              size="20"
            />
            <Text bold size="md">
              Back to Home
            </Text>
          </div>
        </Link>
        <div className="pinHeader">
          <Heading>Your Pins</Heading>
        </div>
        <div className="pinContainer">
          {this.props.pins ? (
            this.props.pins.map(pin => (
              <Link to={`/products/${pin.productID}`}>
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
                          pin.boardID,
                          pin.productID,
                          pin.productImage
                        )
                      }
                    />
                  </span>
                  <div className="pinImage">
                    <img src={pin.productImage} alt="product" />
                  </div>
                  <br />
                  <div>
                    <Text>{pin.productDescription}</Text>
                  </div>
                  <br />
                  <div>
                    <Text>${pin.productID}</Text>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>You have no pins!</p>
          )}
        </div>
      </div>
    );
  }
}

export default AllPins;
