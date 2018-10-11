/**
 * Created by joey on 2018/8/25
 */

/**
 * 遍历对象(含有自身属性)
 * @param {object} object
 * @param {function} callback
 * @returns {undefined}
 */
export default function _objectForEach(object, callback) {
	for (var key in object) {
		if (Object.prototype.hasOwnProperty.call(object, key)) {
			if (callback(object[key], key, object) === false) {
				return;
			}
		}
	}
}
