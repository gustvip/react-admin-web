/**
 * Created by joey on 2018/6/20
 */
import isFunction from '../utils/isFunction';

/**
 * 查找符合条件的索引
 * @param {string || Array} x
 * @param {function} predicate
 * @returns {number}
 */
export default function findIndex (x, predicate) {
	if (!isFunction(predicate)) {
		throw new TypeError('callback must be function');
	}
	var len = x.length,
		k = -1,
		kValue;
	while (++k < len) {
		kValue = x[k];
		if (predicate(kValue, k, x) === true) return k;
	}
	return -1;
};
