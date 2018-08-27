/**
 * Created by joey on 2018/8/25
 */

/**
 * 是否为date
 * @param {*} x
 * @returns {boolean}
 */
export default function isDate (x) {
	return Object.prototype.toString.call(x) === '[object Date]';
}
