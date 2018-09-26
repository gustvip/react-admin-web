/**
 * Created by joey on 2018/8/25
 */

/**
 * Map或者Set转化为数组
 * @private
 * @param {Map|Set} x
 * @returns {array}
 */
export default function _mapAndSetToArray(x) {
	let len = x.size;
	let result = new Array(len);
	let index = -1;
	x.forEach(function(value) {
		result[++index] = value;
	});
	return result;
}
