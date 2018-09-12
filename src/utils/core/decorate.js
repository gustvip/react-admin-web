/**
 * Created by joey on 2018/2/19
 */

import PropTypes from 'prop-types';

/**
 * react component contextTypes的装饰器，目前支持的类型：store, router
 * @param  params
 * @returns {function(*)}
 */
export const contextTypes = (...params) => {
	return (targetClass) => {
		params.forEach((type) => {
			targetClass.contextTypes = targetClass.contextTypes || {};
			if (!Object.prototype.hasOwnProperty.call(targetClass.contextTypes, type)) {
				switch (type) {
					case 'store':
					case 'router':
						targetClass.contextTypes[type] = PropTypes.object.isRequired;
						break;
				}
			}
		});
	};
};

/**
 * 验证propTypes的装饰器
 * @param {Object} propTypesChecker
 * @returns {function(*)}
 */
export const propTypes = (propTypesChecker = {}) => {
	return (targetClass) => {
		targetClass.propTypes = propTypesChecker;
	};
};