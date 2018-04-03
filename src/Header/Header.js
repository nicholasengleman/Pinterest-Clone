import React from 'react';
import './Header.css';

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.searchInputChange = this.searchInputChange.bind(this);
		this.addNewContent = this.addNewContent.bind(this);
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
				<button className='favoritesSummary'>

					{this.props.favoritesQuantity < 1
						? 'Favorite a Product!'
						: this.props.favoritesQuantity < 2
							? `See your favorited product!`
							: `See your ${this.props.favoritesQuantity} favorite products!`
					}
				</button>
				<button className='addNewContent' onClick={this.addNewContent}>add new content</button>
			</header>
		)
	}
}

export default Header;