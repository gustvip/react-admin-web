import { EnumAllType } from '../EnumCommon'
import helper from 'utils/core/helper'

/**
 * 枚举用户状态类型
 * @type {{all: {label: string, value: string}, normal: {label: string, value: number}, disabled: {label: string, value: number}}}
 */
export const EnumUserStatusType = helper.immutable({
	all: {
		label: '全部',
		value: EnumAllType,
	},
	normal: {
		label: <span style={{color: 'green'}}>正常</span>,
		value: 1,
	},
	disabled: {
		label: <span style={{color: 'red'}}>禁用</span>,
		value: 0,
	},
})


