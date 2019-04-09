import {identity, forEach} from 'lodash';
import isPureObject from '../isPureObject';

/**
 * @param {*} data
 * @param {Function} callback
 * @param {Boolean} enumerable 属性是否可以枚举
 * @return {*}
 */
function immutable(data, callback = identity, enumerable = true) {
	return (function fn(_data) {
		let result = _data;
		if (isPureObject(_data) || Array.isArray(_data)) {
			result = Array.isArray(_data) ? [] : {};
			forEach(_data, (value, key) => {
				Object.defineProperty(result, key, {
					value: fn(callback(value, key)),
					enumerable,
				});
			});
		}
		return result;
	}(data));
}

export default immutable;
