/**
 * Created by joey on 2018/8/25
 */
import getClassName from "../getClassName/index";

/**
 * 是否为arguments
 * @param {*} x
 * @returns {boolean}
 */
export default function isArguments(x) {
	return getClassName(x) === "[object Arguments]";
}
