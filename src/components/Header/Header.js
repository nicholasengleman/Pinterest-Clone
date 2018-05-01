import React from 'react';

import PropTypes from 'prop-types';
import { Switch, Label, Text, Tabs } from 'gestalt';

import SearchBar from './SearchBar/SearchBar';

import 'gestalt/dist/gestalt.css';
import './Header.css';


class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
			modalIsOpen: false,
			switched: false
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.toggleAdminMode = this.toggleAdminMode.bind(this);
		this.toggleAdminMode = this.toggleAdminMode.bind(this);
		this.tabChange = this.tabChange.bind(this);
	}

	static propTypes = {
		filterProducts: PropTypes.func,
		addNewContent: PropTypes.func,
		favoritesQuantity: PropTypes.number,
		favorites: PropTypes.array
	};

	toggleAdminMode() {
		this.props.toggleAdminMode();
		this.setState({switched: !this.state.switched});
	}

	openModal() {
		this.setState({modalIsOpen: true});
	}


	closeModal() {
		this.setState({modalIsOpen: false});
	}

	tabChange({ activeTabIndex, event }) {
		event.preventDefault();
		this.setState({
			activeIndex: activeTabIndex
		});
	}




	render() {
		return (
			<header>
				<SearchBar filterProducts={this.props.filterProducts}/>
				<Tabs
					tabs={[
						{
							text: "Explore",
							href: "/"
						},
						{
							text: "Boards",
							href: "boards"
						},
						{
							text: "Pins",
							href: "pins"
						}
					]}
					activeTabIndex={this.state.activeIndex}
					onChange={this.handleChange}
				/>

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