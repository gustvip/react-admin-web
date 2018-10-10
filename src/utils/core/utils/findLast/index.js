/**
 * Created by joey on 2018/6/20
 */
import isArrayLike from "../isArrayLike";
import isFunction from "../isFunction";
import toInteger from "../toInteger";

/**
 * 查找符合条件的值
 * @param {*} x
 * @param {function} predicate
 * @param {number} [fromIndex]
 * @returns {*}
 */
export default function findLast(x, predicate, fromIndex) {
	if (isArrayLike(x) && isFunction(predicate) && x.length > 0) {
		var len = x.length;
		fromIndex = toInteger(fromIndex);
		fromIndex = fromIndex >= len ? Math.min(fromIndex - len, len - 1) : fromIndex < 0 ? len - 1 : fromIndex;
		var k = fromIndex;
		while (k) {
			if (predicate(x[k], k, x)) {
				return x[k];
			}
			--k;
		}
	}
}
