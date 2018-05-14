import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { DeleteCookie } from "../../Functions/CookieFunctions";

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
		axios.get('/api/logout')
			.then(function (response) {
				a.props.removeUserData();
			})
			.catch(function (error) {
				console.log(error);
			});
		DeleteCookie();
	};

	gotoBoards = () => {
		if (this.props.name) {
			this.props.history.push('/boards');
		} else {
			this.props.toggleLoginRegisterModal();
		}
	};

	gotoPins = () => {
		if (this.props.name) {
			this.props.history.push('/pins');
		} else {
			this.props.toggleLoginRegisterModal();
		}
	};


	render() {
		return (
			<header className='header'>
				<SearchBar filterProducts={this.props.filterProducts} name={this.props.name}/>

				<div className='header__headerLink' onClick={this.gotoBoards}>
					<Text inline bold size="lg" color="gray">My Boards</Text>
					<div className='header__headerLink_notification'>{this.props.boards && this.props.boards.length || 0}</div>
				</div>

				<div className='header__headerLink' onClick={this.gotoPins}>
					<Text inline bold size="lg" color="gray">My Pins</Text>
					<div className='header__headerLink_notification'>{this.props.pinsCount && this.props.pinsCount.length || 0}</div>
				</div>


				{
					this.props.name
						? <div className='header__headerLink' onClick={this.logout}>
							<Text inline size="lg" color="red">Log Out</Text>
						</div>
						: <div>
							<div className='header__headerLink' onClick={this.props.toggleLoginRegisterModal}>
								<Text inline size="lg" color="red">Login/Register</Text>
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