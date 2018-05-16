import React from "react";
import PropTypes from "prop-types";
import "./Sidebar.css";
import Button from "./SideBarButton/SideBarButton";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.addNewContent = this.addNewContent.bind(this);
  }

  static propTypes = {
    updatePriceFilter: PropTypes.func,
    updateTagFilter: PropTypes.func,
    MeetsPriceFilters: PropTypes.object,
    MeetsTagFilters: PropTypes.array
  };

  addNewContent(event) {
    this.props.addNewContent();
    event.preventDefault();
  }

  render() {
    return (
      <div className="sidebarContainer">
        {this.props.adminMode ? (
          <button className="addNewContent" onClick={this.addNewContent}>
            add new product
          </button>
        ) : null}
        <h3>add a Price Filter</h3>
        <Button
          text="Under $25"
          ProductsThatMeetFilter={this.props.MeetsPriceFilters.priceUnder25}
          updatePriceFilter={this.props.updatePriceFilter}
          typeOfFilter="Price"
        />
        <Button
          text="$25 to $50"
          ProductsThatMeetFilter={this.props.MeetsPriceFilters.price25to50}
          updatePriceFilter={this.props.updatePriceFilter}
          typeOfFilter="Price"
        />
        <Button
          text="$50 to $100"
          ProductsThatMeetFilter={this.props.MeetsPriceFilters.price50to100}
          updatePriceFilter={this.props.updatePriceFilter}
          typeOfFilter="Price"
        />
        <Button
          text="$100 to $200"
          ProductsThatMeetFilter={this.props.MeetsPriceFilters.price100to200}
          updatePriceFilter={this.props.updatePriceFilter}
          typeOfFilter="Price"
        />
        <Button
          text="$200 to $500"
          ProductsThatMeetFilter={this.props.MeetsPriceFilters.price200to500}
          updatePriceFilter={this.props.updatePriceFilter}
          typeOfFilter="Price"
        />
        <Button
          text="$500 & above"
          ProductsThatMeetFilter={this.props.MeetsPriceFilters.priceOver500}
          updatePriceFilter={this.props.updatePriceFilter}
          typeOfFilter="Price"
        />
        <br />
        <h3>add a Tag Filter</h3>
        {this.props.MeetsTagFilters.map(tags => (
          <Button
            text={tags[0]}
            ProductsThatMeetFilter={tags[1]}
            updateTagFilter={this.props.updateTagFilter}
            typeOfFilter="Tag"
            key={tags[0]}
          />
        ))}
      </div>
    );
  }
}

export default Sidebar;
