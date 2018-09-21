/**
 * Created by joey on 2018/8/25
 */
import getClassName from "../getClassName/index";

/**
 * 是否为Set
 * @param {*} x
 * @returns {boolean}
 */
export default function isSet(x) {
	return getClassName(x) === "[object Set]";
}
