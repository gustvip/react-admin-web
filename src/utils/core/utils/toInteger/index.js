/**
 * Created by joey on 2018/8/28
 */
import toFinite from '../toFinite';

/**
 * 转化为整数
 * @param {*} x
 * @returns {number}
 */
export default function toInteger(x) {
	x = toFinite(x);
	return x ? Math.floor(x) : 0;
}
