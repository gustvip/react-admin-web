/**
 * Created by joey on 2018/6/20
 */
import findLastIndex from '../findLastIndex';
import isNaN from '../isNaN';

/**
 * 查找符合条件的索引
 * @param {*} x
 * @param {*} value
 * @param {number} [fromIndex]
 * @returns {number}
 */
export default function lastIndexOf(x, value, fromIndex) {
	return findLastIndex(x, function(val) {
		return val === value || (isNaN(val) && isNaN(value));
	}, fromIndex);
}
