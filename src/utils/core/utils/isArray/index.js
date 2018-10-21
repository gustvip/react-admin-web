/**
 * Created by joey on 2018/6/20
 */
import _getClassName from '../aaa/_getClassName/index';

/**
 * 是否为数组
 * @param {*} x
 * @returns {boolean}
 */
export default function isArray(x) {
	return _getClassName(x) === '[object Array]';
}
