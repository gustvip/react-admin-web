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
	return isNumber(x) && x > -1 && Math.floor(x) === x && x <= 9007199254740991;
};
