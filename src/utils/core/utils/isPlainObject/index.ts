/**
 * Created by joey on 2018/6/20
 */
import isObjectLike from "../isObjectLike/index";
import isNull from "../isNull/index";

export default function isPlainObject(x?: any): boolean {
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
