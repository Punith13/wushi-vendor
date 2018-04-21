import { combineReducers } from 'redux';
import alipayReducer from './alipayReducer';

let rootReducer = combineReducers({
	alipayState: alipayReducer
});

export default rootReducer;
