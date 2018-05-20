import axios from 'axios';

export function addPinToExistingBoard(productName, productDescription, productImage, productID, boardID, loggedInUser) {
	let UserData = this.state.UserData;
	for (let board of UserData.Boards) {
		if (board.boardID === boardID) {
			if (board.pins) {
				board.pins.push({productName, productDescription, productImage, productID});
			} else {
				board.pins = [{productName, productDescription, productImage, productID}];
			}
			this.justThePins(UserData);
			this.setState({UserData});

			this.displayConfirmationToast(productImage, 'Saved to', board.name);

			axios.post('/api/board_update', {
				email: this.state.UserData.userID,
				boards: JSON.stringify(UserData.Boards)
			})
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				})
		}
	}
}

export function deletePinFromBoard(boardID, productID, productImage, loggedInUser) {
	let UserData = this.state.UserData;
	for (let board of UserData.Boards) {
		if (board.boardID === parseFloat(boardID)) {
			board.pins = board.pins.filter(pin => {
				if (pin.productID !== productID) {
					return true;
				} else {
					return false;
				}
			});
		}
	}
	this.justThePins(UserData);
	this.setState({UserData});

	this.displayConfirmationToast(productImage, 'Deleted from', "board");

	axios.post('/api/board_update', {
		email: this.state.UserData.userID,
		boards: JSON.stringify(UserData.Boards)
	})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
}

export function addPinToNewBoard(productName, productDescription, productImage, productID, boardName, loggedInUser) {
	let UserData = this.state.UserData;
	if (!UserData.Boards) {
		UserData.Boards = [];
	}
	UserData.Boards.push({
		name: boardName,
		boardID: Math.random(),
		pic: productImage,
		pins: [{productName, productDescription, productImage, productID}]
	});
	this.justThePins(UserData);
	this.setState({UserData});
	this.displayConfirmationToast(productImage, 'Saved to', boardName);

	axios.post('/api/board_update', {
		email: this.state.UserData.userID,
		boards: JSON.stringify(UserData.Boards)
	})
		.then(function (response) {
		})
		.catch(function (error) {
			console.log(error);
		});
}

export function justThePins(UserData) {
	let userdata = UserData;
	if (userdata.Boards) {
		let pins = [];
		userdata.Boards.forEach(board => {
			if (board.pins) {
				board.pins.forEach(pin => {
					pins.push({...pin, boardID: board.boardID});
				});
			}
		});
		userdata.pins = pins;
		this.setState({ UserData : userdata });
	}
}
