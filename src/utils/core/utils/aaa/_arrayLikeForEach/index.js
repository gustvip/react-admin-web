/**
 * Created by joey on 2018/10/11
 */

/**
 * 遍历类数组
 * @param {Array} data
 * @param {function} callback
 * @returns {undefined}
 */
export default function _arrayLikeForEach(data, callback) {
	var i = -1;
	var len = data.length;
	while (++i < len) {
		if (callback(data[i], i, data) === false) {
			return;
		}
	}
}
