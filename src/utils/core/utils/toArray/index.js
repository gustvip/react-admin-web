/**
 * Created by joey on 2018/8/28
 */
import isArrayLike from "../isArrayLike";
import isMap from "../isMap";
import isSet from "../isSet";

/**
 * 转化为数组
 * @param {*} x
 * @returns {array}
 */
export default function toArray(x) {
	var index = -1;
	var result = [];
	var len = 0;
	
	if (isArrayLike(x)) {
		len = x.length;
		result = new Array(len);
		while (++index < len) {
			result[index] = x[index];
		}
		return result;
	}
	
	if (isMap(x) || isSet(x)) {
		len = x.size;
		result = new Array(len);
		x.forEach(function(value) {
			result[++index] = value;
		});
		return result;
	}
	
	return [];
}
