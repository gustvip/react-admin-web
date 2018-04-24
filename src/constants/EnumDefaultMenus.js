/**
 * Created by joey on 2018/02/19
 */

import helper from 'utils/core/helper'
import EnumRouter from './EnumRouter'

/**
 * icon 类型
 * @type {{antd: string, custom: string}}
 */
export const EnumIconTypes = helper.immutable({
	antd: 'antd',
	custom: 'custom',
}, null)

export default helper.immutable([
	{
		label: '数据平台',
		value: 'data_platform',
		url: [EnumRouter.user_list],
		children: [
			{
				label: '数据采集',
				url: [EnumRouter.user_list],
				children: [
					{
						label: '用户管理',
						url: [EnumRouter.user_list],
						children: [
							{
								label: 'list',
								url: [EnumRouter.user_list],
								children: [],
							},
						],
					},
				],
			},
		],
	},
], null)

