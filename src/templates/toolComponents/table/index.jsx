/**
 * Created by joey on 2018/02/19
 */
import { Table } from 'antd';
import style from './tableExchange.scss';
import classNames from 'utils/core/classNames';

const TableExchange = function (props) {
	return <Table
		{...props}
		className={classNames(style['container'], props.className)}
	/>;
};
export default TableExchange;
