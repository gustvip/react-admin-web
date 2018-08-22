/**
 * Created by joey on 2018/02/19
 */

import helper from 'utils/core/helper';
import EnumRouter from './enumRouter';

/**
 * icon 类型
 * @type {{antd: string, custom: string}}
 */
export const EnumIconTypes = helper.immutable({
	antd: 'antd',
	custom: 'custom',
});

export default helper.immutable([
	{
		label: '大栏目',
		value: 'data_platform',
		url: EnumRouter.user_list,
		children: [
			{
				label: '小栏目',
				url: EnumRouter.user_list,
				children: [
					{
						label: '用户管理',
						url: EnumRouter.user_list,
						icon: {
							type: EnumIconTypes.antd,
							value: 'up-square-o',
						},
						children: [
							{
								label: 'list',
								url: EnumRouter.user_list,
								icon: {
									type: EnumIconTypes.antd,
									value: 'up-square-o',
								},
								children: [],
							},
						],
					},
				],
			},
			{
				label: 'test',
				url: EnumRouter.test_demo,
				children: [
					{
						label: '地图',
						url: EnumRouter.test_demo,
						icon: {
							type: EnumIconTypes.antd,
							value: 'up-square-o',
						},
						children: [
							{
								label: 'cesium',
								url: EnumRouter.test_demo,
								icon: {
									type: EnumIconTypes.antd,
									value: 'up-square-o',
								},
								children: [],
							},
						],
					},
				],
			},
		],
	},
]);
