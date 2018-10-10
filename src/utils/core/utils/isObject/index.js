/**
 * Created by joey on 2018/6/20
 */

/**
 * 是否为对象 {}
 * @param {*} x
 * @returns {boolean}
 */
export default function isObject(x) {
	return (typeof x === "object" || typeof x === "function") && x !== null;
}
