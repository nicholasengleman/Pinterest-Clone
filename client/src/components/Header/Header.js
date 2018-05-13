import React from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

import PropTypes from 'prop-types';
import {Text} from 'gestalt';

import SearchBar from './SearchBar/SearchBar';
import LoginRegisterModal from './LoginRegisterModal/LoginRegisterModal';

import 'gestalt/dist/gestalt.css';
import './Header.css';


class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			LoginRegisterModalisOpen: false,
		};
	}

	static propTypes = {
		filterProducts: PropTypes.func,
		addNewContent: PropTypes.func,
	};


	toggleLoginRegisterModal = () => {
		this.setState({LoginRegisterModalisOpen: !this.state.LoginRegisterModalisOpen});
	};


	logout = (event) => {
		let a = this;
		event.preventDefault();
		console.log("got here");
		axios.get('/api/logout')
			.then(function (response) {
				a.props.removeUserData();
			})
			.catch(function (error) {
				console.log(error);
			})
	};

	render() {
		return (
			<header className='header'>
				<SearchBar filterProducts={this.props.filterProducts}/>

				<Link to="/boards">
					<div className='headerLink'>
						<p>My Boards</p>
					</div>
				</Link>
				{
					this.props.name
						? <button onClick={this.logout}>Log out</button>
						: <div>
							<div className='header__headerLink' onClick={this.toggleLoginRegisterModal}>
								<Text inline bold size="md" color="gray">Login/Register</Text>
							</div>
							<LoginRegisterModal
								isOpen={this.state.LoginRegisterModalisOpen}
								toggleLoginRegisterModal={this.toggleLoginRegisterModal}
								setUserData={this.props.setUserData}
							/>
						</div>
				}

			</header>
		)
	}
}


export default Header;