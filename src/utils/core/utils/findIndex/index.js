/**
 * Created by joey on 2018/6/20
 */

/**
 * 查找符合条件的索引
 * @param {string || Array} x
 * @param {function} predicate
 * @returns {number}
 */
export default function findIndex(x, predicate) {
	const len = x.length;


	let k = -1;


	let kValue;
	while (++k < len) {
		if (predicate(kValue = x[k], k, x) === true) {
			return k;
		}
	}
	return -1;
}
