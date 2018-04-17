import { combineReducers } from 'redux';

import modal from './modal';
import favorites from './favorites';

const rootReducer = combineReducers({ modal, favorites });

export default rootReducer;


