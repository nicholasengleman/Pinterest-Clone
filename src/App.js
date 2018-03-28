import React, {Component} from 'react';
import './App.css';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import ProductsContainer from './ProductsContainer/ProductsContainer';

const initialData = [
	{
		productImageAddress: 'https://www.villagehatshop.com/photos/product/giant/4511390S61354/alt/61354.jpg',
		productName: 'hat',
		productPrice: '$5',
		productDescription: 'goes on your head',
		productKey: 123123

	},
	{
		productImageAddress: 'https://images-na.ssl-images-amazon.com/images/I/71QpFBDc2CL._SL1000_.jpg',
		productName: 'trees',
		productPrice: '$34',
		productDescription: 'makes oxygen',
		productKey: 6778678
	},
	{
		productImageAddress: 'https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg',
		productName: 'cats',
		productPrice: '$5000',
		productDescription: 'good for protecting you',
		productKey: 12361

	},
	{
		productImageAddress: 'https://media.mercola.com/assets/images/food-facts/apple.jpg',
		productName: 'apples',
		productPrice: '$87',
		productDescription: 'good for keeping the doctor away',
		productKey: 6438678
	}
];

class App extends Component {
	constructor(props) {
		super(props);

		this.removeProduct = this.removeProduct.bind(this);
		this.filterProducts = this.filterProducts.bind(this);
	}

	componentWillMount() {
		this.setState({products: initialData, filteredProducts:initialData });
	}

	filterProducts(searchInput) {
		let filteredProductList = this.state.products.filter(product => {
			if(product.productName.search(searchInput)>-1) {
				return true;
			} else if (product.productDescription.search(searchInput)>-1) {
				return true;
			} else {
				return false;
			}
		});
		this.setState({filteredProducts: filteredProductList });
	}

	removeProduct(productToRemove) {
		let newProductList = this.state.products.filter(product  => {
			if(product.productKey !== productToRemove) {
				return true;
			} else {
				return false;
			}
		});
		this.setState({ products: newProductList, filteredProducts: newProductList });
	}



	render() {
		return (
			<div>
				<Header filterProducts={this.filterProducts} />
				<main className="homepage">
					<Sidebar/>
					<ProductsContainer products={this.state.filteredProducts}
									   removeProduct={this.removeProduct}
					/>
				</main>
			</div>
		);
	}
}

export default App;
