/**
 * Created by joey on 2018/8/25
 */

/**
 * Math.abs重新封装
 * @private
 * @param {*} x
 * @returns {number}
 */
export default function _MathAbs(x) {
	try {
		return Math.abs(x);
	} catch (e) {
		return NaN;
	}
}
