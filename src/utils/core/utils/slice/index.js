/**
 * Created by joey on 2018/6/20
 */
import isArray from '../isArray';
import _baseSlice from '../aaa/_baseSlice';

/**
 * 截取集合
 * @param {array | string} [data]
 * @param {* | number} [startIndex]
 * @param {* | number} [endIndex]
 * @returns {array}
 */
export default function slice(data, startIndex, endIndex) {
	if (isArray(data) && data.length > 0) {
		return _baseSlice(data, startIndex, endIndex);
	}
	return [];
}
