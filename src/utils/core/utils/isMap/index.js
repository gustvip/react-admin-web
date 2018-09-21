/**
 * Created by joey on 2018/8/25
 */
import getClassName from "../getClassName/index";

/**
 * 是否为Map
 * @param {*} x
 * @returns {boolean}
 */
export default function isMap(x) {
	return getClassName(x) === "[object Map]";
}
