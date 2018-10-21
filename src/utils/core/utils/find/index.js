/**
 * Created by joey on 2018/6/20
 */
import isArray from '../isArray';
import isFunction from '../isFunction';
import toInteger from '../toInteger';
import isUndefined from '../isUndefined';

/**
 * 查找符合条件的值
 * @param {*} x
 * @param {function} predicate
 * @param {number} [fromIndex]
 * @returns {*}
 */
export default function find(x, predicate, fromIndex) {
	if (isArray(x) && isFunction(predicate) && x.length > 0) {
		var len = x.length;
		var kValue;
		fromIndex = isUndefined(fromIndex) ? 0 : toInteger(fromIndex);
		fromIndex = fromIndex < 0 ? Math.max(0, fromIndex + len) : fromIndex >= len ? 0 : fromIndex;
		while (fromIndex < len) {
			if (predicate(kValue = x[fromIndex], fromIndex, x)) {
				return x[fromIndex];
			}
			++fromIndex;
		}
	}
}
