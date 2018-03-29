import React, {Component} from 'react';
import './App.css';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import ProductsContainer from './ProductsContainer/ProductsContainer';

const initialData = [
	{
		productImageAddress: 'https://www.villagehatshop.com/photos/product/giant/4511390S61354/alt/61354.jpg',
		productName: 'hat',
		productPrice: 5,
		productDescription: 'goes on your head',
		productKey: 123123

	},
	{
		productImageAddress: 'https://images-na.ssl-images-amazon.com/images/I/71QpFBDc2CL._SL1000_.jpg',
		productName: 'trees',
		productPrice: 35,
		productDescription: 'good oxygen',
		productKey: 6778678
	},
	{
		productImageAddress: 'https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg',
		productName: 'cats',
		productPrice: 5000,
		productDescription: 'good for protecting you',
		productKey: 12361

	},
	{
		productImageAddress: 'https://media.mercola.com/assets/images/food-facts/apple.jpg',
		productName: 'apples',
		productPrice: 87,
		productDescription: 'good for keeping the doctor away',
		productKey: 6438678
	}
];

class App extends Component {
	constructor(props) {
		super(props);
		this.baseproductList = [];
		this.searchFilterParameter = '';
		this.PriceFilterParameters = {
			'Under $25': false,
			'$25 to $50': false,
			'$50 to $100': false,
			'$100 to $200': false,
			'$200 & above': false
		};
		this.state = {
			filteredproductList: [],
			QuantityThatMeetPriceFilters: {
				priceUnder25: 0,
				price25to50: 0,
				price50to100: 0,
				price100to200: 0,
				priceOver200: 0
			}
		};

		this.removeProduct = this.removeProduct.bind(this);
		this.findNumberOfPoductsThatMatchEachFilter = this.findNumberOfPoductsThatMatchEachFilter.bind(this);
		this.updatePriceFilter = this.updatePriceFilter.bind(this);
		this.updateSearchParameter = this.updateSearchParameter.bind(this);
	}

	componentWillMount() {
		this.findNumberOfPoductsThatMatchEachFilter(initialData);
		this.baseproductList = initialData;
		this.setState({filteredproductList: initialData});
	}


	removeProduct(productToRemove) {
		this.baseproductList = this.baseproductList.filter(product => {
			if (product.productKey !== productToRemove) {
				return true;
			} else {
				return false;
			}
		});
		this.findNumberOfPoductsThatMatchEachFilter(this.filterProductsByPrice(this.filterProductsBySearch()));
	}


	updateSearchParameter(searchParameter) {
		this.searchFilterParameter = searchParameter;
		this.findNumberOfPoductsThatMatchEachFilter(this.filterProductsByPrice(this.filterProductsBySearch()));
	}

	updatePriceFilter(filter) {
		this.PriceFilterParameters = {
			...this.PriceFilterParameters,
			[filter]: !this.PriceFilterParameters[filter]
		};
		this.findNumberOfPoductsThatMatchEachFilter(this.filterProductsByPrice(this.filterProductsBySearch()));
	}

	filterProductsBySearch() {
		let editedproductList = this.baseproductList.filter(product => {
			if (product.productName.search(this.searchFilterParameter) > -1) {
				return true;
			} else if (product.productDescription.search(this.searchFilterParameter) > -1) {
				return true;
			} else {
				return false;
			}
		});
		return editedproductList;
	}


	filterProductsByPrice(editedproductList) {
		let alwaysReturnTrue = false;
		let params = this.PriceFilterParameters;
		if (!params['Under $25'] && !params['$25 to $50'] && !params['$50 to $100'] && !params['$100 to $200'] && !params['$200 & above']) {
			alwaysReturnTrue = true;
		} else {
			alwaysReturnTrue = false;
		}
		let filteredProductList = editedproductList.filter(product => {
			if (params['Under $25'] || alwaysReturnTrue) {
				if (product.productPrice < 25) {
					return true;
				}
			}
			if (params['$25 to $50'] || alwaysReturnTrue) {
				if (25 < product.productPrice && product.productPrice < 50) {
					return true;
				}
			}
			if (params['$50 to $100'] || alwaysReturnTrue) {
				if (50 < product.productPrice && product.productPrice < 100) {
					return true;
				}
			}
			if (params['$100 to $200'] || alwaysReturnTrue) {
				if (100 < product.productPrice && product.productPrice < 200) {
					return true;
				}
			}
			if (params['$200 & above'] || alwaysReturnTrue) {
				if (200 < product.productPrice) {
					return true;
				}
			}
		});
		this.setState({filteredproductList: filteredProductList});
		return filteredProductList;
	}


	findNumberOfPoductsThatMatchEachFilter(filteredProductList) {
		let priceUnder25 = 0, price25to50 = 0, price50to100 = 0, price100to200 = 0, priceOver200 = 0;
		for (let product of filteredProductList) {
			if (product.productPrice < 25) {
				priceUnder25++;
			}
			if (25 < product.productPrice && product.productPrice < 50) {
				price25to50++;
			}
			if (50 < product.productPrice && product.productPrice < 100) {
				price50to100++;
			}
			if (100 < product.productPrice && product.productPrice < 200) {
				price100to200++;
			}
			if (200 < product.productPrice) {
				priceOver200++;
			}
		}
		this.setState({
			QuantityThatMeetPriceFilters: {
				priceUnder25,
				price25to50,
				price50to100,
				price100to200,
				priceOver200
			}
		})
	}


	render() {
		return (
			<div>
				<Header filterProducts={this.updateSearchParameter}/>
				<main className="homepage">
					<Sidebar priceUnder25={this.state.QuantityThatMeetPriceFilters.priceUnder25}
							 price25to50={this.state.QuantityThatMeetPriceFilters.price25to50}
							 price50to100={this.state.QuantityThatMeetPriceFilters.price50to100}
							 price100to200={this.state.QuantityThatMeetPriceFilters.price100to200}
							 priceOver200={this.state.QuantityThatMeetPriceFilters.priceOver200}
							 updatePriceFilter={this.updatePriceFilter}/>
					<ProductsContainer products={this.state.filteredproductList}
									   searchString={this.searchFilterParameter}
									   removeProduct={this.removeProduct}
					/>
				</main>
			</div>
		);
	}
}

export default App;
