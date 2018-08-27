/**
 * Created by joey on 2018/6/20
 */
import isObjectLike from '../isObjectLike';
import isObject from '../isObject';

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 * @param {*} x
 * @returns {boolean}
 */
export default function isPlainObjectisObjectLike (x) {
	if (!isObjectLike(x) || !isObject(x)) {
		return false;
	}
	if (Object.getPrototypeOf(x) === null) {
		return true;
	}
	var proto = x;
	while (Object.getPrototypeOf(proto) !== null) {
		proto = Object.getPrototypeOf(proto);
	}
	return Object.getPrototypeOf(x) === proto;
};
