/**
 * Created by joey on 18-2-7
 */

import T from 'utils/t';
import EnumDefaultMenus from 'constants/enumDefaultMenus';
import { isString, uniq, flowRight, identity } from 'lodash';

/**
 * Location.pathname和分类值的对应关系
 * @type {{[location.pathname]:{category:String}}}
 */
let mapUrlToCategory = {};

/**
 * 配置菜单文件
 * @return {Array}
 */
export const EnumMenus = (() => {
	/**
	 * 格式化数据
	 * @param {Array} children
	 * @return {{resultChildren: Array, resultUrl: Array}}
	 */
	const formatData = (children) => {
		let resultUrl = [];
		let resultChildren = [];
		
		if (Array.isArray(children) && children.length) {
			resultChildren = children.map((item) => {
				if (Array.isArray(item.children) && item.children.length) {
					const result = formatData(item.children);
					resultUrl = resultUrl.concat(result.resultUrl).concat(Array.isArray(item.url)
						? item.url
						: isString(item.url)
							? [item.url]
							: []);
					
					return Object.assign(
						{},
						item,
						{
							children: result.resultChildren,
							url: uniq(
								(Array.isArray(item.url)
									? item.url
									: isString(item.url)
										? [item.url]
										: []).concat(result.resultUrl),
							),
						},
					);
				} else {
					if (Array.isArray(item.url) || isString(item.url)) {
						resultUrl = resultUrl.concat(item.url);
					}
					
					return Object.assign(
						{},
						item,
						{
							children: [],
							url: Array.isArray(item.url)
								? uniq(item.url)
								: isString(item.url)
									? [item.url]
									: [],
						},
					);
				}
			});
		}
		return {
			resultChildren,
			resultUrl,
		};
	};
	
	const menuData = EnumDefaultMenus.map((item) => {
		const result = formatData(item.children);
		/**
		 * Url和category的映射
		 */
		result.resultUrl.forEach((locationPathname) => {
			mapUrlToCategory[locationPathname] = {category: item.value};
		});
		
		return Object.assign(
			{},
			item,
			{
				children: result.resultChildren,
				url: uniq(
					(Array.isArray(item.url)
						? item.url
						: isString(item.url)
							? [item.url]
							: []
					).concat(result.resultUrl),
				),
			},
		);
	});
	
	mapUrlToCategory = T.helper.immutable(mapUrlToCategory);
	return T.helper.immutable(menuData);
})();

/**
 * 获取window.location.pathname对应的分类数据
 * @param {String} locationPathname window.location.pathname
 * @return {String || null}
 */
export const getCategoryData = (locationPathname) => {
	const result = mapUrlToCategory[flowRight(T.helper.removeTrailingSlash, T.helper.removeBlank)(locationPathname)];
	
	return result ? result.category : null;
};

/**
 * 获取window.location.pathname对应的分类的children数据
 * @param {String} category
 * @return {Array}
 */
export const getCategoryChildrenData = (category) => {
	const result = EnumMenus.find(item => item.value === category);
	
	return result
		? Array.isArray(result.children)
			? result.children
			: []
		: [];
};

/**
 * 获取分类路由
 * @param {String} locationPathname window.location.pathname
 * @return {Array}
 */
export const getCategoryRoute = flowRight(getCategoryChildrenData, getCategoryData, identity);

/**
 * 获取window.location.pathname对应的菜单数据
 * @param {String} locationPathname window.location.pathname
 * @return {Array}
 */
export const getMenuData = (locationPathname) => {
	locationPathname = flowRight(T.helper.removeTrailingSlash, T.helper.removeBlank)(locationPathname);
	const result = getCategoryRoute(locationPathname).find(item => item.url.indexOf(locationPathname) !== -1);
	
	return result
		? Array.isArray(result.children)
			? result.children
			: []
		: [];
};

/**
 * 获取菜单打开的数组
 * @param {String} locationPathname window.location.pathname
 * @return {Array}
 */
export const getOpenKeys = (locationPathname) => {
	locationPathname = flowRight(T.helper.removeTrailingSlash, T.helper.removeBlank)(locationPathname);
	const dataSource = getMenuData(locationPathname);
	const data = [];
	
	(function fn (_dataSource) {
		const result = _dataSource.find(item => item.url.indexOf(locationPathname) !== -1);
		if (result) {
			data.push(result.id);
			Array.isArray(result.children) && result.children.length && fn(result.children);
		}
	}(dataSource));
	return data.slice(0, data.length - 1);
};
