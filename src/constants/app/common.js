/**
 * 枚举用户状态
 * @type {{normal: number, delete: number}}
 */
export const userStatus = {
	normal: {
		label: '正常',
		value: '1',
	},
	delete: {
		label: '删除',
		value: '0',
	},
};

export const userType = {
	normal: {
		value: '1',
		label: '一般用户',
	},
	admin: {
		value: '2',
		label: '管理员用户',
	},
	root: {
		value: '3',
		label: 'root用户',
	},
};

/**
 * 用户性别
 * @type {{'0': {value: string, label: string}, '1': {value: string, label: string}, '2': {value: string, label: string}}}
 */
export const userSex = {
	boy: {
		value: '0',
		label: '男',
	},
	girl: {
		value: '1',
		label: '女',
	},
	secret: {
		value: '2',
		label: '保密',
	},
};

