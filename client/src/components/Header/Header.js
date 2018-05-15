import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {DeleteCookie} from "../../Functions/CookieFunctions";

import {Text} from 'gestalt';

import SearchBar from './SearchBar/SearchBar';
import LoginRegisterModal from '../LoginRegisterModal/LoginRegisterModal';

import 'gestalt/dist/gestalt.css';
import './Header.css';


const Header = (props) => {

	const logout = (event) => {
		event.preventDefault();
		axios.get('/api/logout')
			.then(function (response) {
				props.removeUserData();
			})
			.catch(function (error) {
				console.log(error);
			});
		DeleteCookie();
	};

	const gotoBoards = () => {
		if (props.name) {
			props.history.push('/boards');
		} else {
			props.toggleLoginRegisterModal();
		}
	};

	const gotoPins = () => {
		if (props.name) {
			props.history.push('/pins');
		} else {
			props.toggleLoginRegisterModal();
		}
	};

	return (
		<header className='header'>
			<SearchBar filterProducts={props.filterProducts} name={props.name}/>

			<div className='header__headerLink' onClick={gotoBoards}>
				<Text inline bold size="lg" color="gray">My Boards</Text>
				<div
					className='header__headerLink_notification-boards'>{(props.boards && props.boards.length) || 0}</div>
			</div>

			<div className='header__headerLink' onClick={gotoPins}>
				<Text inline bold size="lg" color="gray">My Pins</Text>
				<div
					className='header__headerLink_notification-pins'>{(props.pinsCount && props.pinsCount.length) || 0}</div>
			</div>


			{props.name
				? <div className='header__headerLink' onClick={logout}>
					<Text inline size="lg" color="red">Log Out</Text>
				</div>
				: <div>
					<div className='header__headerLink' onClick={props.toggleLoginRegisterModal}>
						<Text inline size="lg" color="red">Login/Register</Text>
					</div>
					<LoginRegisterModal
						isOpen={props.LoginRegisterModalisOpen}
						toggleLoginRegisterModal={props.toggleLoginRegisterModal}
						setUserData={props.setUserData}
					/>
				</div>
			}
		</header>
	)
};


export default withRouter(Header);