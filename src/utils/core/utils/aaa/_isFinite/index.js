/**
 * Created by joey on 2018/8/25
 */

/**
 * isFinite重新封装
 * @private
 * @param {*} x
 * @returns {boolean}
 */
export default function _isFinite(x) {
	try {
		return isFinite(x);
	} catch (e) {
		return false;
	}
}
