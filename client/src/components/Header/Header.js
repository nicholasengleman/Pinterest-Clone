import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

import PropTypes from 'prop-types';
import {Text} from 'gestalt';

import SearchBar from './SearchBar/SearchBar';
import LoginRegisterModal from '../LoginRegisterModal/LoginRegisterModal';

import 'gestalt/dist/gestalt.css';
import './Header.css';


class Header extends React.Component {
	constructor(props) {
		super(props);

	}

	static propTypes = {
		filterProducts: PropTypes.func,
		addNewContent: PropTypes.func,
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

	gotoBoards = () => {
		if (this.props.name) {
			this.props.history.push('/boards');
		} else {
			this.props.toggleLoginRegisterModal();
		}
	};

	render() {
		return (
			<header className='header'>
				<SearchBar filterProducts={this.props.filterProducts}/>

				<div className='header__headerLink' onClick={this.gotoBoards}>
					<Text inline bold size="md" color="gray">My Boards</Text>
				</div>

				{
					this.props.name
						? <div className='header__headerLink' onClick={this.logout}>
							<Text inline bold size="md" color="gray">Log Out</Text>
						</div>
						: <div>
							<div className='header__headerLink' onClick={this.props.toggleLoginRegisterModal}>
								<Text inline bold size="md" color="gray">Login/Register</Text>
							</div>
							<LoginRegisterModal
								isOpen={this.props.LoginRegisterModalisOpen}
								toggleLoginRegisterModal={this.props.toggleLoginRegisterModal}
								setUserData={this.props.setUserData}
							/>
						</div>
				}

			</header>
		)
	}
}


export default withRouter(Header);