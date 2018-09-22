/**
 * Created by joey on 2018/8/25
 */

/**
 * Math.exp重新封装
 * @private
 * @param {*} x
 * @returns {number}
 */
export default function _MathExp(x) {
	try {
		return Math.exp(x);
	} catch (e) {
		return NaN;
	}
}
