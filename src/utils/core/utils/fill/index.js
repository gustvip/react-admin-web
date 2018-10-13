/**
 * Created by joey on 2018/6/20
 */
import toInteger from "../toInteger";
import isUndefined from "../isUndefined";
import isArray from "../isArray";

/**
 * 填充元素
 * @param {array | *} [data]
 * @param {*} [value]
 * @param {* | number} [startIndex]
 * @param {* | number} [endIndex]
 * @returns {*}
 */
export default function fill(data, value, startIndex, endIndex) {
	if (isArray(data) && data.length > 0) {
		var k = data.length;
		startIndex = isUndefined(startIndex) ? 0 : toInteger(startIndex);
		startIndex = startIndex < 0 ? Math.max(k + startIndex, 0) : startIndex;
		
		endIndex = isUndefined(endIndex) ? k : toInteger(endIndex);
		endIndex = endIndex < 0 ? Math.max(k + endIndex, 0) : Math.min(endIndex, k);
		if (0 <= startIndex && startIndex < endIndex) {
			while (endIndex - startIndex > 0) {
				data[startIndex] = value;
				++startIndex;
			}
		}
	}
	return data;
}
