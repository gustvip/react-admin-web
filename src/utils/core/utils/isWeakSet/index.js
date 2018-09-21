/**
 * Created by joey on 2018/8/25
 */
import getClassName from "../getClassName/index";

/**
 * 是否为WeakSet
 * @param {*} x
 * @returns {boolean}
 */
export default function isWeakSet(x) {
	return getClassName(x) === "[object WeakSet]";
}
