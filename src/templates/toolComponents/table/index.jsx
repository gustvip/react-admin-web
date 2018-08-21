/**
 * Created by joey on 2018/02/19
 */
import T from 'utils/t';
import { Table } from 'antd';
import style from './tableExchange.scss';

const TableExchange = function (props) {
	return <Table
		{...props}
		className={T.helper.classNames(style['container'])(props.className)}
	/>;
};
export default TableExchange;
