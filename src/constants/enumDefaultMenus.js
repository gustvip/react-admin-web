/**
 * Created by joey on 2018/02/19
 */

import helper from "utils/core/helper";
import EnumRouter from "./enumRouter";

/**
 * Icon 类型
 * @type {{antd: string, custom: string}}
 */
export const EnumIconTypes = helper.immutable({
	antd: "antd",
	custom: "custom",
});

export default helper.immutable([
	{
		label: "大栏目",
		value: "data_platform",
		url: EnumRouter.userList,
		children: [
			{
				label: "小栏目",
				url: EnumRouter.userList,
				children: [
					{
						label: "用户管理",
						url: EnumRouter.userList,
						icon: {
							type: EnumIconTypes.antd,
							value: "up-square-o",
						},
						children: [
							{
								label: "list",
								url: EnumRouter.userList,
								icon: {
									type: EnumIconTypes.antd,
									value: "up-square-o",
								},
								children: [],
							},
						],
					},
				],
			},
			{
				label: "test",
				url: EnumRouter.testDemo,
				children: [
					{
						label: "地图",
						url: EnumRouter.testDemo,
						icon: {
							type: EnumIconTypes.antd,
							value: "up-square-o",
						},
						children: [
							{
								label: "cesium",
								url: EnumRouter.testDemo,
								icon: {
									type: EnumIconTypes.antd,
									value: "up-square-o",
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
