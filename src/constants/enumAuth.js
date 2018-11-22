/**
 * Created by joey on 2018/02/19
 */

/**
 * @type {{serverUserList: {label: string, value: string}, browserUserList: {label: string, value: string}}}
 */
const enumAuth = {
	/*
	 |-----------------------------------------------
	 | 用户模块-相关的权限
	 |-----------------------------------------------
	 */
	serverUserList: {
		label: '用户列表api',
		value: 'serverUserList',
	},
	browserUserList: {
		label: '用户列表路由',
		value: 'browserUserList',
	},
};
export default enumAuth;
