export function toggleModal() {
	return {
		type: 'TOGGLE_MODAL'
	}
}

export function addFavorites(productKey) {
	return {
		type: 'ADD_FAVORITE',
		productKey
	}
}

export function removeFavorites(productKey) {
	return {
		type: 'REMOVE_FAVORITE',
		productKey
	}
}
