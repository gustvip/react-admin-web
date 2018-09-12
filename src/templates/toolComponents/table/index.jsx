/**
 * Created by joey on 2018/02/19
 */
import { Table } from 'antd';
import classNames from 'utils/core/classNames';
import style from './tableExchange.scss';

const TableExchange = function (props) {
	return (
		<Table
			{...props}
			className={classNames(style.container, props.className)}
		/>
	);
};
export default TableExchange;
