/**
 * Created by joey on 2018/2/18
 */

import T from "utils/t";
import {Button, Input} from "antd";
import {Link} from "react-router-dom";
import {MainHeader, MainContent} from "templates/mainLayout/index";
import Table from "templates/toolComponents/table/index";
import EnumRouter from "constants/enumRouter";

import assign from "lodash/assign";
import debounce from "lodash/debounce";
import style from "../../scss/list/index.scss";
import * as actionTypes from "../../actions/list/index";

@T.decorate.contextTypes("router")
class List extends React.PureComponent {
	/**
	 * 获取用户所有信息
	 */
	componentDidMount() {
		const self = this;
		self.props.dispatch(actionTypes.getInitialDataAction({
			currentPage: self.props.mapProps.currentPage,
			pageSize: self.props.mapProps.pageSize,
		}));
	}
	
	/**
	 * 删除相关用户
	 * @param {Number || Array} userId
	 */
	handleDelete = (userId) => {
		const userIdCollection = [];
		const self = this;
		if (T.helper.isUsefulNumber(userId)) {
			userIdCollection.push(userId);
		} else if (T.helper.checkArray(userId)) {
			userId.forEach(item => userIdCollection.push(self.props.mapProps.dataSource[item].userId));
		}
		
		T.helper.checkArray(userIdCollection) && self.props.dispatch(actionTypes.deleteUserAction({
			userId: userIdCollection,
			currentPage: self.props.mapProps.currentPage,
			pageSize: self.props.mapProps.pageSize,
		}));
	};
	
	/**
	 * 选中行
	 * @param {Array} selectedRowKeys
	 */
	handleSelectedRowKeys = (selectedRowKeys) => {
		this.props.dispatch(actionTypes.setDeleteRowAction(selectedRowKeys));
	};
	
	/**
	 * 搜索
	 * @param {string} value
	 */
	handleSearch = (value) => {
		const self = this;
		self.props.dispatch(actionTypes.setUserSearchAction({
			userInfo: value,
			limitLength: self.props.mapProps.pageSize,
		}));
	};
	
	/**
	 * 获取表格配置
	 * @returns {*[]}
	 */
	get columns() {
		const self = this;
		
		return [
			{
				title: "id",
				dataIndex: "userId",
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
				dataIndex: "deleteStatus",
			},
			{
				title: "用户类型",
				dataIndex: "userType",
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
			{
				title: "操作",
				dataIndex: "",
				render: (val, row) => {
					return (
						<div>
							<Button
								type="primary"
								onClick={() => self.handleDelete(row.userId)}
							>
								删除
							</Button>
							<Link
								to={{
									pathname: EnumRouter.userEdit,
									state: {
										userId: row.userId,
									},
								}}
							>
								<Button
									type="primary"
								>
									编辑
								</Button>
							</Link>
							<Link
								to={{
									pathname: EnumRouter.orderAdd,
									state: {
										userId: row.userId,
									},
								}}
							>
								<Button
									type="primary"
								>
									新增订单
								</Button>
							</Link>
						</div>
					);
				},
			},
		];
	}
	
	/**
	 * 获取表格数据
	 */
	get dataSource() {
		return this.props.mapProps.dataSource.map((item, index) => assign({}, item, {key: index}));
	}
	
	/**
	 * 分页
	 * @returns {{current: *, total: ((key?: (IDBKeyRange | IDBValidKey)) => IDBRequest) | ((countTitle?: string) => void), pageSize: *, showQuickJumper: boolean, onChange(*=, *=): void}}
	 */
	get pagination() {
		const self = this;
		
		return {
			current: self.props.mapProps.currentPage,
			total: self.props.mapProps.count,
			pageSize: self.props.mapProps.pageSize,
			showQuickJumper: true,
			onChange(currentPage, pageSize) {
				self.props.dispatch(actionTypes.getUserListAction({
					currentPage,
					pageSize,
				}));
			},
		};
	}
	
	/**
	 * 行选中
	 * @return {*}
	 */
	get rowSelection() {
		const self = this;
		
		return {
			selectedRowKeys: self.props.mapProps.selectedRowKeys,
			onChange(selectedRowKeys) {
				return self.handleSelectedRowKeys(selectedRowKeys);
			},
		};
	}
	
	render() {
		const self = this;
		
		return [
			<MainHeader title="content-header" key="0"/>,
			<MainContent className={style["main-content-container"]} key="1">
				<header className={style["table-header-container"]}>
					<div className={style["left-container"]}>
						<Button
							type="primary"
							onClick={debounce(() => self.handleDelete(self.props.mapProps.selectedRowKeys), 300)}
						>
							删除
						</Button>
					</div>
					<div className={style["right-container"]}>
						<Input.Search placeholder="请搜索" onSearch={debounce(value => self.handleSearch(value), 300)}/>
					</div>
				</header>
				<Table
					dataSource={self.dataSource}
					columns={self.columns}
					pagination={self.pagination}
					rowSelection={self.rowSelection}
				/>
			</MainContent>,
		];
	}
}

export default List;
