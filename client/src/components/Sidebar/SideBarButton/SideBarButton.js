import React from "react";
import PropTypes from "prop-types";
import "./SideBarButton.css";

class SideBarButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    this.filterPrice = this.filterPrice.bind(this);
    this.filterTag = this.filterTag.bind(this);
  }

  static propTypes = {
    text: PropTypes.string,
    ProductsThatMeetFilter: PropTypes.number,
    updatePriceFilter: PropTypes.func,
    typeOfFilter: PropTypes.string
  };

  filterPrice(event) {
    this.props.updatePriceFilter(this.props.text);
    this.setState(prevState => ({ selected: !prevState.selected }));
    event.preventDefault();
  }

  filterTag(event) {
    this.props.updateTagFilter(this.props.text);
    this.setState(prevState => ({ selected: !prevState.selected }));
    event.preventDefault();
  }

  render() {
    return (
      <div
        className={
          this.state.selected
            ? "sideBarButton sideBarButton__Selected"
            : "sideBarButton" + " sideBarButton__NotSelected"
        }
      >
        <div className="filterBadge">{this.props.ProductsThatMeetFilter}</div>
        <button
          onClick={
            this.props.typeOfFilter === "Price"
              ? this.filterPrice
              : this.filterTag
          }
        >
          {this.props.text}
        </button>
      </div>
    );
  }
}

export default SideBarButton;
