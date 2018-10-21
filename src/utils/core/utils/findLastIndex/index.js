/**
 * Created by joey on 2018/6/20
 */
import isArray from '../isArray';
import isFunction from '../isFunction';
import toInteger from '../toInteger';
import isUndefined from '../isUndefined';

/**
 * 查找符合条件的索引
 * @param {*} x
 * @param {function} predicate
 * @param {number} [fromIndex]
 * @returns {number}
 */
export default function findLastIndex(x, predicate, fromIndex) {
	if (isArray(x) && isFunction(predicate) && x.length > 0) {
		var len = x.length;
		fromIndex = isUndefined(fromIndex) ? len - 1 : toInteger(fromIndex);
		fromIndex = fromIndex >= len ? Math.min(fromIndex - len, len - 1) : fromIndex < 0 ? len - 1 : fromIndex;
		var k = fromIndex;
		while (k) {
			if (predicate(x[k], k, x)) {
				return k;
			}
			--k;
		}
	}
	return -1;
}
