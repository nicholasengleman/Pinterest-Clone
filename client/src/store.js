import { createStore } from 'redux';
import rootReducer from './reducers/rootReducers';

const defaultState = {
	showModal: false,
	favorites: []
};


const store = createStore(rootReducer, defaultState);

export default store;






