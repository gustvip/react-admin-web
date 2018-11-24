/**
 * Created by joey on 2018/2/18
 */
import T from 'utils/t';
import MainHeader from 'templates/toolComponents/mainHeader';
import {Button, Input, Table, Form, Select} from 'antd';
import enumAuth from 'constants/enumAuth';
import * as webAPI from '../../webAPI/index';
import React from 'react';
import PropTypes from 'prop-types';
import {status, pagination} from 'constants/app/common';
import styles from '../../scss/groupList/index.scss';

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
		pageSize: pagination.pageSize,
		count: 10,
		totalPages: 1,
		selectedRowKeys: [],
		selectedRows: [],
		dataSource: [],
		search: '',
		
		group: '1',
		role: '3',
		isAdd: false,
		isTableLoading: false,
	};
	
	componentDidMount() {
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
		this.setState({isTableLoading: true}, () => {
			webAPI.administratorGroupList({
				currentPage,
				pageSize,
				search,
				group,
				role,
			}).then(info => {
				this.setState({
					isTableLoading: false,
					currentPage,
					pageSize,
					group,
					role,
					count: info.data.count,
					selectedRowKeys: [],
					selectedRows: [],
					search,
					dataSource: info.data.data,
				}, () => {
					this.resetFields();
					callback && callback(info.data);
				});
			}).catch(info => {
				this.setState({isTableLoading: false});
				T.prompt.error(info.msg);
			});
			
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
				return webAPI.administratorGroupDelete({id: selectedRows.map(value => value.groupId)}).then(() => {
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
			pageSizeOptions: pagination.pageSizeOptions,
			showSizeChanger: true,
			current: self.state.currentPage,
			total: self.state.count,
			pageSize: self.state.pageSize,
			showQuickJumper: pagination.showQuickJumper,
			onChange(currentPage, pageSize) {
				self.getList(1, pageSize, self.state.search, self.state.group, self.state.role);
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
			console.log(values);
			if (!err) {
				self.setState({isAdd: true}, () => {
					webAPI.administratorAuthAdd(values).then(() => {
						T.prompt.success('添加成功');
						this.setState({isAdd: false}, () => this.getList(1, this.state.pageSize, this.state.search, this.state.group, this.state.role));
						this.resetFields();
					}).catch(info => {
						this.setState({isAdd: false});
						T.prompt.error(info.msg);
					});
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
									placeholder="请选择分组"
								>
									{
										Object.values(status).map((value => {
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
									placeholder="请选择角色"
								>
									{
										Object.values(status).map((value => {
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
								initialValue: undefined,
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
									mode="tags"
									placeholder="请选择权限值"
								>
									{
										Object.values(status).map((value => {
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
