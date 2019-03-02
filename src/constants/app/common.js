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
		value: 'normal',
		label: '一般用户',
	},
	admin: {
		value: 'admin',
		label: '管理员用户',
	},
	root: {
		value: 'root',
		label: 'root用户',
	},
};

/**
 * @type {{root: {label: string, value: string}, tourist: {label: string, value: string}}}
 */
export const group = {
	normal: {
		label: '一般组',
		value: 'normal',
	},
	root: {
		label: 'root组',
		value: 'root',
	},
	tourist: {
		label: '游客组',
		value: 'tourist',
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

/**
 * @type {string}
 */
export const initialPassword = '123456';

/**
 * @type {{yes: {value: string, label: string}, no: {value: string, label: string}}}
 */
export const autoAddToRoot = {
	yes: {
		value: '1',
		label: '是',
	},
	no: {
		value: '0',
		label: '否',
	},
};

/**
 * @type {{json: {value: string, label: string}, xlsx: {value: string, label: string}, csv: {value: string, label: string}}}
 */
export const fileExtendName = {
	json: {
		value: 'json',
		label: 'json文件',
	},
	xlsx: {
		value: 'xlsx',
		label: 'xlsx文件',
	},
	csv: {
		value: 'csv',
		label: 'csv文件',
	},
};
