import T from 'utils/t'
import { Table } from 'antd'
import style from './table_exchange.scss'

const TableExchange = function (props) {
	return <Table
		{...props}
		className={T.helper.classNames(style['container'])(props.className)}
	/>
}
export default TableExchange
