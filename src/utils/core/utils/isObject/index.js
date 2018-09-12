/**
 * Created by joey on 2018/6/20
 */

/**
 * 是否为对象 {}
 * @param {*} x
 * @returns {boolean}
 */
export default function isObject(x) {
	return Object.prototype.toString.call(x) === '[object Object]';
}
