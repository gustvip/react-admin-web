/**
 * Created by joey on 2018/6/20
 */
import isNil from "../isNil/index";
import isMap from "../isMap/index";
import isSet from "../isSet/index";
import isObject from "../isObject/index";
import isString from "../isString/index";
import isArguments from "../isArguments/index";
import isTypedArray from "../isTypedArray/index";
import isArray from "../isArray/index";

export default function isEmpty(x: any): boolean {
	if (isNil(x)) {
		return true;
	} else if (isArray(x) || isString(x) || isTypedArray(x) || isArguments(x)) {
		return x.length === 0 || x.byteLength === 0;
	} else if (isMap(x) || isSet(x)) {
		return x.size === 0;
	} else if (isObject(x)) {
		for (var key in x) {
			if (Object.prototype.hasOwnProperty.call(x, key)) {
				return false;
			}
		}
	}
	return true;
}
