/**
 * Created by joey on 2018/6/20
 */
import toInteger from '../../toInteger/index';
import isUndefined from '../../isUndefined/index';
import { arrayLikeType } from '../../@types';

export default function _baseSlice(data: arrayLikeType, startIndex?: number, endIndex?: number): any[] {
	var s: any[] = [];
	var k = data.length;
	
	startIndex = isUndefined(startIndex) ? 0 : toInteger(startIndex);
	startIndex = startIndex < 0 ? Math.max(k + startIndex, 0) : startIndex;
	
	endIndex = isUndefined(endIndex) ? k : toInteger(endIndex);
	endIndex = endIndex < 0 ? Math.max(k + endIndex, 0) : Math.min(endIndex, k);
	
	while (endIndex > startIndex) {
		s.push(data[startIndex]);
		++startIndex;
	}
	return s;
}
