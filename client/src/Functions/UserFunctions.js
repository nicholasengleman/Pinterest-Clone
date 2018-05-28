import _cloneDeep from 'lodash.clonedeep';

export function toggleLoginRegisterModal() {
	this.setState({LoginRegisterModalisOpen: !this.state.LoginRegisterModalisOpen});
}

export function setUserData(userInfo) {
	let UserData = _cloneDeep(this.state.UserData);
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
	this.setState({
			UserData: {
				Boards: [
					{
						boardID: 1234,
						name: "Example Board",
						pins: [
							{
								boardID: 1234,
								productID: 45,
								productImage: "https://i.pinimg.com/564x/3d/01/88/3d018824796f77a9a5d27158c439f064.jpg",
								productName: "Nikon F3"
							},
							{
								boardID: 1234,
								productID: "13",
								productDescription: "When the modular concept is added to technology, wonderful things can" +
									" happen. Just have a look at this innovative stackable USB flash drive for example.",
								productImage: "https://i.pinimg.com/564x/28/f5/41/28f5417b214f72f2c4e24e6a1d8697dc.jpg"
							}
						]
					}
				],
				name: "User",
				pins: [
					{
						boardID: 1234,
						productID: 45,
						productImage: "https://i.pinimg.com/564x/3d/01/88/3d018824796f77a9a5d27158c439f064.jpg",
						productName: "Nikon F3"
					},
					{
						boardID: 1234,
						productID: "13",
						productDescription: "When the modular concept is added to technology, wonderful things can" +
							" happen. Just have a look at this innovative stackable USB flash drive for example.",
						productImage: "https://i.pinimg.com/564x/28/f5/41/28f5417b214f72f2c4e24e6a1d8697dc.jpg"
					}
				],
				userID: "user@gmail.com"
			}
		}
	);
}
