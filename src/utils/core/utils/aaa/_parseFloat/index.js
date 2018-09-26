/**
 * Created by joey on 2018/8/25
 */

/**
 * parseFloat重新封装
 * @private
 * @param {*} num
 * @returns {number}
 */
export default function _parseFloat(num) {
	try {
		return parseFloat(num);
	} catch (e) {
		return NaN;
	}
}
