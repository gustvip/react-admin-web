/**
 * Created by joey on 2018/2/19
 */

import PropTypes from 'prop-types';

/**
 * React component contextTypes的装饰器，目前支持的类型：store, router
 * @param  params
 * @returns {function(*)}
 */
export const contextTypes = (...params) => targetClass => {
	params.forEach(type => {
		targetClass.contextTypes = targetClass.contextTypes || {};
		if (!Object.prototype.hasOwnProperty.call(targetClass.contextTypes, type)) {
			switch (type) {
				case 'store':
				case 'router':
					targetClass.contextTypes[type] = PropTypes.object.isRequired;
					break;
				default:
			}
		}
	});
};

/**
 * 验证propTypes的装饰器
 * @param {Object} propTypesChecker
 * @returns {function(*)}
 */
export const propTypes = (propTypesChecker = {}) => targetClass => {
	targetClass.propTypes = propTypesChecker;
};
