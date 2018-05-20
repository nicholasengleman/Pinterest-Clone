import React from "react";
import { Icon } from "gestalt";

import "gestalt/dist/gestalt.css";
import "./SearchBar.css";

const SearchBar = props => {
  const searchInputChange = event => {
    props.filterProducts(event.target.value);
    event.preventDefault();
  };

  return (
    <div className="searchContainer">
      <div className="iconContainer">
        <Icon accessibilityLabel="search" icon="search" size={20} />
      </div>
      <form id="searchInput">
        <input
          type="search"
          id="search"
          name="search"
          className="searchInput"
          onChange={searchInputChange}
          placeholder={
            props.name !== "User"
              ? `Hello ${props.name}, looking for something?`
              : `Hello ${props.name}...register to save your boards, pins and comments...otherwise they will disappear when the browser refreshes.`
          }
        />
      </form>
    </div>
  );
};

export default SearchBar;
