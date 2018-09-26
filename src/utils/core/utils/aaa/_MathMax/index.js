/**
 * Created by joey on 2018/8/25
 */
import isArray from "../../isArray";

/**
 * Math.max重新封装
 * @private
 * @param {*} num
 * @returns {number}
 */
export default function _MathMax(num) {
	try {
		return Math.max.apply(null, isArray(num) ? num : [].slice.call(arguments));
	} catch (e) {
		return NaN;
	}
}
