/**
 * Created by joey on 2018/10/15
 */
import isArray from '../isArray';

/**
 * @param {*} value
 * @returns {array}
 */
export default function castArray(value) {
	if (!arguments.length) {
		return [];
	}
	return isArray(value) ? value : [value];
}
