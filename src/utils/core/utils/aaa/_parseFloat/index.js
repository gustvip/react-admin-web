/**
 * Created by joey on 2018/8/25
 */

/**
 * parseFloat重新封装
 * @private
 * @returns {number}
 */
export default function _parseFloat() {
	try {
		return parseFloat([].slice.call(arguments));
	} catch (e) {
		return NaN;
	}
}
