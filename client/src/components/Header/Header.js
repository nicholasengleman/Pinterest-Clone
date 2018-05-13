import React from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

import PropTypes from 'prop-types';
import {Switch, Label, Text, Heading} from 'gestalt';

import SearchBar from './SearchBar/SearchBar';

import 'gestalt/dist/gestalt.css';
import './Header.css';


class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
			switched: false
		};
	}

	static propTypes = {
		filterProducts: PropTypes.func,
		addNewContent: PropTypes.func,
	};

	toggleAdminMode = () => {
		this.props.toggleAdminMode();
		this.setState({switched: !this.state.switched});
	};

	logout = (event) => {
		let a = this;
		event.preventDefault();
		axios.get('/api/logout')
			.then(function(response) {
				a.props.removeUserData();
			})
			.catch(function(error) {
				console.log(error);
			})
	};

	render() {
		return (
			<header>
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
							<div className='headerLink'>
								<Link to="/login">Login</Link>
							</div>
							{/*<div className='headerLink'>*/}
								{/*<Link to="/register">Register</Link>*/}
							{/*</div>*/}
						</div>
				}

				<div className='adminHeader'>
					<Label htmlFor='toggleAdminMode'>
						<Text>Admin Mode</Text>
					</Label>
					<Switch
						id='toggleAdminMode'
						onChange={this.toggleAdminMode}
						switched={this.state.switched}
					/>
				</div>
			</header>
		)
	}
}


export default Header;