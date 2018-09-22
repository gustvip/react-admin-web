/**
 * Created by joey on 2018/8/25
 */

/**
 * Math.acos重新封装
 * @private
 * @param {*} x
 * @returns {number}
 */
export default function _MathAcos(x) {
	try {
		return Math.acos(x);
	} catch (e) {
		return NaN;
	}
}
