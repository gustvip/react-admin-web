/**
 * Created by joey on 2018/2/18
 */
import T from 'utils/t';
import UpdateAuthInfoModal from './updateAuthInfoModal';
import MainHeader from 'templates/toolComponents/mainHeader';
import { Button, Input, Table, Form } from 'antd';
import enumAuth from 'constants/enumAuth';
import enumAPI from 'constants/enumAPI';
import * as webAPI from '../../webAPI/authEnum';
import React from 'react';
import PropTypes from 'prop-types';
import * as enumCommon from 'constants/app/common';
import styles from './authList.scss';

const {AuthComponent} = T;
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

class AuthEnum extends React.PureComponent {
	static contextTypes = {
		router: PropTypes.object.isRequired,
	};
	
	state = {
		currentPage: 1,
		pageSize: enumCommon.pagination.pageSize,
		count: enumCommon.pagination.pageSize,
		totalPages: 1,
		selectedRowKeys: [],
		selectedRows: [],
		dataSource: [],
		search: '',
		status: undefined,
		statusValue: Object.values(enumCommon.status).
			map(value => ({
				value: value.value,
				label: value.label,
			})),
		authValue: '',
		authLabel: '',
		isAdd: false,
		isTableLoading: false,
	};
	
	componentDidMount () {
		this.getList(1, this.state.pageSize, this.state.search, this.state.status);
	}
	
	/**
	 * @param {number} currentPage
	 * @param {number} pageSize
	 * @param {string} search
	 * @param {string | null | undefined} status
	 * @param {function} [callback]
	 */
	getList = (currentPage, pageSize, search, status, callback) => {
		this.setState({isTableLoading: true}, () => {
			webAPI.administratorAuthEnumList({
				currentPage,
				pageSize,
				search,
				status,
			}).then(info => {
				this.setState({
					currentPage,
					pageSize,
					status,
					count: info.data.count,
					selectedRowKeys: [],
					selectedRows: [],
					search,
					dataSource: info.data.data,
				}, () => {
					this.resetFields();
					callback && callback(info.data);
				});
			}).catch(info => T.prompt.error(info.msg)).finally(() => this.setState({isTableLoading: false}));
			
		});
	};
	
	/**
	 * 编辑一个枚举权限
	 * @param record
	 */
	handleEdit = (record) => {
		T.helper.renderModal(<UpdateAuthInfoModal
			record={record}
			successCallback={() => {
				T.prompt.success('更新成功');
				this.getList(1, this.state.pageSize, this.state.search, this.state.status);
			}}
		/>);
	};
	
	/**
	 * 删除枚举权限
	 * @param{Array<Object>} selectedRows
	 */
	handleDelete = (selectedRows) => {
		const self = this;
		T.prompt.confirm({
			onOk () {
				return webAPI.administratorAuthEnumDelete({authValue: selectedRows.map(value => value.value)}).then(() => {
					T.prompt.success('删除成功');
					self.getList(1, self.state.pageSize, self.state.search, self.state.status);
				}).catch(info => T.prompt.error(info.msg));
			},
		});
	};
	
	/**
	 * 重置表单信息
	 */
	resetFields = () => this.props.form.resetFields();
	
