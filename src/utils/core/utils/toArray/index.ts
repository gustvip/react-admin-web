/**
 * Created by joey on 2018/8/28
 */
import isArrayLike from '../isArrayLike/index';
import isMap from '../isMap/index';
import isSet from '../isSet/index';
import _baseSlice from '../aaa/_baseSlice/index';
import _mapAndSetToArray from '../aaa/_mapAndSetToArray/index';

export default function toArray(x: any): any[] {
	if (isArrayLike(x)) {
		return _baseSlice(x);
	} else if (isMap(x) || isSet(x)) {
		return _mapAndSetToArray(x);
	}
	return [];
}
