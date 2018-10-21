/**
 * Created by joey on 2018/6/20
 */
import isNull from '../isNull';

/**
 * 是否像对象
 * @param {*} x
 * @returns {boolean}
 */
export default function isObjectLike(x) {
	return typeof x === 'object' && !isNull(x);
}
