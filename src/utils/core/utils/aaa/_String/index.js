/**
 * Created by joey on 2018/8/25
 */

/**
 * String重新封装
 * @private
 * @param {*} x
 * @returns {string}
 */
export default function _String(x) {
	try {
		return String(x);
	} catch (e) {
		return "";
	}
}
