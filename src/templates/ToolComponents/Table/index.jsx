import T from 'utils/T'
import { Table } from 'antd'
import style from './tableExchange.scss'

const TableExchange = function (props) {
	return <Table
		{...props}
		className={T.helper.classNames(style['container'])(props.className)}
	/>
}
export default TableExchange
