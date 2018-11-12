/**
 * Created by joey on 2018/6/20
 */
import isObject from '../isObject/index';
import isFunction from '../isFunction/index';
import isArrayLike from '../isArrayLike/index';
import _objectForEach from '../aaa/_objectForEach/index';
import _arrayLikeForEach from '../aaa/_arrayLikeForEach/index';
import { arrayLikeCallbackType } from '../@types';

export default function forEach(object?: any, callback?: arrayLikeCallbackType | any): void {
	if (isFunction(callback)) {
		if (isArrayLike(object)) {
			_arrayLikeForEach(object, callback);
		} else if (isObject(object)) {
			_objectForEach(object, callback);
		}
	}
}
