/**
 * Created by joey on 2018/8/25
 */

/**
 * 是否为arguments
 * @param {*} x
 * @returns {boolean}
 */
export default function isArguments(x) {
	return Object.prototype.toString.call(x) === '[object Arguments]';
}
