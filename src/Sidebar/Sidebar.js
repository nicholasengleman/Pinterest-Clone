import React from 'react';
import './Sidebar.css';
import Button from './SideBarButton/SideBarButton';

class Sidebar extends React.Component{

	render() {
		return (
			<div className="sidebarContainer">
				<h2>Sidebar</h2>
				<h3>Filter By Price</h3>
				<Button text='Under $25' ProductsThatMeetFilter={this.props.priceUnder25} filterProducts={this.props.filterProducts} updatePriceFilter={this.props.updatePriceFilter}/>
				<Button text='$25 to $50' ProductsThatMeetFilter={this.props.price25to50} filterProducts={this.props.filterProducts} updatePriceFilter={this.props.updatePriceFilter}/>
				<Button text='$50 to $100' ProductsThatMeetFilter={this.props.price50to100} filterProducts={this.props.filterProducts} updatePriceFilter={this.props.updatePriceFilter}/>
				<Button text='$100 to $200' ProductsThatMeetFilter={this.props.price100to200} filterProducts={this.props.filterProducts} updatePriceFilter={this.props.updatePriceFilter}/>
				<Button text='$200 & above' ProductsThatMeetFilter={this.props.priceOver200} filterProducts={this.props.filterProducts} updatePriceFilter={this.props.updatePriceFilter}/>
			</div>
		)
	}
}

export default Sidebar;