	get columns () {
		const self = this;
		return [
			{
				title: 'value',
				dataIndex: 'value',
				sorter (prev, now) {
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
				sorter (prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'label',
					});
				},
			},
			{
				title: '操作',
				render (test, record) {
					return (
						<React.Fragment>
							<AuthComponent auth={enumAuth.sAdministratorAuthUpdate.value}>
								<Button
									className="base-gap"
									type="primary"
									onClick={() => self.handleEdit(record)}
								>
									编辑
								</Button>
							</AuthComponent>
						</React.Fragment>
					);
				},
			},
		];
	}
	
	get rowSelection () {
		const self = this;
		return {
			selectedRowKeys: self.state.selectedRowKeys,
			onChange (selectedRowKeys, selectedRows) {
				self.setState({
					selectedRowKeys,
					selectedRows,
				});
			},
		};
	}
	
	get pagination () {
		const self = this;
		return {
			pageSizeOptions: enumCommon.pagination.pageSizeOptions,
			showSizeChanger: true,
			current: self.state.currentPage,
			total: self.state.count,
			pageSize: self.state.pageSize,
			showQuickJumper: enumCommon.pagination.showQuickJumper,
			onChange (currentPage, pageSize) {
				self.getList(currentPage, pageSize, self.state.search, self.state.status);
			},
			onShowSizeChange (currentPage, pageSize) {
				self.getList(1, pageSize, self.state.search, self.state.status);
			},
		};
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		const self = this;
		self.props.form.validateFields((err, values) => {
			if (!err) {
				self.setState({isAdd: true}, () => {
					webAPI.administratorAuthEnumAdd(values).then(() => {
						T.prompt.success('添加成功');
						this.resetFields();
						this.getList(1, this.state.pageSize, this.state.search, this.state.status);
					}).catch(info => T.prompt.error(info.msg)).finally(() => this.setState({isAdd: false}));
				});
			}
		});
	};
	
	handleDownloadAuth = () => {
		T.request.form(enumAPI.administratorAuthEnumDownload, {method: 'GET'});
	};
	
	render () {
		const {getFieldDecorator} = this.props.form;
		return (
			<React.Fragment>
				<AuthComponent auth={enumAuth.sAdministratorAuthDownload.value}>
					<MainHeader
					>
						<React.Fragment>
							<Button
								className="base-gap"
								onClick={() => this.handleDownloadAuth()}
								type="primary"
							>
								下载权限
							</Button>
						</React.Fragment>
					</MainHeader>
				</AuthComponent>
				<div className={styles['form-container']}>
					<Form
						onSubmit={this.handleSubmit}
					>
						<Form.Item
							label="权限枚举值"
							hasFeedback
							{...formItemLayout}
						>
							{getFieldDecorator('authValue', {
								initialValue: this.state.authValue,
								rules: [
									{
										required: true,
										message: '请填写权限枚举值',
									},
									{
										whitespace: true,
										message: '不允许有空格',
									},
									{
										max: 64,
										message: '超过最大长度',
									},
								],
							})(
								<Input placeholder="请填写权限枚举值"/>,
							)}
						</Form.Item>
						<Form.Item
							label="权限描述"
							hasFeedback
							{...formItemLayout}
						>
							{getFieldDecorator('authLabel', {
								initialValue: this.state.authLabel,
								rules: [
									{
										required: true,
										message: '请填写权限描述',
									},
									{
										max: 32,
										message: '超过最大长度',
									},
								],
							})(
								<Input placeholder="请填写权限描述"/>,
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
							<AuthComponent auth={enumAuth.sAdministratorAuthAdd.value}>
								<Button
									htmlType="submit"
									className="base-gap"
									loading={this.state.isAdd}
									type="primary"
								>
									添加权限
								</Button>
							</AuthComponent>
						</Form.Item>
					</Form>
				</div>
				<MainHeader
					className={styles['operate-container']}
				>
					<AuthComponent auth={enumAuth.sAdministratorAuthList.value}>
						<Input.Search
							onChange={event => this.setState({search: event.target.value})}
							placeholder="请搜索权限值或者描述"
							onSearch={() => this.getList(1, this.state.pageSize, this.state.search, this.state.status)}
						/>
					</AuthComponent>
					<AuthComponent auth={enumAuth.sAdministratorAuthDelete.value}>
						<Button
							type="primary"
							disabled={this.state.selectedRows.length <= 0}
							onClick={() => this.handleDelete(this.state.selectedRows)}
						>
							删除
						</Button>
					</AuthComponent>
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

export default Form.create()(AuthEnum);
