/**
 * Created by joey on 2018/2/18
 */
import T from 'utils/t';
import {Button, Input, Table} from 'antd';
import enumAuth from '../../../../constants/enumAuth';
import {MainHeader} from 'templates/mainLayout';
import * as webAPI from '../../webAPI/list';
import React from 'react';
import PropTypes from 'prop-types';
import {userSex, role, status} from 'constants/app/common';
import style from '../../scss/list/index.scss';

export default class List extends React.PureComponent {
	static contextTypes = {
		router: PropTypes.object.isRequired,
	};
	
	state = {
		currentPage: 1,
		pageSize: 10,
		count: 10,
		totalPages: 1,
		dataSource: [],
		selectedRowKeys: [],
		selectedRows: [],
		search: '',
	};
	
	componentDidMount() {
		this.getList(1, this.state.pageSize, this.state.search);
	}
	
	getList = (currentPage, pageSize, search) => {
		webAPI.getUserList({
			currentPage,
			pageSize,
			search,
		}).then(info => {
			this.setState({
				search,
				currentPage,
				pageSize: info.data.pageSize,
				count: info.data.count,
				totalPages: info.data.totalPages,
				dataSource: info.data.data,
				selectedRowKeys: [],
				selectedRows: [],
			});
		}).catch(info => T.prompt.error(info.msg));
	};
	
	handleDelete = () => {
		const self = this;
		T.prompt.confirm({
			onOk() {
				webAPI.deleteUser({userId: self.state.selectedRows.map(value => value.userId)}).
					then(() => self.getList(1, self.state.pageSize, self.state.search)).
					catch(info => T.prompt.error(info.msg));
			},
		});
	};
	
	get columns() {
		return [
			{
				title: '姓名',
				dataIndex: 'name',
			},
			{
				title: '性别',
				dataIndex: 'userSex',
				render(text) {
					return Object.values(userSex).find(value => value.value === text).label;
				},
			},
			{
				title: '描述',
				dataIndex: 'userDescription',
			},
			{
				title: '名称',
				dataIndex: 'userName',
			},
			{
				title: '邮箱',
				dataIndex: 'userEmail',
			},
			{
				title: '电话',
				dataIndex: 'userPhone',
			},
			{
				title: '状态',
				dataIndex: 'status',
				render(text) {
					return Object.values(status).find(value => value.value === text).label;
				},
			},
			{
				title: '用户类型',
				dataIndex: 'role',
				render(text) {
					return Object.values(role).find(value => value.value === text).label;
				},
			},
			{
				title: '创建时间',
				dataIndex: 'createdAt',
				render: val => new Date(val).toLocaleString(),
			},
			{
				title: '更新时间',
				dataIndex: 'updatedAt',
				render: val => new Date(val).toLocaleString(),
			},
		];
	}
	
	get pagination() {
		const self = this;
		return {
			current: self.state.currentPage,
			total: self.state.count,
			pageSize: self.state.pageSize,
			showQuickJumper: false,
			onChange(currentPage, pageSize) {
				self.getList(currentPage, pageSize, self.state.search);
			},
		};
	}
	
	get rowSelection() {
		const self = this;
		return {
			selectedRowKeys: self.state.selectedRowKeys,
			onChange(selectedRowKeys, selectedRows) {
				self.setState({
					selectedRowKeys,
					selectedRows,
				});
			},
		};
	}
	
	render() {
		const self = this;
		return (
			<React.Fragment>
				<MainHeader
					right={
						<Button
							disabled={this.state.selectedRows.length === 0}
							type="primary"
							onClick={() => this.handleDelete()}
						>
							删除
						</Button>
					}
					left={
						<Input.Search
							onChange={event => this.setState({search: event.target.value})}
							placeholder="请搜索"
							onSearch={() => this.getList(1, this.state.pageSize, this.state.search)}
						/>
					}
				/>
				<div className={style['main-container']}>
					<Table
						size="middle"
						dataSource={self.state.dataSource.map(value => ({
							...value,
							key: value.userId,
						}))}
						bordered
						columns={self.columns}
						pagination={self.pagination}
						rowSelection={self.rowSelection}
					/>
				</div>
			</React.Fragment>
		);
	}
}
