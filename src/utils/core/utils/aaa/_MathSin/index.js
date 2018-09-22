/**
 * Created by joey on 2018/8/25
 */

/**
 * Math.sin重新封装
 * @private
 * @param {*} x
 * @returns {number}
 */
export default function _MathSin(x) {
	try {
		return Math.sin(x);
	} catch (e) {
		return NaN;
	}
}
