/**
 * Created by joey on 2018/6/20
 */
import findIndex from "../findIndex";
import isNaN from "../isNaN";

/**
 * 是否包含此值
 * @param {*} x
 * @param {*} value
 * @param {number} [fromIndex]
 * @returns {boolean}
 */
export default function includes(x, value, fromIndex) {
	return findIndex(x, function(val) {
		return val === value || (isNaN(val) && isNaN(value));
	}, fromIndex) !== -1;
}
