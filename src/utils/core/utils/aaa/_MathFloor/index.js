/**
 * Created by joey on 2018/8/25
 */

/**
 * Math.floor重新封装
 * @private
 * @param {*} x
 * @returns {number}
 */
export default function _MathFloor(x) {
	try {
		return Math.floor(x);
	} catch (e) {
		return NaN;
	}
}
