/**
 * Created by joey on 2018/6/20
 */
import _MathFloor from "../aaa/_MathFloor";
import isFinite from "../isFinite";

/**
 * 是否为整数
 * @param {*} x
 * @returns {boolean}
 */
export default function isInteger(x) {
	return isFinite(x) && _MathFloor(x) === x;
}
