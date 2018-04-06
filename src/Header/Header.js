import React from 'react';
import './Header.css';
import Modal from 'react-modal';
import FavoriteItem from './FavoriteItem/FavoriteItem';

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modalIsOpen: false,
		};

		this.searchInputChange = this.searchInputChange.bind(this);
		this.addNewContent = this.addNewContent.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
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

	addNewContent(event) {
		this.props.addNewContent();
		event.preventDefault();
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
				<button className='favoritesSummary' onClick={this.openModal}>
					<i>{this.props.favoritesQuantity < 1
						? 'save a favorite!'
						: this.props.favoritesQuantity < 2
							? `see your favorite item!`
							: `see your ${this.props.favoritesQuantity} favorites!`
					}</i>
				</button>
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					contentLabel="Favorites"
					className="Modal"
					overlayClassName="Overlay"
					closeTimeoutMS={150}
				>
					{ this.props.favorites.length > 0
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
				<button className='addNewContent' onClick={this.addNewContent}>add new product</button>
			</header>
		)
	}
}

export default Header;