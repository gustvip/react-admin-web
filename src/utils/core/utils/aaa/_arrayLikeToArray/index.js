/**
 * Created by joey on 2018/8/25
 */

/**
 * 类数组转化为数组
 * @private
 * @param {*} x
 * @returns {array}
 */
export default function _arrayLikeToArray(x) {
	let len = x.length;
	let result = new Array(len);
	let index = -1;
	while (++index < len) {
		result[index] = x[index];
	}
	return result;
}
