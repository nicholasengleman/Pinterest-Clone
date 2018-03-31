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
		productTags: ['clothes', 'hats', 'fashion', 'pets', 'bernadette'],
		productKey: 123123

	},
	{
		productImageAddress: 'https://images-na.ssl-images-amazon.com/images/I/71QpFBDc2CL._SL1000_.jpg',
		productName: 'trees',
		productPrice: 20,
		productDescription: 'good oxygen',
		productTags: ['plants', 'decor'],
		productKey: 6778678
	},
	{
		productImageAddress: 'https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg',
		productName: 'cats',
		productPrice: 5000,
		productDescription: 'good for protecting you',
		productTags: ['pets', 'gift'],
		productKey: 12361

	},
	{
		productImageAddress: 'https://media.mercola.com/assets/images/food-facts/apple.jpg',
		productName: 'apples',
		productPrice: 87,
		productDescription: 'good for keeping the doctor away',
		productTags: ['food', 'health', 'gift'],
		productKey: 6438678
	}
];

class App extends Component {
	constructor(props) {
		super(props);
		this.baseproductList = [];
		this.basetags = [];
		this.searchFilterParameter = '';
		this.TagFilterParameters = [];
		this.FilteredProductList = [];
		this.PriceFilterParameters = {
			'Under $25': false,
			'$25 to $50': false,
			'$50 to $100': false,
			'$100 to $200': false,
			'$200 & above': false
		};
		this.state = {
			DisplayedProductList: [],
			MeetsPriceFilters: {},
			MeetsTagFilters: []
		};

		this.removeProduct = this.removeProduct.bind(this);
		this.findNumPoductsMatchPriceFilter = this.findNumPoductsMatchPriceFilter.bind(this);
		this.findNumPoductsMatchTagFilter = this.findNumPoductsMatchTagFilter.bind(this);
		this.updatePriceFilter = this.updatePriceFilter.bind(this);
		this.updateTagFilter = this.updateTagFilter.bind(this);
		this.updateSearchParameter = this.updateSearchParameter.bind(this);
	}

	componentWillMount() {
		this.findNumPoductsMatchPriceFilter(initialData);
		this.findNumPoductsMatchTagFilter(initialData);
		this.baseproductList = initialData;
		this.setState({DisplayedProductList: initialData});
	}


	removeProduct(productToRemove) {
		this.baseproductList = this.baseproductList.filter(product => {
			if (product.productKey !== productToRemove) {
				return true;
			} else {
				return false;
			}
		});

		this.basetags = [];
		this.setState({DisplayedProductList: this.filterProductsByTag(this.filterProductsByPrice(this.filterProductsBySearch()))});
		this.findNumPoductsMatchPriceFilter(this.FilteredProductList);
		this.findNumPoductsMatchTagFilter(this.FilteredProductList);
	}


	updateSearchParameter(searchParameter) {
		this.searchFilterParameter = searchParameter;
		this.setState({DisplayedProductList: this.filterProductsByTag(this.filterProductsByPrice(this.filterProductsBySearch()))});
		this.findNumPoductsMatchPriceFilter(this.FilteredProductList);
		this.findNumPoductsMatchTagFilter(this.FilteredProductList);
	}

	updatePriceFilter(filter) {
		this.PriceFilterParameters = {
			...this.PriceFilterParameters,
			[filter]: !this.PriceFilterParameters[filter]
		};
		this.setState({DisplayedProductList: this.filterProductsByTag(this.filterProductsByPrice(this.filterProductsBySearch()))});
		this.findNumPoductsMatchPriceFilter(this.FilteredProductList);
		this.findNumPoductsMatchTagFilter(this.FilteredProductList);
	}

	updateTagFilter(filter) {
		let filterAdded = false;
		if (this.TagFilterParameters.length < 1) {
			this.TagFilterParameters.push([filter, true]);
		} else {
			for (let e = 0; e < this.TagFilterParameters.length; e++) {
				if (this.TagFilterParameters[e][0] === filter) {
					this.TagFilterParameters[e] = [filter, !this.TagFilterParameters[e][1]];
					filterAdded = true;
					break;
				}
			}
			if(!filterAdded) {
				this.TagFilterParameters.push([filter, true]);
			}
		}

		console.log(this.TagFilterParameters);
		this.setState({DisplayedProductList: this.filterProductsByTag(this.filterProductsByPrice(this.filterProductsBySearch()))});
		this.findNumPoductsMatchPriceFilter(this.FilteredProductList);
		this.findNumPoductsMatchTagFilter(this.FilteredProductList);
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
		let FilteredProductList = editedproductList.filter(product => {
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
		return FilteredProductList;
	}

	filterProductsByTag(editedproductList) {
		let alwaysReturnTrue = false;
		let params = this.TagFilterParameters;
		if (params.length === 0) {
			alwaysReturnTrue = true;
		} else if (params.every(tag => tag[1] === false)) {
			alwaysReturnTrue = true;
		} else {
			alwaysReturnTrue = false;
		}
		let FilteredProductList = editedproductList.filter(product => {
			if (alwaysReturnTrue) {
				return true;
			}
			for (let e = 0; e < params.length; e++) {

				if (params[e][1] && (product.productTags.find(tag => tag === params[e][0]))) {
					return true;
				}
			}
		});
		this.FilteredProductList = FilteredProductList;
		return FilteredProductList;
	}


	findNumPoductsMatchPriceFilter(FilteredProductList) {
		let priceUnder25 = 0, price25to50 = 0, price50to100 = 0, price100to200 = 0, priceOver200 = 0;
		for (let product of FilteredProductList) {
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
			MeetsPriceFilters: {
				priceUnder25,
				price25to50,
				price50to100,
				price100to200,
				priceOver200
			}
		})
	}

	findNumPoductsMatchTagFilter(FilteredProductList) {
		let tagsCount;
		if(this.basetags.length>0) {
			tagsCount = this.basetags;
			tagsCount.forEach(element => element[1] = 0);
		} else {
			tagsCount = [];
		}
		for (let product of FilteredProductList) {
			for (let tag of product.productTags) {
				let index = tagsCount.findIndex(element => (element[0] === tag));
				if (index > -1) {
					tagsCount[index][1]++;
				} else {
					tagsCount.push([tag, 1]);
				}
			}
		}
		this.basetags = tagsCount;
		this.setState({MeetsTagFilters: tagsCount});
	}


	render() {
		return (
			<div>
				<Header filterProducts={this.updateSearchParameter}/>
				<main className="homepage">
					<Sidebar priceUnder25={this.state.MeetsPriceFilters.priceUnder25}
							 price25to50={this.state.MeetsPriceFilters.price25to50}
							 price50to100={this.state.MeetsPriceFilters.price50to100}
							 price100to200={this.state.MeetsPriceFilters.price100to200}
							 priceOver200={this.state.MeetsPriceFilters.priceOver200}
							 updatePriceFilter={this.updatePriceFilter}
							 updateTagFilter={this.updateTagFilter}
							 MeetsTagFilters={this.basetags}
					/>
					<ProductsContainer products={this.state.DisplayedProductList}
									   searchString={this.searchFilterParameter}
									   removeProduct={this.removeProduct}
					/>
				</main>
			</div>
		);
	}
}

export default App;
