import React from 'react';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { Switch, Label, Text } from 'gestalt';

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

	render() {
		return (
			<header>
				<SearchBar filterProducts={this.props.filterProducts}/>

				<ul>
					<Link to="/boards"><li>My Boards</li></Link>
				</ul>

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