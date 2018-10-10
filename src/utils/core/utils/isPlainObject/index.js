/**
 * Created by joey on 2018/6/20
 */
import isObjectLike from "../isObjectLike";
import isNull from "../isNull";

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 * @param {*} x
 * @returns {boolean}
 */
export default function isPlainObject(x) {
	var _getPrototypeOf = Object.getPrototypeOf;
	if (!isObjectLike(x)) {
		return false;
	}
	
	if (isNull(_getPrototypeOf(x))) {
		return true;
	}
	var proto = x;
	while (!isNull(_getPrototypeOf(proto))) {
		proto = _getPrototypeOf(proto);
	}
	return _getPrototypeOf(x) === proto;
}
