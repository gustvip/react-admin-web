/**
 * Created by joey on 2018/8/25
 */

/**
 * Math.tan重新封装
 * @private
 * @param {*} x
 * @returns {number}
 */
export default function _MathTan(x) {
	try {
		return Math.tan(x);
	} catch (e) {
		return NaN;
	}
}
