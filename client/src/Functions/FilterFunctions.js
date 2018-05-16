export function updateSearchParameter(searchParameter) {
	this.searchFilterParameter = searchParameter;
	this.setState({DisplayedProductList: this.filterProductsByTag(this.filterProductsByPrice(this.filterProductsBySearch()))});
	this.findNumPoductsMatchPriceFilter(this.FilteredProductList);
	this.findNumPoductsMatchTagFilter(this.FilteredProductList);
}

export function updatePriceFilter(filter) {
	this.PriceFilterParameters = {
		...this.PriceFilterParameters,
		[filter]: !this.PriceFilterParameters[filter]
	};
	this.setState({DisplayedProductList: this.filterProductsByTag(this.filterProductsByPrice(this.filterProductsBySearch()))});
	this.findNumPoductsMatchTagFilter(this.FilteredProductList);
	if (this.FilteredProductList.length === this.baseproductList.length) {
		this.findNumPoductsMatchPriceFilter(this.FilteredProductList);
	}
}

export function updateTagFilter(filter) {
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
		if (!filterAdded) {
			this.TagFilterParameters.push([filter, true]);
		}
	}

	this.setState({DisplayedProductList: this.filterProductsByTag(this.filterProductsByPrice(this.filterProductsBySearch()))});
	this.findNumPoductsMatchPriceFilter(this.FilteredProductList);
	if (this.FilteredProductList.length === this.baseproductList.length) {
		this.findNumPoductsMatchTagFilter(this.FilteredProductList);
	}
}


export function filterProductsByPrice(editedproductList) {
	let alwaysReturnTrue = false;
	let params = this.PriceFilterParameters;
	if (!params['Under $25'] && !params['$25 to $50'] && !params['$50 to $100'] && !params['$100 to $200'] && !params['$200 to $500'] && !params['$500 & above']) {
		alwaysReturnTrue = true;
	} else {
		alwaysReturnTrue = false;
	}
	return editedproductList.filter(product => {
		if (alwaysReturnTrue) {
			return true;
		}
		if (params['Under $25']) {
			if (product.productPrice < 25) {
				return true;
			}
		}
		if (params['$25 to $50']) {
			if (25 < product.productPrice && product.productPrice < 50) {
				return true;
			}
		}
		if (params['$50 to $100']) {
			if (50 < product.productPrice && product.productPrice < 100) {
				return true;
			}
		}
		if (params['$100 to $200']) {
			if (100 < product.productPrice && product.productPrice < 200) {
				return true;
			}
		}
		if (params['$200 to $500']) {
			if (200 < product.productPrice && product.productPrice < 500) {
				return true;
			}
		}
		if (params['$500 & above']) {
			if (500 < product.productPrice) {
				return true;
			}
		}
		return false;
	});
}


export function filterProductsBySearch() {
	return this.baseproductList.filter(product => {
		if (product.productName.search(this.searchFilterParameter) > -1) {
			return true;
		} else if (product.productDescription.search(this.searchFilterParameter) > -1) {
			return true;
		} else {
			return false;
		}
	});
}

export function filterProductsByTag(editedproductList) {
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
		return false;
	});
	this.FilteredProductList = FilteredProductList;
	return FilteredProductList;
}

export function findNumPoductsMatchPriceFilter(FilteredProductList) {
	let priceUnder25 = 0, price25to50 = 0, price50to100 = 0, price100to200 = 0, price200to500 = 0, priceOver500 = 0;
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
		if (200 < product.productPrice && product.productPrice < 500) {
			price200to500++;
		}
		if (500 < product.productPrice) {
			priceOver500++;
		}
	}
	this.setState({
		MeetsPriceFilters: {
			priceUnder25,
			price25to50,
			price50to100,
			price100to200,
			price200to500,
			priceOver500
		}
	})
}

export function findNumPoductsMatchTagFilter(FilteredProductList) {
	let tagsCount;
	if (this.basetags.length > 0) {
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

