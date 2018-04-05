import React, {Component} from 'react';
import './App.css';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import ProductsContainer from './ProductsContainer/ProductsContainer';

const initialData = [
	{
		productImageAddress: 'https://i.pinimg.com/564x/17/99/ce/1799cef253e7b8db5c36ad3b92637ef4.jpg',
		productName: 'French White Sofa',
		productPrice: 399,
		productDescription: 'perfect sofa for decorating your living room',
		productTags: ['decor', 'sofa'],
		productKey: 1

	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/e0/53/0c/e0530ca788bffb9b449f22494e8e7f1a.jpg',
		productName: 'Deck Decorations',
		productPrice: 69,
		productDescription: 'a perfect mix of deck decorations',
		productTags: ['decor', 'deck'],
		productKey: 2
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/42/22/ac/4222ac418a4ae3e70d8bd1d61e19c1c3.jpg',
		productName: 'Decorative Outdoor Fireplace',
		productPrice: 199,
		productDescription: 'Brings the family together',
		productTags: ['decor', 'outdoors'],
		productKey: 3

	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/4d/9b/4f/4d9b4ff9801362c075528b45e5742b13.jpg',
		productName: 'Bathroom Decor',
		productPrice: 87,
		productDescription: 'Decorate your bathromo with these items',
		productTags: ['decor', 'bathroom', 'gifts'],
		productKey: 4
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/99/c4/b9/99c4b9498c4805f0cf8fd448c1c32db1.jpg',
		productName: 'Rustic Hideaway Trash bin',
		productPrice: 49,
		productDescription: 'This trash bin will hide your trash for a good price',
		productTags: ['decor', 'kitchen', 'rustic'],
		productKey: 5

	},
	{
		productImageAddress: 'https://i.pinimg.com/236x/49/70/8e/49708e72cfda961c71ab2063dcb77842.jpg',
		productName: 'Oxford Shoes',
		productPrice: 20,
		productDescription: 'Feathers Canvas Stentorian Oxford',
		productTags: ['gifts', 'shoes', 'fashion'],
		productKey: 6
	},
	{
		productImageAddress: 'https://i.pinimg.com/originals/c7/13/ee/c713ee558af9300f7c2d7b86e4c88391.jpg',
		productName: 'Mens Leisure Slip-On Loafers\n',
		productPrice: 37,
		productDescription: 'Leisure slip-on loafers for the modern man - Textured leather design offers a unique look - Comfortable breathable upper - Made from leather - Available in 3 colors',
		productTags: ['shoes', 'fashion'],
		productKey: 7

	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/8d/de/97/8dde977030404ab69c540848e1c5ca32.jpg',
		productName: 'Wonder Woman Poster',
		productPrice: 29,
		productDescription: 'featuring the Amazonian princess kneeling at the ready with her shield and sword, awash in decidedly wondrous and warm hues of orange and red',
		productTags: ['movies', 'gifts', 'poster'],
		productKey: 8
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/2f/4c/9b/2f4c9b463e810ae12abb00168e236981.jpg',
		productName: 'The Incredibles',
		productPrice: 14,
		productDescription: 'a 2004 American computer-animated superhero film written and directed by Brad Bird...',
		productTags: ['movies'],
		productKey: 9

	},
	{
		productImageAddress: 'http://static.tvtropes.org/pmwiki/pub/images/Shawshank_Redemption.jpg',
		productName: 'The Shawshank Redemption',
		productPrice: 12,
		productDescription: '...a 1994 drama film based on Stephen King\'s novella Rita Hayworth and Shawshank Redemption from his novella collection Different Seasons',
		productTags: ['movies', 'gifts'],
		productKey: 10
	},
	{
		productImageAddress: 'https://i.pinimg.com/originals/10/ba/d5/10bad5b005fdc4c1634f0129011d7146.jpg',
		productName: 'War for the Planet of the Apes Poster',
		productPrice: 9,
		productDescription: 'good for protecting you',
		productTags: ['movies', 'gift', 'poster'],
		productKey: 11

	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/bd/a2/90/bda290318816d59a338c97bb6beaa203.jpg',
		productName: '12" MacBook Retina 2015',
		productPrice: 899,
		productDescription: 'Razor thin, feather light, and even faster and more powerful than before...',
		productTags: ['electronics'],
		productKey: 12
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/28/f5/41/28f5417b214f72f2c4e24e6a1d8697dc.jpg',
		productName: 'Unique Expandable USB',
		productPrice: 69,
		productDescription: 'When the modular concept is added to technology, wonderful things can happen. Just have a look at this innovative stackable USB flash drive for example.',
		productTags: ['electronics', 'gifts'],
		productKey: 13

	},
	{
		productImageAddress: 'https://noveltystreet.com/wp-content/uploads/2016/03/Clover-Power-Stone-USB-Flash-Drive-Gift-Idea-For-Officemate-590x529.jpg',
		productName: 'Stone USB',
		productPrice: 59,
		productDescription: 'This flash drive, which comes in 8GB or 16GB flavors, is encased in a polymer clay' +
		' designed to look like a stone',
		productTags: ['electronics', 'gifts'],
		productKey: 14
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/73/e6/ca/73e6ca829fd3e04dae2f78566f73d40b.jpg',
		productName: 'Men\'s Belt',
		productPrice: 14,
		productDescription: 'Length:120cm/47.24\'\', double ring buckle.',
		productTags: ['fashion', 'belts'],
		productKey: 15

	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/e4/b9/a4/e4b9a4d79eb4be0098b3a9b98090b8cf.jpg',
		productName: 'Trafalgar \'Garrett\' Leather Belt',
		productPrice: 33,
		productDescription: 'Stylish brown belt that looks good in any occasion',
		productTags: ['fashion', 'belts'],
		productKey: 16
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/e9/4e/7a/e94e7a11561ff67b0748c25a815a071c.jpg',
		productName: 'Men\'s Denver Satchel Wallet',
		productPrice: 69,
		productDescription: 'Elegant Men\'s wallet in whiskey color',
		productTags: ['wallet', 'fashion'],
		productKey: 17
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/c3/9b/90/c39b9037deffd751c2918faae259e41c.jpg',
		productName: 'Fossil Men’s Wallet',
		productPrice: 149,
		productDescription: 'Fossil Men’s Derrick Front Pocket Bifold ',
		productTags: ['wallet', 'fashion', 'gifts'],
		productKey: 18
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/45/07/ed/4507ed4ff2e9318b6e9d25f1a4e8f846.jpg',
		productName: 'Oreo Pancakes',
		productPrice: 26,
		productDescription: 'Chocolate Cookies and Cream flavored pancakes are stacked together with layers of whipped cream to resemble Oreos',
		productTags: ['food', 'dessert'],
		productKey: 19
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/16/d6/af/16d6af4304a6292bcd06933eacddd78b.jpg',
		productName: 'Sausage, Pepper and Rice Skillet',
		productPrice: 12,
		productDescription: 'Smoky kielbasa sizzled with sweet bell pepper, onions and garlic in vibrant tomato sauce. This quick and easy sausage, pepper and rice skillet is downright delicious!',
		productTags: ['food', 'lunch'],
		productKey: 20
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/28/c0/32/28c032453ec18263e3b56a44e024a85a.jpg',
		productName: 'Homemade Honey Corn Dogs',
		productPrice: 9,
		productDescription: 'These homemade honey corn dogs are perfect as snack or appetizer and are ready to go in just 45 minutes! You\'ll never go back to the freezer kind!',
		productTags: ['food', 'lunch'],
		productKey: 21
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/1e/96/33/1e9633fa4beabc3865781386db8c65d8.jpg',
		productName: 'Strawberry Banana Pancake Skewers',
		productPrice: 29,
		productDescription: 'Skewer it up!',
		productTags: ['food', 'dessert'],
		productKey: 22
	},
	{
		productImageAddress: 'https://i.pinimg.com/236x/86/7b/1f/867b1f92d4d0e19ec7abd9947fbfb9b9.jpg',
		productName: 'Chocolate Cookies and Cream Cupcakes with Cream Cheese Frosting',
		productPrice: 55,
		productDescription: 'Moist homemade double chocolate cookies and cream cupcakes with cream cheese frosting! A fun dessert for any celebration or just because!',
		productTags: ['food', 'dessert'],
		productKey: 23
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/f3/b3/9e/f3b39e98919ba10337735fb83667cdfd.jpg',
		productName: 'Extreme S\'mores Milkshakes',
		productPrice: 13,
		productDescription: 'Fun S\'mores milkshakes with chocolate, graham cracker and toasted marshmallow. Make this recipe just in time for National S\'mores Day!',
		productTags: ['food', 'dessert'],
		productKey: 24
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/15/6c/8a/156c8adea90b4e91786e8c3004e1b180.jpg',
		productName: 'Mexican Rice',
		productPrice: 29,
		productDescription: 'Mexican Rice is just like they serve in the Mexican restaurants and it is so easy to make at home. I love serving it with every Mexican dish I fix.',
		productTags: ['food', 'lunch'],
		productKey: 25
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/76/50/a3/7650a3bec472bd3a871189617c6beef4.jpg',
		productName: 'BBQ Chicken Kebabs',
		productPrice: 29,
		productDescription: 'This really is the best BBQ Chicken Kebabs recipe! There are a few easy extra steps that really add a depth of flavor that you can\'t get from just BBQ sauce. One word...BACON.',
		productTags: ['food', 'lunch'],
		productKey: 26
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/f3/3b/57/f33b57f5e969c40a1ea0ffecae07306c.jpg',
		productName: 'Bakes Churros',
		productPrice: 16,
		productDescription: 'We skipped the deep fryer and made baked churros instead! They’re great for parties or as a taco night dessert.',
		productTags: ['food', 'snacks'],
		productKey: 27
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/c9/6d/0d/c96d0dc1a700b6eff9195c8a3e87a5a5.jpg',
		productName: 'Butter Beer',
		productPrice: 33,
		productDescription: 'The delicious beverage of witches and wizards. Found in Diagon Alley, Hogsmeade Village and the Wizarding World of Harry Potter at Universal Studios.',
		productTags: ['drinks'],
		productKey: 28
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/e8/73/f2/e873f2579e54551f2d4efab9f631d50c.jpg',
		productName: 'Telescopic Controller Gamepad Joystick',
		productPrice: 88,
		productDescription: 'Ipega PG-9023 Wireless Bluetooth Telescopic Controller Gamepad Joystick for iOS Android Tablet iPad',
		productTags: ['electronics'],
		productKey: 29
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/62/73/4c/62734cfec33a84a506d3e557d55bd663.jpg',
		productName: 'Turquoise Necklace',
		productPrice: 98,
		productDescription: '',
		productTags: ['jewelry', 'necklaces', 'gifts'],
		productKey: 30
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/c5/cf/f4/c5cff48e587fa8453760e997613eb1da.jpg',
		productName: 'Gold Plated Necklace',
		productPrice: 139,
		productDescription: 'Gold Plated Punk Necklaces Geometric Triangle Faux Marble Stone Necklace Vintage Jewelry',
		productTags: ['jewelry', 'necklaces'],
		productKey: 31
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/c6/d1/cb/c6d1cbdd998873cd4d52b7ac985664d0.jpg',
		productName: 'Mermaid Opal Ring',
		productPrice: 229,
		productDescription: '',
		productTags: ['jewelry', 'rings', 'gifts'],
		productKey: 32
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/55/c7/0c/55c70cf8f5e4502f227631e1d200245c.jpg',
		productName: 'Cascades Mountain Ring',
		productPrice: 79,
		productDescription: '',
		productTags: ['jewelry', 'rings'],
		productKey: 33
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/49/cc/7e/49cc7e47b1581b3c14d33c4c3ca6b4e4.jpg',
		productName: 'Mermaid Engagement Ring',
		productPrice: 499,
		productDescription: 'Cushion Cut Garnet Rhodium Plated Sterling Silver Mermaid Engagement Ring',
		productTags: ['jewlery', 'rings'],
		productKey: 34
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/95/d7/45/95d74527544e760fe1d1191e1d9ce169.jpg',
		productName: 'Gold Heart Necklace',
		productPrice: 249,
		productDescription: 'Small Sideways Gold Heart Necklace in 14K Gold Fill. This Heart Shape can be left blank' +
		' or with one custom uppercase or lowercase initial!',
		productTags: ['jewelry', 'necklaces'],
		productKey: 35
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/84/54/1c/84541c529aa88021941cd477623c0718.jpg',
		productName: 'Gold Streak Trinity Ring',
		productPrice: 599,
		productDescription: 'Made of intertwined 3 textured solid 14k gold rings with 0.75mm thickness',
		productTags: ['jewlery', 'rings'],
		productKey: 36
	},
	{
		productImageAddress: 'https://i.pinimg.com/originals/75/54/48/755448e71180765482a4d17d7bdec2ab.jpg',
		productName: 'Burgundy Off the shoulder All The Rage Skater Dress',
		productPrice: 89,
		productDescription: 'Off the shoulder dresses are all the rage this season! Show off your amazing fashion sense with this dress that features an elastic off the shoulder neckline, a short sleeve, a slim fitting bodice and a super cute skater skirt with a hi low hem.',
		productTags: ['fashion', 'dresses'],
		productKey: 37
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/59/6b/6b/596b6b48bf155a3fa3a9e6987ef68a9a.jpg',
		productName: 'Chiffon Party Dress',
		productPrice: 33,
		productDescription: 'Sexy Perspective Irregular Mesh Stitching Chiffon Party Dress',
		productTags: ['fashion', 'dresses'],
		productKey: 38
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/ba/f1/ed/baf1ed0d0fb908a2b4c7c639a6a863d5.jpg',
		productName: 'Lace Wedding Dress',
		productPrice: 1299,
		productDescription: 'Essense of Australia brings us pretty wedding dresses designed to give the romantic bride a look that combines that WOW factor with timeless sophistication.',
		productTags: ['fashion', 'dresses'],
		productKey: 39
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/c2/34/45/c23445be6a50950b4470872ec4050423.jpg',
		productName: 'Prom Dress',
		productPrice: 233,
		productDescription: 'Xenia Boutique Splended Angel 2.0 Dress Homecoming Prom dresse',
		productTags: ['fashion', 'dresses'],
		productKey: 40
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/77/8e/53/778e5381f533262a68636a5708b23396.jpg',
		productName: '2018 XPS 15',
		productPrice: 1399,
		productDescription: 'Dell\'s revised XPS 15 includes gorgeous Infinity display, Windows 10',
		productTags: ['electronics', 'laptops'],
		productKey: 41
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/0a/b2/31/0ab2311d19b40777bd1e72f645d4f3b9.jpg',
		productName: 'HP Laptop',
		productPrice: 899,
		productDescription: 'HP brand new laptop is the best gaming machine on the market',
		productTags: ['electronics', 'laptops'],
		productKey: 42
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/10/e2/24/10e224b516dba43c272161036a54c93b.jpg',
		productName: 'Macbook Air',
		productPrice: 1699,
		productDescription: 'Gold blau Marmor Case Macbook Air',
		productTags: ['electronics', 'laptops'],
		productKey: 43
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/4d/e5/28/4de528e6d32070a82484664198906cf7.jpg',
		productName: 'Dell Inspiron 15 7559',
		productPrice: 999,
		productDescription: 'The best gaming laptop under $1000',
		productTags: ['electronics', 'laptops'],
		productKey: 44
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/3d/01/88/3d018824796f77a9a5d27158c439f064.jpg',
		productName: 'Nikon F3',
		productPrice: 495,
		productDescription: 'A beast of a camera. In production from 1980 to 2001',
		productTags: ['electronics', 'cameras'],
		productKey: 45
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/da/fa/b2/dafab29613ef9e8852de7e8be3a33784.jpg',
		productName: 'Canon AE-1',
		productPrice: 249,
		productDescription: '',
		productTags: ['electronics', 'cameras'],
		productKey: 46
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/f4/81/d3/f481d35734a60877b55d7e043c67b968.jpg',
		productName: 'Canary Flex Security Camera',
		productPrice: 99,
		productDescription: ' Monitor your home with this Canary security system. The 1080p HD camera streams live video to a smartphone through the Canary app',
		productTags: ['electronics', 'cameras'],
		productKey: 47
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/30/94/46/30944696deecb6954eab7b4bbc016219.jpg',
		productName: 'Rolleiflex 2.8D',
		productPrice: 699,
		productDescription: '',
		productTags: ['electronics', 'cameras'],
		productKey: 48
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/07/2e/d4/072ed4ab6359b357a32ae13fcf68079e.jpg',
		productName: 'Samsung Galaxy Tab A',
		productPrice: 199,
		productDescription: 'Tablet Samsung Galaxy Tab A 16GB 8" 4G Wi-Fi - Android 5.0 Proc. Quad Core Câmera Integrada',
		productTags: ['electronics', 'tablets'],
		productKey: 49
	},
	{
		productImageAddress: 'https://i.pinimg.com/564x/3f/10/33/3f103343ec2565b761c731ef936f88fd.jpg',
		productName: 'Ipad Air 2',
		productPrice: 230,
		productDescription: 'IPad Air 2 16GB WiFi',
		productTags: ['electronics', 'tablets'],
		productKey: 50
	},
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
			'$200 to $500': false,
			'$500 & above': false
		};
		this.state = {
			Favorites: [],
			DisplayedProductList: [],
			MeetsPriceFilters: {},
			MeetsTagFilters: []
		};

		this.removeProduct = this.removeProduct.bind(this);
		this.editProduct = this.editProduct.bind(this);
		this.findNumPoductsMatchPriceFilter = this.findNumPoductsMatchPriceFilter.bind(this);
		this.findNumPoductsMatchTagFilter = this.findNumPoductsMatchTagFilter.bind(this);
		this.updatePriceFilter = this.updatePriceFilter.bind(this);
		this.updateTagFilter = this.updateTagFilter.bind(this);
		this.updateSearchParameter = this.updateSearchParameter.bind(this);
		this.addNewContent = this.addNewContent.bind(this);
		this.submitNewProductInfo = this.submitNewProductInfo.bind(this);
		this.addToFavorites = this.addToFavorites.bind(this);
		this.removeFromFavorites = this.removeFromFavorites.bind(this);
	}

	componentWillMount() {
		this.findNumPoductsMatchPriceFilter(initialData);
		this.findNumPoductsMatchTagFilter(initialData);
		this.baseproductList = initialData;
		this.setState({DisplayedProductList: initialData});
	}

	addToFavorites(productKey) {
		for (let product of this.baseproductList) {
			if (product.productKey === productKey) {
				this.setState(prevState => ({
					Favorites: [...prevState.Favorites, product ]
				}));
			}
		}
	}


	removeFromFavorites(productKey) {
		this.setState(prevState => ({
			Favorites: prevState.Favorites.filter(product => product.productKey !== productKey)
		}));
	}


	removeProduct(productToRemove) {
		this.baseproductList = this.baseproductList.filter(product => {
			if (product.productKey !== productToRemove) {
				return true;
			} else {
				return false;
			}
		});

		this.removeFromFavorites(productToRemove);

		this.basetags = [];
		this.setState({DisplayedProductList: this.filterProductsByTag(this.filterProductsByPrice(this.filterProductsBySearch()))});
		this.findNumPoductsMatchPriceFilter(this.FilteredProductList);
		this.findNumPoductsMatchTagFilter(this.FilteredProductList);
	}

	editProduct(productToRemove) {
		this.baseproductList = this.baseproductList.filter(product => {
			if (product.productKey !== productToRemove) {
				return true;
			} else {
				return false;
			}
		});
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
		this.findNumPoductsMatchTagFilter(this.FilteredProductList);
		if(this.FilteredProductList.length === this.baseproductList.length) {
			this.findNumPoductsMatchPriceFilter(this.FilteredProductList);
		}
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
			if (!filterAdded) {
				this.TagFilterParameters.push([filter, true]);
			}
		}

		this.setState({DisplayedProductList: this.filterProductsByTag(this.filterProductsByPrice(this.filterProductsBySearch()))});
		this.findNumPoductsMatchPriceFilter(this.FilteredProductList);
		if(this.FilteredProductList.length === this.baseproductList.length) {
			this.findNumPoductsMatchTagFilter(this.FilteredProductList);
		}
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
		if (!params['Under $25'] && !params['$25 to $50'] && !params['$50 to $100'] && !params['$100 to $200'] && !params['$200 to $500'] && !params['$500 & above']) {
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
			if (params['$200 to $500'] || alwaysReturnTrue) {
				if (200 < product.productPrice && product.productPrice < 500) {
					return true;
				}
			}
			if (params['$500 & above'] || alwaysReturnTrue) {
				if (500 < product.productPrice) {
					return true;
				}
			}
			return false;
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
			return false;
		});
		this.FilteredProductList = FilteredProductList;
		return FilteredProductList;
	}


	findNumPoductsMatchPriceFilter(FilteredProductList) {
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

	findNumPoductsMatchTagFilter(FilteredProductList) {
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

	addNewContent() {
		this.baseproductList.unshift({
			productImageAddress: '',
			productName: '',
			productPrice: '',
			productDescription: '',
			productTags: [],
			productKey: Math.random()
		});
		this.setState({DisplayedProductList: this.baseproductList});
	}

	submitNewProductInfo(productKey, newTags, newImgSrc, newName, newPrice, newDescription) {
		this.baseproductList.forEach(product => {
			if (product.productKey === productKey) {
				product.productImageAddress = newImgSrc;
				newTags.length > 0 && newTags[0] !== ""
					? product.productTags = newTags.split(',')
					: product.productTags = [];
				product.productName = newName;
				product.productPrice = newPrice;
				product.productDescription = newDescription;

			}
		});
		this.basetags = [];
		this.setState({DisplayedProductList: this.filterProductsByTag(this.filterProductsByPrice(this.filterProductsBySearch()))});
		this.findNumPoductsMatchPriceFilter(this.FilteredProductList);
		this.findNumPoductsMatchTagFilter(this.FilteredProductList);
	}


	render() {
		return (
			<div>
				<Header filterProducts={this.updateSearchParameter}
						addNewContent={this.addNewContent}
						favoritesQuantity={this.state.Favorites.length}
						removeFromFavorites={this.removeFromFavorites}
						favorites={this.state.Favorites}/>

				<main className="homepage">
					<Sidebar updatePriceFilter={this.updatePriceFilter}
							 updateTagFilter={this.updateTagFilter}
							 MeetsPriceFilters={this.state.MeetsPriceFilters}
							 MeetsTagFilters={this.basetags}
					/>
					<ProductsContainer products={this.state.DisplayedProductList}
									   favorites={this.state.Favorites}
									   searchString={this.searchFilterParameter}
									   removeProduct={this.removeProduct}
									   editProduct={this.editProduct}
									   submitNewProductInfo={this.submitNewProductInfo}
									   addToFavorites={this.addToFavorites}
									   removeFromFavorites={this.removeFromFavorites}
					/>
				</main>
			</div>
		);
	}
}

export default App;
