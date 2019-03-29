/**
 * Created by joey on 18-2-7
 */

import T from 'utils/t';
import enumMenus from 'constants/enumMenus';
import { isString, uniq, flowRight, identity } from 'lodash';

/**
 * 获取分类路由
 * @param {String} locationPathname window.location.pathname
 * @return {Array}
 */
export const getCategoryRoute = locationPathname => {
	locationPathname = flowRight(T.helper.removeTrailingSlash, T.helper.removeBlank)(locationPathname);
	const result = enumMenus.find(item => item.url.indexOf(locationPathname) !== -1);
	return result ? Array.isArray(result.children) ? result.children : [] : [];
};

/**
 * 获取window.location.pathname对应的菜单数据
 * @param {String} locationPathname window.location.pathname
 * @return {Array}
 */
export const getMenuData = locationPathname => {
	const result = getCategoryRoute(locationPathname).find(item => item.url.indexOf(locationPathname) !== -1);
	return result ? Array.isArray(result.children) ? result.children : [] : [];
};

/**
 * 获取菜单打开的数组
 * @param {String} locationPathname window.location.pathname
 * @return {Array}
 */
export const getOpenKeys = locationPathname => {
	locationPathname = flowRight(T.helper.removeTrailingSlash, T.helper.removeBlank)(locationPathname);
	const dataSource = getMenuData(locationPathname);
	const data = [];
	
	(function fn(_dataSource) {
		const result = _dataSource.find(item => item.url.indexOf(locationPathname) !== -1);
		if (result) {
			data.push(result.id);
			Array.isArray(result.children) && result.children.length && fn(result.children);
		}
	}(dataSource));
	return data.slice(0, data.length - 1);
};
