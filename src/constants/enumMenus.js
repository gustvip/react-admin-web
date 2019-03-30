/**
 * Created by joey on 2018/02/19
 */

import helper from 'utils/core/helper';
import enumRouter from './enumRouter';
import enumAuth from 'constants/enumAuth';
import { isString, uniq, uniqueId } from 'lodash';

/**
 * @type {{auth, label: string, url: (string|string), id: *, children: {auth, label: string, url: (string|string), id: *, children: *[]}[]}[]}
 */
const menus = [
	{
		auth: enumAuth.bPlatform.value,
		label: '大栏目',
		url: enumRouter.testDemo,
		id: uniqueId(),
		children: [
			{
				auth: enumAuth.bPlatformCategory.value,
				label: '小栏目',
				url: enumRouter.testDemo,
				id: uniqueId(),
				children: [
					{
						auth: enumAuth.bPlatformCategoryAdministrator.value,
						label: '超级管理员',
						url: enumRouter.administratorAuthEnumList,
						icon: 'team',
						id: uniqueId(),
						children: [
							{
								auth: enumAuth.bPlatformCategoryAdministratorAuthEnum.value,
								label: '权限枚举',
								url: enumRouter.administratorAuthEnum,
								id: uniqueId(),
								children: [],
							},
							{
								auth: enumAuth.bPlatformCategoryAdministratorAuthList.value,
								label: '权限分配',
								url: enumRouter.administratorAuthList,
								id: uniqueId(),
								children: [],
							},
							{
								auth: enumAuth.bPlatformCategoryAdministratorGroupList.value,
								label: '组管理',
								url: enumRouter.administratorGroupList,
								id: uniqueId(),
								children: [],
							},
						],
					},
					{
						auth: enumAuth.bPlatformCategoryUser.value,
						label: '用户管理',
						url: enumRouter.userList,
						icon: 'user',
						id: uniqueId(),
						children: [
							{
								auth: enumAuth.bPlatformCategoryUserList.value,
								label: '用户列表',
								url: enumRouter.userList,
								id: uniqueId(),
								children: [],
							},
						],
					},
					{
						label: 'API测试',
						url: enumRouter.testDemo,
						icon: 'customer-service',
						id: uniqueId(),
						children: [
							{
								label: '练习API',
								url: enumRouter.testDemo,
								id: uniqueId(),
								children: [],
							},
							{
								auth: enumAuth.bPlatformCategoryTestParseFile.value,
								label: '解析文件',
								url: enumRouter.testParseFile,
								id: uniqueId(),
								children: [],
							},
						],
					},
				],
			},
		],
	},
];

// 格式化数据
export default (() => {
	const formatData = data => {
		let resultUrl = [];
		const resultData = data.map(item => {
			const itemUrl = uniq(Array.isArray(item.url) ? item.url : isString(item.url) ? [item.url] : []);
			if (Array.isArray(item.children) && item.children.length) {
				const result = formatData(item.children);
				resultUrl = resultUrl.concat(result.resultUrl).concat(itemUrl);
				
				return Object.assign(
					{},
					item,
					{
						children: result.resultData,
						url: uniq(itemUrl.concat(result.resultUrl)),
					},
				);
			}
			resultUrl = resultUrl.concat(itemUrl);
			
			return Object.assign(
				{},
				item,
				{
					children: [],
					url: itemUrl,
				},
			);
		});
		return {resultData, resultUrl};
	};
	
	return helper.immutable(formatData(menus).resultData);
})();
