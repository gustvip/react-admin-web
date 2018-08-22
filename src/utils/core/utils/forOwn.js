/**
 * Created by joey on 2018/6/20
 */
import isObject from './isObject';

/**
 * 遍历对象(含有自身属性)
 * @param {object} object
 * @param {function} callback
 * @returns {undefined}
 */
export default function forOwn (object, callback) {
	if (isObject(object)) {
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				if (callback(object[key], key, object) === false) {
					return;
				}
			}
		}
	}
};
