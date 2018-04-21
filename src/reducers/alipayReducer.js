import { GETTING_ALIPAY_IMAGE, OPEN_CLOSE_MODAL } from '../Actions/ActionsTypes';
const INITIAL_DATA = {
	alipayImage: '',
	open: false
};
export default (state = INITIAL_DATA, action) => {
	switch (action.type) {
		case OPEN_CLOSE_MODAL:
			return { ...state, open: action.payload };
		case GETTING_ALIPAY_IMAGE:
			return { ...state, alipayImage: action.payload };
		default:
			return state;
	}
};
