import React from 'react';
import PropTypes from 'prop-types';
import './FavoriteItem.css';

class FavoriteItem extends React.Component {
	constructor(props) {
		super(props);

		this.removeFromFavorites = this.removeFromFavorites.bind(this);
	}

	static propTypes = {
		key: PropTypes.number,
		favoriteImg: PropTypes.string,
		favoriteName: PropTypes.string,
		favoriteDescription: PropTypes.string,
		favoritePrice: PropTypes.string,
		favoriteProductKey: PropTypes.number,
		removeFromFavorites: PropTypes.func
	};

	removeFromFavorites() {
		this.props.removeFromFavorites(this.props.favoriteProductKey);
	}

	render() {
		return (
			<div className='favoritesSummary__Container'>
				<div className='favoriteSummary__pic'><img src={this.props.favoriteImg} alt=""/></div>
				<div className='favoriteSummaryRow'>
					<div className='favoriteSummary__name'>{this.props.favoriteName}</div>
					<div className='favoriteSummary__description'>
						{this.props.favoriteDescription.length > 0
							? this.props.favoriteDescription
							: 'this product has no desciption'
						}</div>
					<div className='favoriteSummary__price'>${this.props.favoritePrice}</div>
				</div>
				<div className='favoriteSummary__remove'>
					<button onClick={this.removeFromFavorites}>remove</button>
				</div>
			</div>
		)
	}
}

export default FavoriteItem;