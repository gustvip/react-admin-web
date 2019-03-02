/**
 * Created by joey on 2018/02/19
 */

import helper from 'utils/core/helper';
import EnumRouter from './enumRouter';
import { uniqueId } from 'lodash';
import enumAuth from 'constants/enumAuth';

/**
 * Icon 类型
 * @type {{antd: string, custom: string}}
 */
export const EnumIconTypes = helper.immutable({
	antd: 'antd',
	custom: 'custom',
});

export default helper.immutable([
	{
		auth: enumAuth.bPlatform.value,
		label: '大栏目',
		url: EnumRouter.testDemo,
		id: uniqueId(),
		children: [
			{
				auth: enumAuth.bPlatformCategory.value,
				label: '小栏目',
				url: EnumRouter.testDemo,
				id: uniqueId(),
				children: [
					{
						auth: enumAuth.bPlatformCategoryAdministrator.value,
						label: '超级管理员',
						url: EnumRouter.administratorAuthEnumList,
						icon: {
							type: EnumIconTypes.antd,
							value: 'up-square-o',
						},
						id: uniqueId(),
						children: [
							{
								auth: enumAuth.bPlatformCategoryAdministratorAuthEnum.value,
								label: '权限枚举',
								url: EnumRouter.administratorAuthEnum,
								icon: {
									type: EnumIconTypes.antd,
									value: 'up-square-o',
								},
								id: uniqueId(),
								children: [],
							},
							{
								auth: enumAuth.bPlatformCategoryAdministratorAuthList.value,
								label: '权限分配',
								url: EnumRouter.administratorAuthList,
								icon: {
									type: EnumIconTypes.antd,
									value: 'up-square-o',
								},
								id: uniqueId(),
								children: [],
							},
							{
								auth: enumAuth.bPlatformCategoryAdministratorGroupList.value,
								label: '组管理',
								url: EnumRouter.administratorGroupList,
								icon: {
									type: EnumIconTypes.antd,
									value: 'up-square-o',
								},
								id: uniqueId(),
								children: [],
							},
						],
					},
					{
						auth: enumAuth.bPlatformCategoryUser.value,
						label: '用户管理',
						url: EnumRouter.userList,
						icon: {
							type: EnumIconTypes.antd,
							value: 'up-square-o',
						},
						id: uniqueId(),
						children: [
							{
								auth: enumAuth.bPlatformCategoryUserList.value,
								label: '用户列表',
								url: EnumRouter.userList,
								icon: {
									type: EnumIconTypes.antd,
									value: 'up-square-o',
								},
								id: uniqueId(),
								children: [],
							},
						],
					},
					{
						label: 'API测试',
						url: EnumRouter.testDemo,
						icon: {
							type: EnumIconTypes.antd,
							value: 'up-square-o',
						},
						id: uniqueId(),
						children: [
							{
								label: '练习API',
								url: EnumRouter.testDemo,
								icon: {
									type: EnumIconTypes.antd,
									value: 'up-square-o',
								},
								id: uniqueId(),
								children: [],
							},
							{
								label: '解析文件',
								url: EnumRouter.testParseFile,
								icon: {
									type: EnumIconTypes.antd,
									value: 'up-square-o',
								},
								id: uniqueId(),
								children: [],
							},
						],
					},
				],
			},
		],
	},
]);
