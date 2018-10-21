/**
 * Created by joey on 2018/6/20
 */

import isPlainObject from '../isPlainObject';

/**
 * 是否为HTMLElement
 * @param {*} x
 * @returns {boolean}
 */
export default function isElement(x) {
	return x && x.nodeType === 1 && !isPlainObject(x);
}
