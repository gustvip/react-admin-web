/**
 * Created by joey on 2018/6/20
 */
import toInteger from "../../toInteger";
import isUndefined from "../../isUndefined";

/**
 * 截取集合
 * @param {array | string} [data]
 * @param {* | number} [startIndex]
 * @param {* | number} [endIndex]
 * @returns {array}
 */
export default function _baseSlice(data, startIndex, endIndex) {
	var s = [];
	var i = -1;
	var k = data.length;
	
	startIndex = isUndefined(startIndex) ? 0 : toInteger(startIndex);
	startIndex = startIndex < 0 ? Math.max(k + startIndex, 0) : startIndex;
	
	endIndex = isUndefined(endIndex) ? k : toInteger(endIndex);
	endIndex = endIndex < 0 ? Math.max(k + endIndex, 0) : Math.min(endIndex, k);
	
	if (0 <= startIndex && startIndex < endIndex) {
		while (endIndex - startIndex > 0) {
			s[++i] = data[startIndex];
			++startIndex;
		}
	}
	return s;
}
