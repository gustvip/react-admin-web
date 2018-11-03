/**
 * Created by joey on 2018/6/20
 */
import isObject from '../isObject/index';
import isArrayLike from '../isArrayLike/index';
import _arrayLikeForEach from '../aaa/_arrayLikeForEach/index';
import _objectForEach from '../aaa/_objectForEach/index';

export default function transform(data: any, callback: (initValue?: any, value?: any, index?: number | string, arr?: any) => any | any, initValue?: any): any {
	if (typeof callback === 'function') {
		if (isArrayLike(data)) {
			_arrayLikeForEach(data, function(value, index, arr) {
				callback(initValue, value, index, arr);
			});
		} else if (isObject(data)) {
			_objectForEach(data, function(value, index, arr) {
				callback(initValue, value, index, arr);
			});
		}
	}
	return initValue;
}
