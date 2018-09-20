/**
 * Created by joey on 2018/6/20
 */
import getClassName from "../getClassName/index";

/**
 * 是否为数组
 * @param {*} x
 * @returns {boolean}
 */
export default function isArray(x) {
	return getClassName(x) === "[object Array]";
}
