/**
 * Created by joey on 2018/6/20
 */
import isNumber from '../isNumber';

/**
 * Checks if `value` is a valid array-like length
 * @param {*} x
 * @returns {boolean}
 */
export default function isLength (x) {
	console.log(x > -1,'111');
	return isNumber(x) && x > -1 && x % 1 === 0 && x <= 9007199254740991;
};
