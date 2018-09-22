/**
 * Created by joey on 2018/8/25
 */

/**
 * Math.round重新封装
 * @private
 * @param {*} x
 * @returns {number}
 */
export default function _MathRound(x) {
	try {
		return Math.round(x);
	} catch (e) {
		return NaN;
	}
}
