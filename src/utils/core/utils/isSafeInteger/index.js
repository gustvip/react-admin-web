/**
 * Created by joey on 2018/6/20
 */
import isInteger from '../isInteger';

/**
 * 是否为符合条件的整数
 * @param {*} x
 * @returns {boolean}
 */
export default function isSafeInteger(x) {
	return isInteger(x) && Math.abs(x) <= 9007199254740991;
}
