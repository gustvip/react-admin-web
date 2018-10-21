/**
 * Created by joey on 2018/6/20
 */
import _getClassName from '../aaa/_getClassName/index';

/**
 * 是否为buffer数组
 * @param {*} x
 * @returns {boolean}
 */
export default function isArrayBuffer(x) {
	return _getClassName(x) === '[object ArrayBuffer]';
}
