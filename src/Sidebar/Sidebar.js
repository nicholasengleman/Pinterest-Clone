import React from 'react';
import './Sidebar.css';
import Button from './SideBarButton/SideBarButton';

class Sidebar extends React.Component{

	render() {
		return (
			<div className="sidebarContainer">
				<h2>Sidebar</h2>
				<h3>Filter By Price</h3>
				<Button text='Under $25' ProductsThatMeetFilter={this.props.priceUnder25} updatePriceFilter={this.props.updatePriceFilter} typeOfFilter='Price'/>
				<Button text='$25 to $50' ProductsThatMeetFilter={this.props.price25to50} updatePriceFilter={this.props.updatePriceFilter} typeOfFilter='Price'/>
				<Button text='$50 to $100' ProductsThatMeetFilter={this.props.price50to100} updatePriceFilter={this.props.updatePriceFilter} typeOfFilter='Price'/>
				<Button text='$100 to $200' ProductsThatMeetFilter={this.props.price100to200}  updatePriceFilter={this.props.updatePriceFilter} typeOfFilter='Price'/>
				<Button text='$200 & above' ProductsThatMeetFilter={this.props.priceOver200}  updatePriceFilter={this.props.updatePriceFilter} typeOfFilter='Price'/>

				<h3>Filter By Tag</h3>
				{ this.props.MeetsTagFilters.map(tags => (
					<Button text={tags[0]} ProductsThatMeetFilter={tags[1]} updateTagFilter={this.props.updateTagFilter} typeOfFilter='Tag' key={tags[0]}/>
				))}
			</div>
		)
	}
}

export default Sidebar;
