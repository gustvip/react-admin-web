/**
 * Created by joey on 2018/8/25
 */

/**
 * Math.min重新封装
 * @private
 * @returns {number}
 */
export default function _MathMin() {
	try {
		return Math.min.apply(null, arguments);
	} catch (e) {
		return NaN;
	}
}
