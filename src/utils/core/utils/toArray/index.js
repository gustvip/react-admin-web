/**
 * Created by joey on 2018/8/28
 */
import isArrayLike from "../isArrayLike";
import isMap from "../isMap";
import isSet from "../isSet";
import _baseSlice from "../aaa/_baseSlice";
import _mapAndSetToArray from "../aaa/_mapAndSetToArray";

/**
 * 转化为数组
 * @param {*} x
 * @returns {array}
 */
export default function toArray(x) {
	if (isArrayLike(x)) {
		return _baseSlice(x);
	} else if (isMap(x) || isSet(x)) {
		return _mapAndSetToArray(x);
	}
	return [];
}
