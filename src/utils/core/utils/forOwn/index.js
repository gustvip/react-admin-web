/**
 * Created by joey on 2018/6/20
 */
import isObject from "../isObject";
import isFunction from "../isFunction";
import {_hasOwnProperty} from "../aaa/_constant/index";

/**
 * 遍历对象(含有自身属性)
 * @param {object} object
 * @param {function} callback
 * @returns {undefined}
 */
export default function forOwn(object, callback) {
	if (isObject(object) && isFunction(callback)) {
		for (let key in object) {
			if (_hasOwnProperty.call(object, key)) {
				if (callback(object[key], key, object) === false) {
					return;
				}
			}
		}
	}
}
