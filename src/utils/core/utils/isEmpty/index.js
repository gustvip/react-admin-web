/**
 * Created by joey on 2018/6/20
 */
import isNil from '../isNil';
import isArray from '../isArray';
import isArrayLike from '../isArrayLike';
import isString from '../isString';
import isArguments from '../isArguments';
import isMap from '../isMap';
import isSet from '../isSet';

/**
 * 是否为空
 * @param {*} x
 * @returns {boolean}
 */
export default function isEmpty (x) {
	if (isNil(x)) {
		return true;
	}
	
	if (isArrayLike(x) && (isArray(x) || isString(x) || isArguments(x))) {
		return !x.length;
	}
	
	if (isMap(x) || isSet(x)) {
		return !x.size;
	}
	
	for (var key in x) {
		if (Object.prototype.hasOwnProperty.call(x, key)) {
			return false;
		}
	}
	
	return true;
};
