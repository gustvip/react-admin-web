/**
 * Created by joey on 2018/6/20
 */
import findLastIndex from '../findLastIndex/index';
import isNaN from '../isNaN/index';

export default function lastIndexOf(x?: any, value?: any, fromIndex?: any): number {
	return findLastIndex(x, function(val) {
		return val === value || (isNaN(val) && isNaN(value));
	}, fromIndex);
}
