/**
 * @type {{normal: {label: string, value: string}, delete: {label: string, value: string}}}
 */
export const status = {
	normal: {
		label: '正常',
		value: '1',
	},
	delete: {
		label: '删除',
		value: '0',
	},
};

/**
 * @type {{normal: {value: string, label: string}, admin: {value: string, label: string}, root: {value: string, label: string}}}
 */
export const role = {
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
 * @type {{normalGroup: {label: string, value: string, children: *[]}}}
 */
export const groupAndRoleData = {
	normalGroup: {
		label: '正常分组',
		value: '2',
		children: [role.normal, role.admin, role.root],
	},
};

/**
 * @type {{boy: {value: string, label: string}, girl: {value: string, label: string}, secret: {value: string, label: string}}}
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

/**
 * @type {{pageSize: number, pageSizeOptions: string[], showQuickJumper: boolean}}
 */
export const pagination = {
	pageSize: 10,
	pageSizeOptions: ['10', '20', '30', '40', '50'],
	showQuickJumper: true,
};

