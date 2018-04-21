import axios from 'axios';
import { GETTING_ALIPAY_IMAGE, OPEN_CLOSE_MODAL } from './ActionsTypes';
const md5 = require('md5');
const parseString = require('xml2js').parseString;

export const getAlipayImage = (currency, money) => async dispatch => {
	const md5Url = `_input_charset=UTF-8&body=body&currency=${currency}&extend_params={"secondary_merchant_id":"yihan-mid-011700","secondary_merchant_name":"haha","secondary_merchant_industry":"1000","STORE_ID":"yihan-sid-0117005","store_name":"fafds"}&notify_url=http://www.alipay.com&out_trade_no=4646338851336478&partner=2088021966388155&product_code=OVERSEAS_MBARCODE_PAY&seller_id=2088021966388155&sendFormat=normal&service=alipay.acquire.precreate&subject=212subject&total_fee=${money}&trans_currency=${currency}9zuyogtrxxi3iux2hz4lbwpiiy0uc0ha`;

	const sign = md5(md5Url);

	const url = `https://mapi.alipay.com/cooperate/gateway.do?body=body&subject=212subject&sign_type=MD5&out_trade_no=4646338851336478&currency=${currency}&trans_currency=${currency}&total_fee=${money}&partner=2088021966388155&notify_url=http%3A%2F%2Fwww.alipay.com&sendFormat=normal&sign=${sign}&_input_charset=UTF-8&product_code=OVERSEAS_MBARCODE_PAY&service=alipay.acquire.precreate&seller_id=2088021966388155&extend_params=%7B%22secondary_merchant_id%22%3A%22yihan-mid-011700%22%2C%22secondary_merchant_name%22%3A%22haha%22%2C%22secondary_merchant_industry%22%3A%221000%22%2C%22STORE_ID%22%3A%22yihan-sid-0117005%22%2C%22store_name%22%3A%22fafds%22%7D`;

	const options = {
		method: 'GET',
		url
	};

	const res = await axios(options);

	parseString(res.data, (err, result) => {
		dispatch({
			type: GETTING_ALIPAY_IMAGE,
			payload: result.alipay.response[0].alipay[0].pic_url[0]
		});
	});
};

export const openCloseModal = action => {
	return {
		type: OPEN_CLOSE_MODAL,
		payload: action
	};
};
