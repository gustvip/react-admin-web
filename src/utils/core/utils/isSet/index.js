/**
 * Created by joey on 2018/8/25
 */
import _getClassName from '../aaa/_getClassName/index';

/**
 * 是否为Set
 * @param {*} x
 * @returns {boolean}
 */
export default function isSet(x) {
	return _getClassName(x) === '[object Set]';
}
