/**
 * Created by joey on 2018/8/25
 */

export default function _objectForEach(object: object, callback: (value?: any, key?: string, object?: object) => any) {
	for (var key in object) {
		if (Object.prototype.hasOwnProperty.call(object, key)) {
			if (callback(object[key], key, object) === false) {
				return;
			}
		}
	}
}
