/**
 * Created by joey on 2018/8/25
 */

/**
 * parseInt重新封装
 * @private
 * @returns {number}
 */
export default function _parseInt() {
	try {
		/* eslint-disable radix */
		return parseInt([].slice.call(arguments));
	} catch (e) {
		return NaN;
	}
}
