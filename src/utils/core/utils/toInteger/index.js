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
	return Math.floor(toFinite(x));
}
