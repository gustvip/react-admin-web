/**
 * Created by joey on 2018/8/28
 */
import isNumber from '../isNumber';
import isObject from '../isObject';
import isFunction from '../isFunction';
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
	
	if (isArray(x) || isFunction(x)) {
		return Number(x.toString());
	}
	
	if (isObject(x)) {
		var middleValue = x.valueOf();
		if (isNumber(middleValue)) {
			return middleValue;
		} else {
			return Number(x.toString());
		}
	}
	
	return Number(x);
};

