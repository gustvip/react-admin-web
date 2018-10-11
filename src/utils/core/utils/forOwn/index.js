/**
 * Created by joey on 2018/6/20
 */
import isObject from "../isObject";
import isFunction from "../isFunction";
import _objectForEach from "../aaa/_objectForEach";

/**
 * 遍历对象(含有自身属性)
 * @param {object} object
 * @param {function} callback
 * @returns {undefined}
 */
export default function forOwn(object, callback) {
	if (isObject(object) && isFunction(callback)) {
		_objectForEach(object, callback);
	}
}
