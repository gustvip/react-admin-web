/**
 * Created by joey on 2018/8/25
 */
import getClassName from "../getClassName/index";

/**
 * 是否为WeakMap
 * @param {*} x
 * @returns {boolean}
 */
export default function isWeakMap(x) {
	return getClassName(x) === "[object WeakMap]";
}
