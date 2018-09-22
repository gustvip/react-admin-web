/**
 * Created by joey on 2018/8/25
 */

/**
 * Number重新封装
 * @private
 * @param {*} x
 * @returns {number}
 */
export default function _Number(x) {
	try {
		return Number(x);
	} catch (e) {
		return NaN;
	}
}
