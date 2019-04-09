import isString from '../isString';

/**
 * 检测去除左右空白后长度大于0的字符串
 * @param {*} x
 * @return {Boolean}
 */
function checkString(x) {
	return isString(x) && x.trim().length > 0;
}

export default checkString;
