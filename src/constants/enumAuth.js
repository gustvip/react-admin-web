/**
 * Created by joey on 2018/02/19
 */
import helper from 'utils/core/helper';

/**
 * @type {{user: {userList: {label: string, value: string}}}}
 */
const enumAuth = {
	/*
	 |-----------------------------------------------
	 | 用户模块-相关的权限
	 |-----------------------------------------------
	 */
	user: {
		userList: {
			label: '用户列表',
			value: 'userRoute.list',
		},
	},
};
export default enumAuth;
