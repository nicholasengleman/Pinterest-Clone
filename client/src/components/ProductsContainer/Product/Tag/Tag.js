import React from "react";
import PropTypes from "prop-types";
import "./Tag.css";

const Tag = props => {
  return <div className="tag">{props.text}</div>;
};

Tag.propTypes = {
  text: PropTypes.string
};

export default Tag;
