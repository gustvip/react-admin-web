/**
 * Created by joey on 2018/8/25
 */
import isArray from "../../isArray";

/**
 * Math.min重新封装
 * @private
 * @param {*} num
 * @returns {number}
 */
export default function _MathMin(num) {
	try {
		return Math.min.apply(null, isArray(num) ? num : [].slice.call(arguments));
	} catch (e) {
		return NaN;
	}
}
