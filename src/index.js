import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from  './store';
import './index.css';

import MainAppContainer from './MainAppContainer';

render(
	<Provider store={store}>
		<MainAppContainer />
	</Provider>,
	document.getElementById('root')
);
