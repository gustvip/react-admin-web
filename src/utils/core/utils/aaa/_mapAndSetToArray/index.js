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
	var len = x.size;
	var result = new Array(len);
	var index = -1;
	x.forEach(function(value) {
		result[++index] = value;
	});
	return result;
}
