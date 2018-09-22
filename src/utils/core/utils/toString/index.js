/**
 * Created by joey on 2018/8/28
 */
import isNil from "../isNil";

/**
 * 转化为字符串
 * 防止基础类型无法转化问题---Object.create(null)
 * @param {*} x
 * @returns {string}
 */
export default function toString(x) {
	if (isNil(x)) {
		return "";
	}
	try {
		return String(x);
	} catch (e) {
		return "";
	}
}
