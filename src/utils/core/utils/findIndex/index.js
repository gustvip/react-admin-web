/**
 * Created by joey on 2018/6/20
 */
import _MathMax from "../aaa/_MathMax";
import isArrayLike from "../isArrayLike";
import isFunction from "../isFunction";
import toInteger from "../toInteger";

/**
 * 查找符合条件的索引
 * @param {*} x
 * @param {function} predicate
 * @param {number} [fromIndex]
 * @returns {number}
 */
export default function findIndex(x, predicate, fromIndex) {
	if (isArrayLike(x) && isFunction(predicate)) {
		let len = x.length;
		let kValue;
		fromIndex = toInteger(fromIndex);
		fromIndex = fromIndex < 0 ? _MathMax(0, fromIndex + len) : fromIndex >= len ? 0 : fromIndex;
		let k = fromIndex - 1;
		while (++k < len) {
			if (predicate(kValue = x[k], k, x)) {
				return k;
			}
		}
	}
	return -1;
}
