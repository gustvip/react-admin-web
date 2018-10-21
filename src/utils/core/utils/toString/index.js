/**
 * Created by joey on 2018/8/28
 */
import isNil from '../isNil';

/**
 * 转化为字符串
 * @param {*} x
 * @returns {string}
 */
export default function toString(x) {
	if (isNil(x)) {
		return '';
	}
	return String(x);
}
