import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Label, Text, Tabs } from 'gestalt';

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

		this.searchInputChange = this.searchInputChange.bind(this);
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

	searchInputChange(event) {
		this.props.filterProducts(this.refs.searchInput.value);
		event.preventDefault();
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
				<form id="search" className="headerSearchAddInput">
					<input type="search"
						   id="search"
						   name="search"
						   className="searchInput"
						   ref="searchInput"
						   onChange={this.searchInputChange}
						   placeholder="Search"/>
				</form>

				{/*
				<button className='favoritesSummary' onClick={this.openModal}>
					{this.props.favoritesQuantity < 1
						? 'save a favorite!'
						: this.props.favoritesQuantity < 2
							? `see your favorite item!`
							: `see your ${this.props.favoritesQuantity} favorites!`
					}
				</button>
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					contentLabel="Favorites"
					className="Modal"
					overlayClassName="Overlay"
					closeTimeoutMS={150}
				>
					{this.props.favorites.length > 0
						? this.props.favorites.map(favorite => (
							<FavoriteItem key={favorite.productKey}
										  favoriteImg={favorite.productImageAddress}
										  favoriteName={favorite.productName}
										  favoriteDescription={favorite.productDescription}
										  favoritePrice={favorite.productPrice}
										  favoriteProductKey={favorite.productKey}
										  removeFromFavorites={this.props.removeFromFavorites}
							/>))
						: <p>You have no favorites!</p>
					}
					<button className='closeModalButton' onClick={this.closeModal}>close</button>
				</Modal>
				*/}
				<Tabs
					tabs={[
						{
							text: "Explore",
							href: "explore"
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