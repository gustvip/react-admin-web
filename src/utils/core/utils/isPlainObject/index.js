/**
 * Created by joey on 2018/6/20
 */
import isObjectLike from "../isObjectLike";
import isObject from "../isObject";
import isNull from "../isNull";

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 * @param {*} x
 * @returns {boolean}
 */
export default function isPlainObject(x) {
	if (!isObjectLike(x) || !isObject(x)) {
		return false;
	}

	if (isNull(Object.getPrototypeOf(x))) {
		return true;
	}
	var proto = x;
	while (!isNull(Object.getPrototypeOf(proto))) {
		proto = Object.getPrototypeOf(proto);
	}
	return Object.getPrototypeOf(x) === proto;
}
