import React from 'react'
import T from 'utils/T'
import { Table } from 'antd'
import style from './tableExchange.scss'

const TableExchange = function (props) {
	return <Table
		{...props}
		className={T.helper.classNames(style['__user-manager-exchange-table__'])(props.className)}
	/>
}
export default TableExchange
