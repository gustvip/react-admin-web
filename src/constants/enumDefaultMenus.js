/**
 * Created by joey on 2018/02/19
 */

import helper from "utils/core/helper";
import EnumRouter from "./enumRouter";

let index = -1;
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
		id: ++index + "",
		children: [
			{
				label: "小栏目",
				url: EnumRouter.userList,
				id: ++index + "",
				children: [
					{
						label: "用户管理",
						url: EnumRouter.userList,
						icon: {
							type: EnumIconTypes.antd,
							value: "up-square-o",
						},
						id: ++index + "",
						children: [
							{
								label: "list",
								url: EnumRouter.userList,
								icon: {
									type: EnumIconTypes.antd,
									value: "up-square-o",
								},
								id: ++index + "",
								children: [],
							},
						],
					},
					{
						label: "test",
						url: EnumRouter.test1,
						icon: {
							type: EnumIconTypes.antd,
							value: "up-square-o",
						},
						id: ++index + "",
						children: [
							{
								label: "test1",
								url: EnumRouter.test1,
								icon: {
									type: EnumIconTypes.antd,
									value: "up-square-o",
								},
								id: ++index + "",
								children: [
									{
										label: "test1",
										url: EnumRouter.test1,
										icon: {
											type: EnumIconTypes.antd,
											value: "up-square-o",
										},
										id: ++index + "",
										children: [],
									},
									{
										label: "test2",
										url: EnumRouter.test2,
										icon: {
											type: EnumIconTypes.antd,
											value: "up-square-o",
										},
										id: ++index + "",
										children: [],
									},
									{
										label: "test3",
										url: EnumRouter.test3,
										icon: {
											type: EnumIconTypes.antd,
											value: "up-square-o",
										},
										id: ++index + "",
										children: [],
									},
								],
							},
						],
					},
				],
			},
			{
				label: "test",
				url: EnumRouter.testDemo,
				id: ++index + "",
				children: [
					{
						label: "地图",
						url: EnumRouter.testDemo,
						icon: {
							type: EnumIconTypes.antd,
							value: "up-square-o",
						},
						id: ++index + "",
						children: [
							{
								label: "cesium",
								url: EnumRouter.testDemo,
								icon: {
									type: EnumIconTypes.antd,
									value: "up-square-o",
								},
								id: ++index + "",
								children: [],
							},
						],
					},
				],
			},
		],
	},
]);
