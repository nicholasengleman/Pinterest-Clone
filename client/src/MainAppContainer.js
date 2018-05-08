import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/actionCreators';
import App from './components/App';

function mapStateToProps(state) {
	return {
		showModal: state.showModal,
		favorites: state.favorites
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

const MainAppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default MainAppContainer;