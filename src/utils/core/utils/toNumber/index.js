/**
 * Created by joey on 2018/8/28
 */
import isNumber from '../isNumber';
import isString from '../isString';
import isObject from '../isObject';
import isFunction from '../isObject';
import isArray from '../isArray';

/**
 * 转化为number
 * @param {*} x
 * @returns {number}
 */
export default function toNumber (x) {
	if (isNumber(x)) {
		return x;
	}
	
	if (isFunction(x) || isObject(x) || isArray(x)) {
		return NaN;
	}
	
	if (isString(x)) {
		x = x.trim();
		if (/^0b[01]+$/i.test(x)) {
			return parseInt(x.slice(2), 2);
		} else if (/^0o[0-7]+$/i.test(x)) {
			return parseInt(x.slice(2), 8);
		} else if (/^0x[0-9|a-f]+$/i.test(x)) {
			return parseInt(x, 16);
		} else {
			return Number(x);
		}
	}
	
	return Number(x);
};
