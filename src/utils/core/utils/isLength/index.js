/**
 * Created by joey on 2018/6/20
 */
import isNumber from "../isNumber";

/**
 * 是否为符合条件的数组索引
 * @param {*} x
 * @returns {boolean}
 */
export default function isLength(x) {
	return isNumber(x) && x > -1 && Math.floor(x) === x && x <= 4294967295;
}
