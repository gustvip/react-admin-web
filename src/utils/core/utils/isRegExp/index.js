/**
 * Created by joey on 2018/8/25
 */

/**
 * 是否为正则
 * @param {*} x
 * @returns {boolean}
 */
export default function isRegExp(x) {
	return Object.prototype.toString.call(x) === "[object RegExp]";
}
