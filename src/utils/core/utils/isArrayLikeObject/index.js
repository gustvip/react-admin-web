/**
 * Created by joey on 2018/6/20
 */
import isArrayLike from '../isArrayLike';
import isObjectLike from '../isObjectLike';

/**
 * 是否像数组的对象
 * @param {*} x
 * @returns {boolean}
 */
export default function isArrayLikeObject(x) {
	return isObjectLike(x) && isArrayLike(x);
}
