import React from 'react';
import './Header.css';

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.searchInputChange = this.searchInputChange.bind(this);
	}

	searchInputChange(event) {
		this.props.filterProducts(this.refs.searchInput.value);
		event.preventDefault();
	}

	render() {
		return (
			<header>
				<h1>React</h1>
				<form id="search" className="headerSearchAddInput">
					<input type="search"
						   id="search"
						   name="search"
						   className="searchInput"
						   ref="searchInput"
						   onChange={this.searchInputChange}
						   placeholder="search"/>
				</form>
			</header>
		)
	}
}

export default Header;