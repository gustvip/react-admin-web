/**
 * Created by joey on 2018/2/18
 */

import T from "utils/t";
import {Button, Input, Table} from "antd";
import {MainContent} from "templates/mainLayout/index";
import * as webAPI from "../../webAPI/list";
import React from "react";
import {userSex, userType, userStatus} from "constants/app/common";

import debounce from "lodash/debounce";
import style from "../../scss/list/index.scss";

@T.decorate.contextTypes("router")
class List extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			currentPage: 1,
			pageSize: 10,
			count: 10,
			totalPages: 1,
			dataSource: [],
			selectedRowKeys: [],
			selectedRows: [],
			search: "",
		};
	}
	
	componentDidMount() {
		this.getList(1, this.state.pageSize, this.state.search);
	}
	
	getList = (currentPage, pageSize, search) => {
		webAPI.getUserList(currentPage, pageSize, search).then(info => {
			const data = info.data;
			this.setState({
				currentPage,
				pageSize: data.pageSize,
				count: data.count,
				totalPages: data.totalPages,
				dataSource: data.data,
				selectedRowKeys: [],
				selectedRows: [],
			});
		}).catch(info => T.prompt.error(info.msg));
	};
	
	handleDelete = () => {
		T.prompt.confirm({
			onOk: () => webAPI.deleteUser(this.state.selectedRows.map(value => value.userId)).
				then(() => this.getList(1, this.state.pageSize, this.state.search)).
				catch(info => T.prompt.error(info.msg)),
		});
	};
	
	get columns() {
		return [
			{
				title: "姓名",
				dataIndex: "name",
			},
			{
				title: "性别",
				dataIndex: "userSex",
				render(text) {
					return Object.values(userSex).find(value => value.value === text).label;
				},
			},
			{
				title: "描述",
				dataIndex: "userDescription",
			},
			{
				title: "名称",
				dataIndex: "userName",
			},
			{
				title: "邮箱",
				dataIndex: "userEmail",
			},
			{
				title: "电话",
				dataIndex: "userPhone",
			},
			{
				title: "状态",
				dataIndex: "userStatus",
				render(text) {
					return Object.values(userStatus).find(value => value.value === text).label;
				},
			},
			{
				title: "用户类型",
				dataIndex: "userType",
				render(text) {
					return Object.values(userType).find(value => value.value === text).label;
				},
			},
			{
				title: "创建时间",
				dataIndex: "createdAt",
				render: val => new Date(val).toLocaleDateString(),
			},
			{
				title: "更新时间",
				dataIndex: "updatedAt",
				render: val => new Date(val).toLocaleDateString(),
			},
		];
	}
	
	get pagination() {
		const self = this;
		return {
			current: self.state.currentPage,
			total: self.state.count,
			pageSize: self.state.pageSize,
			showQuickJumper: true,
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
				<MainContent>
					<header className={style["table-header-container"]}>
						<div className={style["left-container"]}>
							<Button
								disabled={this.state.selectedRows.length === 0}
								type="primary"
								onClick={() => this.handleDelete()}
							>
								删除
							</Button>
							<Button
								disabled={this.state.selectedRows.length !== 1}
								type="primary"
							>
								编辑
							</Button>
						</div>
						<div className={style["right-container"]}>
							<Input.Search
								onChange={event => this.setState({search: event.target.value})}
								placeholder="请搜索"
								onSearch={debounce(() => this.getList(1, this.state.pageSize, this.state.search), 300)}
							/>
						</div>
					</header>
					<Table
						dataSource={self.state.dataSource.map(value => ({
							...value,
							key: value.userId,
						}))}
						columns={self.columns}
						pagination={self.pagination}
						rowSelection={self.rowSelection}
					/>
				</MainContent>
			</React.Fragment>
		);
	}
}

export default List;
