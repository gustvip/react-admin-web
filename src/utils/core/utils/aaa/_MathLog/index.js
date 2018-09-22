/**
 * Created by joey on 2018/8/25
 */

/**
 * Math.log重新封装
 * @private
 * @param {*} x
 * @returns {number}
 */
export default function _MathLog(x) {
	try {
		return Math.log(x);
	} catch (e) {
		return NaN;
	}
}
