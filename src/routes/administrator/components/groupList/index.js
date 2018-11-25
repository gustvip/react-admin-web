/**
 * Created by joey on 2018/2/18
 */
import T from 'utils/t';
import MainHeader from 'templates/toolComponents/mainHeader';
import {Button, Input, Table, Form, Select} from 'antd';
import enumAuth from 'constants/enumAuth';
import * as webAPI from '../../webAPI/groupList';
import React from 'react';
import PropTypes from 'prop-types';
import * as enumCommon from 'constants/app/common';
import styles from './groupList.scss';

const Option = Select.Option;
const formItemLayout = {
	labelCol: {
		xs: {span: 24},
		sm: {span: 4},
	},
	wrapperCol: {
		xs: {span: 24},
		sm: {span: 20},
	},
};

class List extends React.PureComponent {
	static contextTypes = {
		router: PropTypes.object.isRequired,
	};
	
	state = {
		currentPage: 1,
		pageSize: enumCommon.pagination.pageSize,
		count: 10,
		totalPages: 1,
		selectedRowKeys: [],
		selectedRows: [],
		dataSource: [],
		search: '',
		
		authValueData: [],
		groupData: Object.values(enumCommon.group).
			map(value => ({
				value: value.value,
				label: value.label,
			})),
		group: enumCommon.group.administrator.value,
		roleData: Object.values(enumCommon.role).
			map(value => ({
				value: value.value,
				label: value.label,
			})),
		role: enumCommon.role.root.value,
		isAdd: false,
		isTableLoading: false,
	};
	
	componentDidMount() {
		webAPI.administratorAuthList().then(info => {
			this.setState({
				authValueData: info.data.map(value => ({
					value: value.value,
					label: value.label,
				})),
			});
		}).catch(info => T.prompt.error(info.msg));
		this.getList(1, this.state.pageSize, this.state.search, this.state.group, this.state.role);
	}
	
	/**
	 * @param {number} currentPage
	 * @param {number} pageSize
	 * @param {string} search
	 * @param {string | null | undefined} group
	 * @param {string | null | undefined} role
	 * @param {function} [callback]
	 */
	getList = (currentPage, pageSize, search, group, role, callback) => {
		if (group && role) {
			this.setState({isTableLoading: true}, () => {
				webAPI.administratorGroupList({
					search,
					group,
					role,
				}).then(info => {
					this.setState({
						authValue: info.data.map(value => value.value),
						currentPage,
						pageSize,
						group,
						role,
						count: info.data.length,
						selectedRowKeys: [],
						selectedRows: [],
						search,
						dataSource: info.data,
					}, () => {
						this.resetFields();
						callback && callback(info.data);
					});
				}).catch(info => T.prompt.error(info.msg)).finally(() => this.setState({isTableLoading: false}));
			});
		}
	};
	
	/**
	 * 组变化
	 * @param {string | undefined} group
	 */
	handleGroupChange = (group) => {
		let roleData = [];
		const hasData = Object.values(enumCommon.group).find(value => value.value === group);
		if (hasData) {
			roleData = hasData.children.map(value => ({
				value: value.value,
				label: value.label,
			}));
		}
		this.setState({
			authValue: [],
			roleData,
			group,
			role: undefined,
			
			currentPage: 1,
			selectedRowKeys: [],
			selectedRows: [],
			search: '',
			dataSource: [],
		}, () => {
			this.resetFields();
			this.getList(1, this.state.pageSize, this.state.search, this.state.group, this.state.role);
		});
	};
	
	/**
	 * 角色变化
	 * @param {string | undefined} role
	 */
	handleRoleChange = (role) => {
		this.setState({
			role,
			authValue: [],
			
			currentPage: 1,
			selectedRowKeys: [],
			selectedRows: [],
			search: '',
			dataSource: [],
		}, () => {
			this.getList(1, this.state.pageSize, this.state.search, this.state.group, this.state.role);
		});
	};
	
	/**
	 * 删除权限
	 * @param{Array<Object>} selectedRows
	 */
	handleDelete = (selectedRows) => {
		const self = this;
		T.prompt.confirm({
			onOk() {
				return webAPI.administratorGroupDelete({
					authValue: selectedRows.map(value => value.value),
					group: self.state.group,
					role: self.state.role,
				}).then(() => {
					T.prompt.success('删除成功');
					self.getList(1, self.state.pageSize, self.state.search, self.state.group, self.state.role);
				}).catch(info => T.prompt.error(info.msg));
			},
		});
	};
	
	/**
	 * 重置表单信息
	 */
	resetFields = () => this.props.form.resetFields();
	
