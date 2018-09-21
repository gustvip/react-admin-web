/**
 * Created by joey on 2018/8/25
 */
import getClassName from "../getClassName/index";

/**
 * 是否为Symbol
 * @param {*} x
 * @returns {boolean}
 */
export default function isSymbol(x) {
	return getClassName(x) === "[object Symbol]";
}
