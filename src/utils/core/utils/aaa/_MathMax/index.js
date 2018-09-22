/**
 * Created by joey on 2018/8/25
 */

/**
 * Math.max重新封装
 * @private
 * @returns {number}
 */
export default function _MathMax() {
	try {
		return Math.max.apply(null, arguments);
	} catch (e) {
		return NaN;
	}
}
