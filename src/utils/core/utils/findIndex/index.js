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
export default function findIndex(x, predicate, fromIndex) {
	if (isArrayLike(x) && isFunction(predicate) && x.length > 0) {
		var len = x.length;
		var kValue;
		fromIndex = toInteger(fromIndex);
		fromIndex = fromIndex < 0 ? Math.max(0, fromIndex + len) : fromIndex >= len ? 0 : fromIndex;
		while (fromIndex < len) {
			if (predicate(kValue = x[fromIndex], fromIndex, x)) {
				return fromIndex;
			}
			++fromIndex;
		}
	}
	return -1;
}
