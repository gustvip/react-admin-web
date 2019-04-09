import _classNames from 'classnames';
import isString from '../isString';

/**
 * 设置class
 * @param {*} basisClass 不是字符串，默认为iconfont,不想加传递''
 * @return {Function}
 */
function classNames(basisClass) {
	return (...rest) => _classNames(isString(basisClass) ? basisClass : 'iconfont', ...rest);
}

export default classNames;
