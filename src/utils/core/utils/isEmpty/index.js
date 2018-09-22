/**
 * Created by joey on 2018/6/20
 */
import isNil from "../isNil";
import isMap from "../isMap";
import isSet from "../isSet";
import isObject from "../isObject";
import isArray from "../isArray";
import isString from "../isString";
import isArguments from "../isArguments";
import isTypedArray from "../isTypedArray";
import {_hasOwnProperty} from "../aaa/_constant/index";

/**
 * 是否为空
 * @param {*} x
 * @returns {boolean}
 */
export default function isEmpty(x) {
	if (isNil(x)) {
		return true;
	} else if (isObject(x)) {
		for (var key in x) {
			if (_hasOwnProperty.call(x, key)) {
				return false;
			}
		}
		return true;
	} else if (isArray(x) || isString(x) || isTypedArray(x) || isArguments(x)) {
		return x.length === 0 || x.byteLength === 0;
	} else if (isMap(x) || isSet(x)) {
		return x.size === 0;
	} else {
		return true;
	}
}
