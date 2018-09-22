/**
 * Created by joey on 2018/8/28
 */
import _MathFloor from "../aaa/_MathFloor";
import toFinite from "../toFinite";

/**
 * 转化为整数
 * @param {*} x
 * @returns {number}
 */
export default function toInteger(x) {
	return _MathFloor(toFinite(x));
}
