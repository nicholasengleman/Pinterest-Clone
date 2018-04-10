import React from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';
import Button from './SideBarButton/SideBarButton';

const Sidebar = (props) => {
		return (
			<div className="sidebarContainer">
				<h3>add a Price Filter</h3>
				<Button text='Under $25' ProductsThatMeetFilter={props.MeetsPriceFilters.priceUnder25} updatePriceFilter={props.updatePriceFilter} typeOfFilter='Price'/>
				<Button text='$25 to $50' ProductsThatMeetFilter={props.MeetsPriceFilters.price25to50} updatePriceFilter={props.updatePriceFilter} typeOfFilter='Price'/>
				<Button text='$50 to $100' ProductsThatMeetFilter={props.MeetsPriceFilters.price50to100} updatePriceFilter={props.updatePriceFilter} typeOfFilter='Price'/>
				<Button text='$100 to $200' ProductsThatMeetFilter={props.MeetsPriceFilters.price100to200}  updatePriceFilter={props.updatePriceFilter} typeOfFilter='Price'/>
				<Button text='$200 to $500' ProductsThatMeetFilter={props.MeetsPriceFilters.price200to500}  updatePriceFilter={props.updatePriceFilter} typeOfFilter='Price'/>
				<Button text='$500 & above' ProductsThatMeetFilter={props.MeetsPriceFilters.priceOver500}  updatePriceFilter={props.updatePriceFilter} typeOfFilter='Price'/>
				<br />
				<h3>add a Tag Filter</h3>
				{ props.MeetsTagFilters.map(tags => (
					<Button text={tags[0]} ProductsThatMeetFilter={tags[1]} updateTagFilter={props.updateTagFilter} typeOfFilter='Tag' key={tags[0]}/>
				))}
			</div>
		)
	};


Sidebar.propTypes = {
	updatePriceFilter : PropTypes.func,
	updateTagFilter : PropTypes.func,
	MeetsPriceFilters : PropTypes.object,
	MeetsTagFilters : PropTypes.array
};

export default Sidebar;
