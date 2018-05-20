import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { DeleteCookie } from "../../Functions/CookieFunctions";

import { Text } from "gestalt";

import SearchBar from "./SearchBar/SearchBar";
import LoginRegisterModal from "../LoginRegisterModal/LoginRegisterModal";

import "gestalt/dist/gestalt.css";
import "./Header.css";

const Header = props => {
  const logout = event => {
    event.preventDefault();
    axios
      .get("/api/logout")
      .then(function(response) {
        props.removeUserData();
      })
      .catch(function(error) {
        console.log(error);
      });
    DeleteCookie();
  };

  const gotoBoards = () => {
	  props.history.push("/boards");
  };

  const gotoPins = () => {
	  props.history.push("/pins");
  };

  return (
    <header className="header">
      <SearchBar filterProducts={props.filterProducts} name={props.name} />

      <div className="header__headerLink" onClick={gotoBoards}>
        <div className="header__headerLink_desktop">
          <Text inline bold size="lg" color="gray">
            My Boards
          </Text>
        </div>
        <div className="header__headerLink_mobile">
          <Text inline bold size="sm" color="gray">
            Boards
          </Text>
        </div>
        <div className="header__headerLink_notification-boards">
          {(props.boards && props.boards.length) || 0}
        </div>
      </div>

      <div className="header__headerLink" onClick={gotoPins}>
        <div className="header__headerLink_desktop">
          <Text inline bold size="lg" color="gray">
            My Pins
          </Text>
        </div>
        <div className="header__headerLink_mobile">
          <Text inline bold size="sm" color="gray">
            Pins
          </Text>
        </div>
        <div className="header__headerLink_notification-pins">
          {(props.pinsCount && props.pinsCount.length) || 0}
        </div>
      </div>

      {props.name !== "User" ? (
        <div className="header__headerLink" onClick={logout}>
          <div className="header__headerLink_desktop">
            <Text inline size="lg" color="red">
              Log Out
            </Text>
          </div>
          <div className="header__headerLink_mobile">
            <Text inline size="sm" color="red">
              Log Out
            </Text>
          </div>
        </div>
      ) : (
        <div>
          <div
            className="header__headerLink"
            onClick={props.toggleLoginRegisterModal}
          >
            <div className="header__headerLink_desktop">
              <Text inline size="lg" color="red">
                Login/Register
              </Text>
            </div>
            <div className="header__headerLink_mobile">
              <Text inline size="sm" color="red">
                Login/Register
              </Text>
            </div>
          </div>
          <LoginRegisterModal
            isOpen={props.LoginRegisterModalisOpen}
            toggleLoginRegisterModal={props.toggleLoginRegisterModal}
            setUserData={props.setUserData}
          />
        </div>
      )}
    </header>
  );
};

export default withRouter(Header);
