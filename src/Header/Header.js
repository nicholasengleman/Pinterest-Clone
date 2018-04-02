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
					<button onClick={this.addNewContent}>add new content</button>

				</form>
			</header>
		)
	}
}

export default Header;