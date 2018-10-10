/**
 * Created by joey on 2018/6/20
 */
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
export default function findLastIndex(x, predicate, fromIndex) {
	if (isArrayLike(x) && isFunction(predicate) && x.length > 0) {
		var len = x.length;
		var kValue;
		fromIndex = toInteger(fromIndex);
		fromIndex = fromIndex >= len ? Math.min(fromIndex - len, len - 1) : fromIndex < 0 ? len - 1 : fromIndex;
		var k = fromIndex;
		while (k) {
			if (predicate(kValue = x[k], k, x)) {
				return k;
			}
			--k;
		}
	}
	return -1;
}
