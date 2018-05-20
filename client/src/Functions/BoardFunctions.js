import axios from 'axios';

export function createNewBoard(boardName, loggedInUser) {
	let UserData = this.state.UserData;
	if (!UserData.Boards) {
		UserData.Boards = [];
	}
	UserData.Boards.push({
		name: boardName,
		boardID: Math.random()
	});
	this.setState({UserData});
	this.displayConfirmationToast('', 'New Board Created', boardName);
	if (loggedInUser) {
		axios.post('/api/board_update', {
			email: this.state.UserData.userID,
			boards: JSON.stringify(UserData.Boards)
		})
			.then(function (response) {
			})
			.catch(function (error) {
				console.log(error);
			})
	}
}

export function editBoard(boardID, newBoardName, newBoardDescription, loggedInUser) {
	let UserData = this.state.UserData;
	UserData.Boards.forEach(board => {
		if (board.boardID === boardID) {
			if (newBoardName) {
				board.name = newBoardName;
			}
			if (newBoardDescription) {
				board.description = newBoardDescription;
			}
		}
	});
	this.setState({UserData});

	this.displayConfirmationToast('', 'Your board', 'has been updated');

	if (loggedInUser) {
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

export function deleteBoard(boardID, loggedInUser) {
	let UserData = this.state.UserData;
	let boardname;
	UserData.Boards = UserData.Boards.filter(board => {
		if (board.boardID !== boardID) {
			return true;
		} else {
			boardname = board.name;
			return false;
		}
	});
	this.justThePins(UserData);
	this.setState({UserData});

	this.displayConfirmationToast('', `"${boardname}" board`, 'has been deleted');

	if (loggedInUser) {
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
}
