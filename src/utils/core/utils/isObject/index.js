/**
 * Created by joey on 2018/6/20
 */
import getClassName from "../getClassName/index";

/**
 * 是否为对象 {}
 * @param {*} x
 * @returns {boolean}
 */
export default function isObject(x) {
	return getClassName(x) === "[object Object]";
}
