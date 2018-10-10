/**
 * Created by joey on 2018/8/25
 */

/**
 * Casts `value` as an array if it's not one.
 * @param {*} value
 * @returns {array}
 */
export default function castArray(value) {
	if (!arguments.length) {
		return [];
	}
	return Array.isArray(value) ? value : [value];
}
