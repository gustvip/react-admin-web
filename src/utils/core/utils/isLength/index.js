/**
 * Created by joey on 2018/6/20
 */
import isNumber from "../isNumber";
import {MAX_ARRAY_INDEX} from "../aaa/_constant/index";

/**
 * 是否为符合条件的数组索引
 * @param {*} x
 * @returns {boolean}
 */
export default function isLength(x) {
	return isNumber(x) && x > -1 && Math.floor(x) === x && x <= MAX_ARRAY_INDEX;
}
