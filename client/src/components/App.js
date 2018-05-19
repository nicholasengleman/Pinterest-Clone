import React, { Component } from "react";
import axios from "axios";

import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header/Header";
import Boards from "./Boards/Boards";
import Sidebar from "./Sidebar/Sidebar";
import ProductsContainer from "./ProductsContainer/ProductsContainer";
import ConfirmationToast from "./ConfirmationToast/ConfirmationToast";
import ProductComments from "./ProductComments/ProductComments";
import IndividualBoard from "./Boards/IndividualBoard/IndividualBoard";
import AllPins from "./AllPins/AllPins";

import { FindCookie } from "../Functions/CookieFunctions";
import {
  deleteComment,
  openEditCommentWindow,
  editComment,
  addNewComment
} from "../Functions/CommentFunctions";
import {
  addPinToExistingBoard,
  deletePinFromBoard,
  addPinToNewBoard,
  justThePins
} from "../Functions/PinFunctions";
import {
  createNewBoard,
  editBoard,
  deleteBoard
} from "../Functions/BoardFunctions";
import {
  updateSearchParameter,
  updatePriceFilter,
  updateTagFilter,
  filterProductsByPrice,
  filterProductsBySearch,
  filterProductsByTag,
  findNumPoductsMatchPriceFilter,
  findNumPoductsMatchTagFilter
} from "../Functions/FilterFunctions";
import {
  toggleLoginRegisterModal,
  setUserData,
  removeUserData
} from "../Functions/UserFunctions";

class App extends Component {
  constructor(props) {
    super(props);
    this.baseproductList = [];
    this.basetags = [];
    this.searchFilterParameter = "";
    this.TagFilterParameters = [];
    this.FilteredProductList = [];
    this.PriceFilterParameters = {
      "Under $25": false,
      "$25 to $50": false,
      "$50 to $100": false,
      "$100 to $200": false,
      "$200 to $500": false,
      "$500 & above": false
    };
    this.state = {
      UserData: {},
      LoginRegisterModalisOpen: false,
      ConfirmationToast: {
        ShowConfirmationToast: false,
        ToastImage: "",
        ToastAction: "",
        ToastActionDestination: ""
      },
      DisplayedProductList: [],
      MeetsPriceFilters: {},
      MeetsTagFilters: []
    };

    this.deleteComment = deleteComment.bind(this);
    this.openEditCommentWindow = openEditCommentWindow.bind(this);
    this.editComment = editComment.bind(this);
    this.addNewComment = addNewComment.bind(this);
    this.addPinToExistingBoard = addPinToExistingBoard.bind(this);
    this.deletePinFromBoard = deletePinFromBoard.bind(this);
    this.justThePins = justThePins.bind(this);
    this.addPinToNewBoard = addPinToNewBoard.bind(this);
    this.createNewBoard = createNewBoard.bind(this);
    this.editBoard = editBoard.bind(this);
    this.deleteBoard = deleteBoard.bind(this);
    this.updateSearchParameter = updateSearchParameter.bind(this);
    this.updatePriceFilter = updatePriceFilter.bind(this);
    this.updateTagFilter = updateTagFilter.bind(this);
    this.filterProductsByPrice = filterProductsByPrice.bind(this);
    this.filterProductsByTag = filterProductsByTag.bind(this);
    this.findNumPoductsMatchPriceFilter = findNumPoductsMatchPriceFilter.bind(
      this
    );
    this.findNumPoductsMatchTagFilter = findNumPoductsMatchTagFilter.bind(this);
    this.filterProductsBySearch = filterProductsBySearch.bind(this);
    this.toggleLoginRegisterModal = toggleLoginRegisterModal.bind(this);
    this.setUserData = setUserData.bind(this);
    this.removeUserData = removeUserData.bind(this);
  }

