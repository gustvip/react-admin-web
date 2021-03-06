/**
 * Created by joey on 2018/2/18
 */
import T from 'utils/t';
import {Button, Input, Table, Select} from 'antd';
import * as enumCommon from 'constants/app/common';
import enumAuth from 'constants/enumAuth';
import MainHeader from 'templates/toolComponents/mainHeader';
import * as webAPI from 'constants/webAPI';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './userList.scss';
import UpdateUserInfoModal from 'templates/toolComponents/updateUserInfoModal';
import LookUpUserInfoModal from 'templates/toolComponents/lookUpUserInfoModal';
import UpdateGroupAndRoleModal from 'templates/toolComponents/updateGroupAndRoleModal';
import AddUserModal from 'templates/toolComponents/addUserModal';
import * as msg from 'constants/app/msg';

const Option = Select.Option;
export default class UserList extends React.PureComponent {
	static contextTypes = {
		router: PropTypes.object.isRequired,
	};
	
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			pageSize: enumCommon.pagination.pageSize,
			count: enumCommon.pagination.pageSize,
			totalPages: 1,
			dataSource: [],
			selectedRowKeys: [],
			selectedRows: [],
			search: '',
			
			groupData: [],
			group: undefined,
			roleData: Object.values(enumCommon.role).
				map(value => ({
					value: value.value,
					label: value.label,
				})),
			role: undefined,
			statusData: Object.values(enumCommon.status).
				map(value => ({
					value: value.value,
					label: value.label,
				})),
			status: undefined,
			sexData: Object.values(enumCommon.userSex).
				map(value => ({
					value: value.value,
					label: value.label,
				})),
			sex: undefined,
			isTableLoading: false,
		};
	}
	
	componentDidMount() {
		if (T.auth.isAdministrator) {
			// 获取组
			this.getGroupList();
		}
		
		// 获取用户信息
		this.getList({
			currentPage: 1,
			pageSize: this.state.pageSize,
			search: this.state.search,
			group: this.state.group,
			role: this.state.role,
			status: this.state.status,
			sex: this.state.sex,
		});
	}
	
	/**
	 * @param {function} [callback]
	 */
	getGroupList = callback => {
		webAPI.administratorGroupList().then(info => {
			this.setState({
				groupData: info.data.map(value => ({
					value: value.value,
					label: value.label,
				})),
			}, () => callback && callback(info.data));
		}).catch(info => T.prompt.error(info.msg));
	};
	
	/**
	 * @param {number} condition.currentPage
	 * @param {number} condition.pageSize
	 * @param {string} condition.search
	 * @param {string} [condition.group]
	 * @param {string} [condition.role]
	 * @param {string} [condition.status]
	 * @param {string} [condition.sex]
	 * @param {function} [callback]
	 */
	getList = (condition, callback) => {
		this.setState({isTableLoading: true}, () => {
			webAPI.getUserList({
				currentPage: condition.currentPage,
				pageSize: condition.pageSize,
				search: condition.search,
				group: condition.group,
				role: condition.role,
				status: condition.status,
				sex: condition.sex,
			}).then(info => {
				this.setState({
					currentPage: condition.currentPage,
					pageSize: info.data.pageSize,
					search: condition.search,
					group: condition.group,
					role: condition.role,
					status: condition.status,
					sex: condition.sex,
					
					count: info.data.count,
					totalPages: info.data.totalPages,
					dataSource: info.data.data,
					selectedRowKeys: [],
					selectedRows: [],
				}, () => {
					callback && callback(info.data);
				});
			}).catch(info => T.prompt.error(info.msg)).finally(() => this.setState({isTableLoading: false}));
		});
	};
	
	handleSearch = () => {
		this.getList({
			currentPage: this.state.currentPage,
			pageSize: this.state.pageSize,
			search: this.state.search,
			group: this.state.group,
			role: this.state.role,
			status: this.state.status,
			sex: this.state.sex,
		});
	};
	
	handleLookUp = record => {
		T.helper.renderModal(<LookUpUserInfoModal userId={record.userId}/>);
	};
	
	handleDelete = () => {
		const self = this;
		T.prompt.confirm({
			onOk() {
				webAPI.deleteUser({userId: self.state.selectedRows.map(value => value.userId)}).
					then(() => {
						T.prompt.success(msg.successInfo.deleteUser);
						self.getList({
							currentPage: 1,
							pageSize: self.state.pageSize,
							search: self.state.search,
							group: self.state.group,
							role: self.state.role,
							status: self.state.status,
							sex: self.state.sex,
						});
					}).
					catch(info => T.prompt.error(info.msg));
			},
		});
	};
	
	handleRecover = () => {
		const self = this;
		T.prompt.confirm({
			onOk() {
				webAPI.userRecover({userId: self.state.selectedRows.map(value => value.userId)}).
					then(() => {
						T.prompt.success(msg.successInfo.recoverUser);
						self.getList({
							currentPage: 1,
							pageSize: self.state.pageSize,
							search: self.state.search,
							group: self.state.group,
							role: self.state.role,
							status: self.state.status,
							sex: self.state.sex,
						});
					}).
					catch(info => T.prompt.error(info.msg));
			},
			title: '确认恢复吗?',
		});
	};
	
	handleGroupChange = group => {
		this.getList({
			currentPage: this.state.currentPage,
			pageSize: this.state.pageSize,
			search: this.state.search,
			group,
			role: this.state.role,
			status: this.state.status,
			sex: this.state.sex,
		});
	};
	
	handleRoleChange = role => {
		this.getList({
			currentPage: this.state.currentPage,
			pageSize: this.state.pageSize,
			search: this.state.search,
			group: this.state.group,
			role,
			status: this.state.status,
			sex: this.state.sex,
		});
	};
	
	handleStatusChange = status => {
		this.getList({
			currentPage: this.state.currentPage,
			pageSize: this.state.pageSize,
			search: this.state.search,
			group: this.state.group,
			role: this.state.role,
			status,
			sex: this.state.sex,
		});
	};
	
	handleSexChange = sex => {
		this.getList({
			currentPage: this.state.currentPage,
			pageSize: this.state.pageSize,
			search: this.state.search,
			group: this.state.group,
			role: this.state.role,
			status: this.state.status,
			sex,
		});
	};
	
	handleAddUser = () => {
		T.helper.renderModal(
			<AddUserModal
				successCallback={() => {
					this.getList({
						currentPage: this.state.currentPage,
						pageSize: this.state.pageSize,
						search: this.state.search,
						group: this.state.group,
						role: this.state.role,
						status: this.state.status,
						sex: this.state.status,
					});
				}}
			/>,
		);
	};
	
	handleEdit = record => {
		T.helper.renderModal(
			<UpdateUserInfoModal
				userId={record.userId}
				successCallback={() => {
					this.getList({
						currentPage: this.state.currentPage,
						pageSize: this.state.pageSize,
						search: this.state.search,
						group: this.state.group,
						role: this.state.role,
						status: this.state.status,
						sex: this.state.status,
					});
				}}
			/>,
		);
	};
	
	handleResetPassword = record => {
		T.prompt.confirm({
			onOk() {
				webAPI.userResetPassword({userId: record.userId}).then(() => T.prompt.success(msg.successInfo.userResetPassword)).catch(info => T.prompt.error(info.msg));
			},
			title: '确认重置密码吗？',
			content: `密码将重置为${enumCommon.initialPassword}`,
		});
	};
	
	handleEditGroupAndRole = record => {
		T.helper.renderModal(
			<UpdateGroupAndRoleModal
				userId={record.userId}
				group={record.group}
				role={record.role}
				successCallback={() => {
					this.getList({
						currentPage: this.state.currentPage,
						pageSize: this.state.pageSize,
						search: this.state.search,
						group: this.state.group,
						role: this.state.role,
						status: this.state.status,
						sex: this.state.status,
					});
				}}
			/>,
		);
	};
	
	get columns() {
		const self = this;
		return [
			{
				title: '组',
				dataIndex: 'group',
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'group',
					});
				},
			},
			{
				title: '角色',
				dataIndex: 'role',
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'role',
					});
				},
			},
			{
				title: '状态',
				dataIndex: 'status',
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'status',
					});
				},
				render(text) {
					return self.state.statusData.find(value => value.value === text).label;
				},
			},
			{
				title: '性别',
				dataIndex: 'userSex',
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'userSex',
					});
				},
				render(text) {
					return self.state.sexData.find(value => value.value === text).label;
				},
			},
			{
				title: '名称',
				dataIndex: 'userName',
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'userName',
					});
				},
			},
			{
				title: '邮箱',
				dataIndex: 'userEmail',
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'userEmail',
					});
				},
			},
			{
				title: '手机',
				dataIndex: 'userPhone',
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'userPhone',
					});
				},
			},
			{
				title: '操作',
				render(text, record) {
					return (
						<React.Fragment>
							<Button
								size="small"
								className="base-gap"
								type="primary"
								onClick={() => self.handleLookUp(record)}
							>
								查看
							</Button>
							<T.auth.AuthComponent auth={enumAuth.sUserUpdateInfo.value}>
								<Button
									size="small"
									className="base-gap"
									type="primary"
									onClick={() => self.handleEdit(record)}
								>
									编辑
								</Button>
							</T.auth.AuthComponent>
							<T.auth.AuthComponent auth={enumAuth.sUserUpdateGroupAndRole.value}>
								<Button
									size="small"
									className="base-gap"
									type="primary"
									onClick={() => self.handleEditGroupAndRole(record)}
								>
									角色管理
								</Button>
							</T.auth.AuthComponent>
							<T.auth.AuthComponent auth={enumAuth.sUserResetPassword.value}>
								<Button
									size="small"
									className="base-gap"
									type="primary"
									onClick={() => self.handleResetPassword(record)}
								>
									重置密码
								</Button>
							</T.auth.AuthComponent>
						</React.Fragment>
					);
				},
			},
		];
	}
	
	get pagination() {
		const self = this;
		return {
			pageSizeOptions: enumCommon.pagination.pageSizeOptions,
			showSizeChanger: true,
			current: self.state.currentPage,
			total: self.state.count,
			pageSize: self.state.pageSize,
			showQuickJumper: enumCommon.pagination.showQuickJumper,
			onChange(currentPage, pageSize) {
				self.getList({
					currentPage,
					pageSize,
					search: self.state.search,
					group: self.state.group,
					role: self.state.role,
					status: self.state.status,
					sex: self.state.sex,
				});
			},
			onShowSizeChange(currentPage, pageSize) {
				self.getList({
					currentPage: 1,
					pageSize,
					search: self.state.search,
					group: self.state.group,
					role: self.state.role,
					status: self.state.status,
					sex: self.state.sex,
				});
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
		return (
			<React.Fragment>
				<T.auth.AuthComponent auth={enumAuth.sUserAdd.value}>
					<MainHeader
					>
						<Button
							type="primary"
							onClick={() => this.handleAddUser()}
						>
							新增用户
						</Button>
					</MainHeader>
				</T.auth.AuthComponent>
				<MainHeader
				>
					<Input.Search
						style={{width: 150}}
						onChange={event => this.setState({search: event.target.value})}
						placeholder="请搜索"
						onSearch={() => this.handleSearch()}
					/>
					{
						T.auth.isAdministrator && (
							<Select
								allowClear
								value={this.state.group}
								style={{width: 150}}
								onChange={group => this.handleGroupChange(group)}
								placeholder="请选择分组"
							>
								{
									this.state.groupData.map((value => <Option key={value.value}>{value.value}</Option>))
								}
							</Select>
						)
					}
					<Select
						allowClear
						style={{width: 150}}
						value={this.state.role}
						onChange={role => this.handleRoleChange(role)}
						placeholder="请选择角色"
					>
						{
							this.state.roleData.map((value => <Option key={value.value}>{value.value}</Option>))
						}
					</Select>
					<Select
						allowClear
						style={{width: 150}}
						value={this.state.status}
						onChange={status => this.handleStatusChange(status)}
						placeholder="请选择状态"
					>
						{
							this.state.statusData.map((value => <Option key={value.value}>{value.label}</Option>))
						}
					</Select>
					<Select
						allowClear
						style={{width: 150}}
						value={this.state.sex}
						onChange={sex => this.handleSexChange(sex)}
						placeholder="请选择性别"
					>
						{
							this.state.sexData.map((value => <Option key={value.value}>{value.label}</Option>))
						}
					</Select>
					<T.auth.AuthComponent auth={enumAuth.sUserDelete.value}>
						<Button
							disabled={this.state.selectedRows.length === 0}
							type="primary"
							onClick={() => this.handleDelete()}
						>
							删除
						</Button>
					</T.auth.AuthComponent>
					<T.auth.AuthComponent auth={enumAuth.sUserRecover.value}>
						<Button
							disabled={this.state.selectedRows.length === 0}
							type="primary"
							onClick={() => this.handleRecover()}
						>
							恢复
						</Button>
					</T.auth.AuthComponent>
				</MainHeader>
				<div className={T.classNames(styles['main-container'], 'flex-column-grow')}>
					<Table
						loading={this.state.isTableLoading}
						size="small"
						dataSource={this.state.dataSource.map(value => ({
							...value,
							key: value.userId,
						}))}
						bordered
						columns={this.columns}
						pagination={this.pagination}
						rowSelection={this.rowSelection}
					/>
				</div>
			</React.Fragment>
		);
	}
}
