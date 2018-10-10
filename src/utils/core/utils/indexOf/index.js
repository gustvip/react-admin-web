/**
 * Created by joey on 2018/6/20
 */
import findIndex from "../findIndex";
import isNaN from "../isNaN";

/**
 * 查找符合条件的索引
 * @param {*} x
 * @param {*} value
 * @param {number} [fromIndex]
 * @returns {number}
 */
export default function indexOf(x, value, fromIndex) {
	return findIndex(x, function(val) {
		return val === value || (isNaN(val) && isNaN(value));
	}, fromIndex);
}
