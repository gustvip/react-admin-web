/**
 * Created by joey on 2018/8/25
 */
import isArray from "../isArray";

/**
 * Casts `value` as an array if it's not one.
 * @param {*} value
 * @returns {array}
 */
export default function castArray(value) {
	if (!arguments.length) {
		return [];
	}
	return isArray(value) ? value : [value];
}
