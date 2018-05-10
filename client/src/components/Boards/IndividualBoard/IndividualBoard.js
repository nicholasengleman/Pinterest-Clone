import React from 'react';
import {Link} from "react-router-dom";

import {Text, Heading, Icon, IconButton } from "gestalt";

import "gestalt/dist/gestalt.css";
import "./IndividualBoard.css";

class IndividualBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			thisboard: []
		}
	}

	static getDerivedStateFromProps = (nextProps) => {
		let board = nextProps.boards.filter(board => {
			if (nextProps.boardID == board.boardID) {
				return true;
			}
		});
		return {
			thisboard: board
		}
	};

	deletePinFromBoard = (event, productKey, imageAddress) => {
		event.event.preventDefault();
		this.props.deletePinFromBoard(this.props.boardID, productKey, imageAddress);
	};

	render() {
		return (
			<div>
				<Link to='/boards'>
					<div className='homepageLink wider'>
						<Icon accessibilityLabel='return to homepage' icon='arrow-back' color="darkGray" size='20'/>
						<Text bold size='md'>Back to Boards</Text>
					</div>
				</Link>
				<div className='pinHeader'>
					<Heading>{this.state.boardName}</Heading>
				</div>
				<div className="pinContainer">
					{
						this.state.thisboard[0].pins && this.state.thisboard[0].pins.map(product => (
							<Link to={`/products/${product.productKey - 1}`}>
								<div className="pin">
									<span className="deletePinButton">
										<IconButton accessibilityLabel="delete this pin"
													icon="cancel"
													bgColor="white"
													iconColor="red"
													size="md"
													onClick={(event) => this.deletePinFromBoard(event, product.productKey, product.productImage)}
										/>
									</span>
									<div className="pinImage">
										<img src={product.productImage}/>
									</div>
									<br/>
									<div><Text>{product.productDescription}</Text></div>
									<br/>
									<div><Text>${product.productKey}</Text></div>
								</div>
							</Link>
						))
					}
				</div>
			</div>
		)
	}
}

export default IndividualBoard;