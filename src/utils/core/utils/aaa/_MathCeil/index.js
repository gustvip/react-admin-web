/**
 * Created by joey on 2018/8/25
 */

/**
 * Math.ceil重新封装
 * @private
 * @param {*} x
 * @returns {number}
 */
export default function _MathCeil(x) {
	try {
		return Math.ceil(x);
	} catch (e) {
		return NaN;
	}
}
