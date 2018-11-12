/**
 * Created by joey on 2018/6/20
 */
import toInteger from '../toInteger/index';
import isUndefined from '../isUndefined/index';
import isArray from '../isArray/index';

export default function fill(data?: any, value?: any, startIndex?: any, endIndex?: any): any {
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
