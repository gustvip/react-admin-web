/**
 * Created by joey on 2018/8/25
 */

/**
 * parseInt重新封装
 * @private
 * @param {*} num
 * @param {number} radix
 * @returns {number}
 */
export default function _parseInt(num, radix) {
	try {
		return parseInt(num, radix);
	} catch (e) {
		return NaN;
	}
}
