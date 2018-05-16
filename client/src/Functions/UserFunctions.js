export function toggleLoginRegisterModal() {
	this.setState({LoginRegisterModalisOpen: !this.state.LoginRegisterModalisOpen});
}

export function setUserData(userInfo) {
	console.log(userInfo);
	let UserData = this.state.UserData;
	if (userInfo.boards) {
		userInfo.boards = JSON.parse(userInfo.boards);
		UserData.Boards = userInfo.boards || [];
		this.justThePins(UserData);
	}
	UserData.userID = userInfo.email;
	UserData.name = userInfo.name;

	this.setState({UserData});
}

export function removeUserData() {
	this.setState({UserData: {}});
}
