/**
 * Created by joey on 2018/8/25
 */

/**
 * Math.atan重新封装
 * @private
 * @param {*} x
 * @returns {number}
 */
export default function _MathAtan(x) {
	try {
		return Math.atan(x);
	} catch (e) {
		return NaN;
	}
}
