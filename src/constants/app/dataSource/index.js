import { EnumDataOperateType, EnumAllType } from '../EnumCommon'
import helper from 'utils/core/helper'

/**
 * 枚举数据源类型
 * @type {{all: {label: string, value: number}, excel: {label: string, value: number}, kafka: {label: string, value: number}, hdfs: {label: string, value: number}, api: {label: string, value: number}}}
 */
export const EnumDataSourceType = helper.immutable({
	all: {
		label: '全部',
		value: EnumAllType,
	},
	kafka: {
		label: 'Kafka数据源',
		value: EnumDataOperateType.middleware.kafka,
	},
	hdfs: {
		label: 'Hdfs数据源',
		value: EnumDataOperateType.db.hdfs,
	},
	mysql: {
		label: 'MySQL数据源',
		value: EnumDataOperateType.db.mysql,
	},
	// excel: {
	//     label: 'Excel数据源',
	//     value: EnumDataOperateType.file.excel,
	// },
	// api: {
	//     label: 'Restful数据源',
	//     value: EnumDataOperateType.api.restful,
	// },
})

/**
 * 枚举文件类型的数据源
 * @type {*[]}
 */
export const EnumDataSourceFileTypes = [
	// EnumDataSourceType.excel.value,
]

/**
 * 数据源的数据结构枚举
 * @type {{}}
 */
export const EnumSourceDataStructureType = helper.immutable({
	[EnumDataOperateType.middleware.kafka]: [
		{
			label: '集群',
			key: 'clusters',
			defaultVal: null,
			description: '注意：“ip:端口”的形式，多台机器以“,“分隔。',
		},
		{
			label: 'topic',
			key: 'topic',
			defaultVal: null,
			description: '',
		},
	],
	
	[EnumDataOperateType.db.hdfs]: [
		{
			label: '目录',
			key: 'dir',
			defaultVal: null,
			description: '注意: 多个目录以","分割',
		},
		{
			label: 'IP',
			key: 'ip',
			defaultVal: null,
			description: '',
		},
		{
			label: '端口',
			key: 'port',
			defaultVal: null,
			description: '',
		},
	],
	
	[EnumDataOperateType.db.mysql]: [
		{
			label: '数据库驱动',
			key: 'dbDriver',
			defaultVal: null,
			description: '',
		},
		{
			label: '链接地址',
			key: 'ip',
			defaultVal: null,
			description: '',
		},
		{
			label: '用户名',
			key: 'userName',
			defaultVal: null,
			description: '',
		},
		{
			label: '密码',
			key: 'password',
			defaultVal: null,
			description: '',
		},
	],
})

