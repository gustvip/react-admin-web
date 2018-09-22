/**
 * Created by joey on 2018/8/25
 */

/**
 * Math.cos重新封装
 * @private
 * @param {*} x
 * @returns {number}
 */
export default function _MathCos(x) {
	try {
		return Math.cos(x);
	} catch (e) {
		return NaN;
	}
}
