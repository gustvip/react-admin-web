import {toFinite, round} from 'lodash';
import getNumberBase from '../getNumberBase';

/**
 * @param {*} x 字节大小
 * @param {number} w 保留小数位数
 * @returns {string}
 */
function autoToSize(x, w = 2) {
	const base = getNumberBase(x);
	return round(toFinite(x) / Math.pow(1024, base.index), w) + base.base;
}

export default autoToSize;
