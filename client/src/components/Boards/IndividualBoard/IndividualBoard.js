import React from 'react';
import {Link} from "react-router-dom";

import {Text, Heading, Icon, IconButton } from "gestalt";

import "gestalt/dist/gestalt.css";
import "./IndividualBoard.css";

class IndividualBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			boardName: ''
		}
	}

	static getDerivedStateFromProps = (nextProps) => {
		let boardProducts = [];
		let board = nextProps.boards.filter(board => {
			if (nextProps.boardID == board.boardID) {
				return board;
			}
		});
		board[0].pins.forEach(pin => {
			let product = nextProps.products.filter(product => {
				if (product.productKey === pin) {
					return true;
				} else {
					return false;
				}
			});
			if (product["0"]) {
				boardProducts.push({
					name: product["0"].productName,
					description: product["0"].productDescription,
					price: product["0"].productPrice,
					imageAddress: product["0"].productImageAddress,
					productKey: product["0"].productKey
				});
			}
		});
		return {
			boardName: board[0].name,
			boardProducts: boardProducts
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
						this.state.boardProducts.map(product => (
							<Link to={`/products/${product.productKey - 1}`}>
								<div className="pin">
									<span className="deletePinButton">
										<IconButton accessibilityLabel="delete this pin"
													icon="cancel"
													bgColor="white"
													iconColor="red"
													size="md"
													onClick={(event) => this.deletePinFromBoard(event, product.productKey,product.imageAddress)}
										/>
									</span>
									<div className="pinImage">
										<img src={product.imageAddress}/>
									</div>
									<br/>
									<div><Text>{product.description}</Text></div>
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