  componentWillMount() {
    let t = this;
    axios.get("/api/GetAllProducts").then(function(response) {
      const databaseData = response.data;

      function collectData(callback) {
        let ProjectData = [];
        for (let property1 in databaseData) {
          ProjectData.push({
            productName: databaseData[property1].name,
            productPrice: databaseData[property1].price,
            productImageAddress: databaseData[property1].productImageAddress,
            productTags: databaseData[property1].tags.split(","),
              productDescription: databaseData[property1].description,
            productID: databaseData[property1].productKey,
            productComments: databaseData[property1].comments
          });
        }
        callback(ProjectData);
      }

      collectData(ProjectData => {
        t.findNumPoductsMatchPriceFilter(ProjectData);
        t.findNumPoductsMatchTagFilter(ProjectData);
        t.baseproductList = ProjectData;
        t.setState({ DisplayedProductList: ProjectData });
      });
    });

    fetch("/api/loggedInUserReturning", {
      method: "POST",
      body: JSON.stringify({
        token: FindCookie()
      }),
      credentials: "include",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .catch(error => console.log("Error: ", error))
      .then(response => {
        if (response.firstName) {
          t.setUserData({
            boards: response.boards,
            name: response.firstName,
            userId: response.email
          });
        }
      });
  }

  displayConfirmationToast = (
    ToastImage,
    ToastAction,
    ToastActionDestination
  ) => {
    this.setState({
      ConfirmationToast: {
        ShowConfirmationToast: true,
        ToastImage,
        ToastAction,
        ToastActionDestination
      }
    });
    setTimeout(
      function() {
        this.setState({ ConfirmationToast: { ShowConfirmationToast: false } });
      }.bind(this),
      3500
    );
  };

  render() {
    return (
      <Router>
        <div>
          <Route
            exact
            path="/boards/:board"
            render={({ match }) => (
              <IndividualBoard
                boardID={match.params.board}
                boards={this.state.UserData.Boards}
                deletePinFromBoard={this.deletePinFromBoard}
              />
            )}
          />
          <Route
            exact
            path="/pins"
            render={() => (
              <AllPins
                deletePinFromBoard={this.deletePinFromBoard}
                pins={this.state.UserData.pins}
              />
            )}
          />
          <Route
            exact
            path="/boards"
            render={() => (
              <Boards
                Boards={this.state.UserData.Boards}
                products={this.state.DisplayedProductList}
                createNewBoard={this.createNewBoard}
                deleteBoard={this.deleteBoard}
                editBoard={this.editBoard}
              />
            )}
          />

          <Route
            exact
            path="/products/:product"
            render={({ match }) => (
              <ProductComments
                productID={match.params.product}
                productList={this.state.DisplayedProductList}
                addNewComment={this.addNewComment}
                addPinToExistingBoard={this.addPinToExistingBoard}
                addPinToNewBoard={this.addPinToNewBoard}
                boards={this.state.UserData.Boards}
                deleteComment={this.deleteComment}
                editComment={this.editComment}
                openEditCommentWindow={this.openEditCommentWindow}
                userData={this.state.UserData}
                toggleLoginRegisterModal={this.toggleLoginRegisterModal}
                LoginRegisterModalisOpen={this.state.LoginRegisterModalisOpen}
                setUserData={this.setUserData}
              />
            )}
          />

          <Route
            exact
            path="/"
            render={() => (
              <Header
                filterProducts={this.updateSearchParameter}
                removeUserData={this.removeUserData}
                setUserData={this.setUserData}
                name={this.state.UserData.name}
                boards={this.state.UserData.Boards}
                pinsCount={this.state.UserData.pins}
                toggleLoginRegisterModal={this.toggleLoginRegisterModal}
                LoginRegisterModalisOpen={this.state.LoginRegisterModalisOpen}
              />
            )}
          />

          <Route
            exact
            path="/"
            render={() => (
              <main className="homepage">
                <Sidebar
                  MeetsPriceFilters={this.state.MeetsPriceFilters}
                  updatePriceFilter={this.updatePriceFilter}
                  updateTagFilter={this.updateTagFilter}
                  addNewContent={this.addNewContent}
                  MeetsTagFilters={this.basetags}
                />

                <ProductsContainer
                  products={this.state.DisplayedProductList}
                  boards={this.state.UserData.Boards}
                  searchString={this.searchFilterParameter}
                  removeProduct={this.removeProduct}
                  editProduct={this.editProduct}
                  submitNewProductInfo={this.submitNewProductInfo}
                  addPinToExistingBoard={this.addPinToExistingBoard}
                  addPinToNewBoard={this.addPinToNewBoard}
                  toggleLoginRegisterModal={this.toggleLoginRegisterModal}
                  loginRegisterModalisOpen={this.state.LoginRegisterModalisOpen}
                  setUserData={this.setUserData}
                  name={this.state.UserData.name}
                />
              </main>
            )}
          />
          {this.state.ConfirmationToast.ShowConfirmationToast && (
            <ConfirmationToast
              ConfirmationToast={this.state.ConfirmationToast}
            />
          )}
        </div>
      </Router>
    );
  }
}

export default App;