	get columns() {
		return [
			{
				title: 'group',
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
				title: 'role',
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
				title: 'value',
				dataIndex: 'value',
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'value',
					});
				},
			},
			{
				title: 'label',
				dataIndex: 'label',
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'label',
					});
				},
			},
			{
				title: 'createdAt',
				dataIndex: 'createdAt',
				render: val => new Date(val).toLocaleString(),
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'createdAt',
					});
				},
			},
			{
				title: 'updatedAt',
				dataIndex: 'updatedAt',
				render: val => new Date(val).toLocaleString(),
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'updatedAt',
					});
				},
			},
		];
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
				self.getList(currentPage, pageSize, self.state.search, self.state.group, self.state.role);
			},
			onShowSizeChange(currentPage, pageSize) {
				self.getList(1, pageSize, self.state.search, self.state.group, self.state.role);
			},
		};
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		const self = this;
		self.props.form.validateFields((err, values) => {
			if (!err) {
				self.setState({isAdd: true}, () => {
					webAPI.administratorGroupDistribute(values).then(() => {
						T.prompt.success('分配成功');
						this.getList(1, this.state.pageSize, this.state.search, this.state.group, this.state.role);
					}).catch(info => T.prompt.error(info.msg)).finally(() => this.setState({isAdd: false}));
				});
			}
		});
	};
	
	render() {
		const {getFieldDecorator} = this.props.form;
		return (
			<React.Fragment>
				<div className={styles['form-container']}>
					<Form
						onSubmit={this.handleSubmit}
					>
						<Form.Item
							label="组"
							hasFeedback
							{...formItemLayout}
						>
							{getFieldDecorator('group', {
								initialValue: this.state.group,
								rules: [
									{
										required: true,
										message: '请选择分组',
									},
								],
							})(
								<Select
									onChange={group => this.handleGroupChange(group)}
									placeholder="请选择分组"
								>
									{
										this.state.groupData.map((value => {
											return <Option key={value.value}>{value.label}</Option>;
										}))
									}
								</Select>,
							)}
						</Form.Item>
						<Form.Item
							label="角色"
							hasFeedback
							{...formItemLayout}
						>
							{getFieldDecorator('role', {
								initialValue: this.state.role,
								rules: [
									{
										required: true,
										message: '请选择角色',
									},
								],
							})(
								<Select
									onChange={role => this.handleRoleChange(role)}
									placeholder="请选择角色"
								>
									{
										this.state.roleData.map((value => {
											return <Option key={value.value}>{value.label}</Option>;
										}))
									}
								</Select>,
							)}
						</Form.Item>
						<Form.Item
							label="权限值"
							hasFeedback
							{...formItemLayout}
						>
							{getFieldDecorator('authValue', {
								initialValue: this.state.authValue,
								rules: [
									{
										required: true,
										message: '请选择权限值',
									},
								],
							})(
								<Select
									showSearch
									allowClear
									mode="multiple"
									placeholder="请选择权限值"
								>
									{
										this.state.authValueData.map((value => {
											return <Option key={value.value}>{value.label}</Option>;
										}))
									}
								</Select>,
							)}
						</Form.Item>
						<Form.Item
							style={{textAlign: 'center'}}
						>
							<Button
								onClick={() => this.resetFields()}
								htmlType="reset"
								className="base-gap"
								type="primary"
							>
								重置表单
							</Button>
							<Button
								htmlType="submit"
								className="base-gap"
								loading={this.state.isAdd}
								type="primary"
							>
								分配权限
							</Button>
						</Form.Item>
					</Form>
				</div>
				<MainHeader
					className={styles['operate-container']}
				>
					<Input.Search
						value={this.state.search}
						onChange={event => this.setState({search: event.target.value})}
						placeholder="请搜索权限值"
						onSearch={() => this.getList(1, this.state.pageSize, this.state.search, this.state.group, this.state.role)}
					/>
					<Button
						type="primary"
						disabled={this.state.selectedRows.length <= 0}
						onClick={() => this.handleDelete(this.state.selectedRows)}
					>
						删除
					</Button>
				</MainHeader>
				
				<div className={T.classNames(styles['main-container'], 'flex-column-grow')}>
					<Table
						loading={this.state.isTableLoading}
						size="middle"
						rowSelection={this.rowSelection}
						dataSource={this.state.dataSource.map(value => ({
							...value,
							key: value.value,
						}))}
						bordered
						columns={this.columns}
						pagination={this.pagination}
					/>
				</div>
			</React.Fragment>
		);
	}
}

export default Form.create()(List);
