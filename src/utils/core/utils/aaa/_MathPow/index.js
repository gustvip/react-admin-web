/**
 * Created by joey on 2018/8/25
 */

/**
 * Math.pow重新封装
 * @private
 * @param {*} base
 * @param {*} exponent
 * @returns {number}
 */
export default function _MathPow(base, exponent) {
	try {
		return Math.pow(base, exponent);
	} catch (e) {
		return NaN;
	}
}
