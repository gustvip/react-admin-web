/**
 * Created by joey on 2018/6/20
 */
import isNil from "../isNil";
import isFunction from "../isFunction";
import isLength from "../isLength";

/**
 * @param {*} x
 * @returns {boolean}
 */
export default function isArrayLike(x) {
	return !isNil(x) && !isFunction(x) && isLength(x.length);
}
