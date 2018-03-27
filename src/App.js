import React, {Component} from 'react';
import './App.css';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import ProductsContainer from './ProductsContainer/ProductsContainer';

class App extends Component {
	render() {
		return (
			<div>
				<Header/>
				<main className="homepage">
					<Sidebar/>
					<ProductsContainer/>
				</main>
			</div>
		);
	}
}

export default App;
