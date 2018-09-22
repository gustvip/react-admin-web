/**
 * Created by joey on 2018/8/25
 */

/**
 * Math.asin重新封装
 * @private
 * @param {*} x
 * @returns {number}
 */
export default function _MathAsin(x) {
	try {
		return Math.asin(x);
	} catch (e) {
		return NaN;
	}
}
