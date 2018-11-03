/**
 * Created by joey on 2018/6/20
 */
import isObject from '../isObject/index';
import isFunction from '../isFunction/index';
import _objectForEach from '../aaa/_objectForEach/index';
import { arrayLikeCallbackType } from '../@types';

export default function forOwn(object: any, callback: arrayLikeCallbackType | any): void {
	if (isObject(object) && isFunction(callback)) {
		_objectForEach(object, callback);
	}
}
