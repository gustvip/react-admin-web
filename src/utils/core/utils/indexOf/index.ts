/**
 * Created by joey on 2018/6/20
 */
import findIndex from '../findIndex/index';
import isNaN from '../isNaN/index';

export default function indexOf(x: any, value: any, fromIndex?: any): number {
	return findIndex(x, function(val) {
		return val === value || (isNaN(val) && isNaN(value));
	}, fromIndex);
}
