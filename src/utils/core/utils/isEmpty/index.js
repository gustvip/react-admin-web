/**
 * Created by joey on 2018/6/20
 */
import isNil from "../isNil";
import isArray from "../isArray";
import isArrayLike from "../isArrayLike";
import isString from "../isString";
import isArguments from "../isArguments";
import {HasOwnProperty} from "../constant";

/**
 * 是否为空
 * @param {*} x
 * @returns {boolean}
 */
export default function isEmpty(x) {
	if (isNil(x)) {
		return true;
	}
	
	if (isArrayLike(x) && (isArray(x) || isString(x) || isArguments(x))) {
		return !x.length;
	}
	
	for (var key in x) {
		if (HasOwnProperty.call(x, key)) {
			return false;
		}
	}
	
	return true;
}
