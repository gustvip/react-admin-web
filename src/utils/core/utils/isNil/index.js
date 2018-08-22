/**
 * Created by joey on 2018/6/20
 */
import isNull from '../isNull/index';
import isUndefined from '../isUndefined/index';

/**
 * 是否为null || undefined
 * @param {*} x
 * @returns {boolean}
 */
export default function isNil (x) {
	return isNull(x) || isUndefined(x);
};
