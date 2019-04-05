/**
 * Created by joey on 2018/2/18
 */
import T from 'utils/t';
import UpdateAuthEnumInfoModal from './updateAuthEnumInfoModal';
import MainHeader from 'templates/toolComponents/mainHeader';
import { Button, Input, Table, Form, Radio } from 'antd';
import enumAuth from 'constants/enumAuth';
import enumAPI from 'constants/enumAPI';
import * as webAPI from 'constants/webAPI';
import React from 'react';
import PropTypes from 'prop-types';
import * as enumCommon from 'constants/app/common';
import styles from './authEnum.scss';

const formItemLayout = {
	labelCol: {
		xs: {span: 24},
		sm: {span: 6},
	},
	wrapperCol: {
		xs: {span: 24},
		sm: {span: 18},
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
		
		authValue: '',
		authLabel: '',
		autoAddToAdministrator: enumCommon.autoAddToAdministrator.yes.value,
		autoAddToAdministratorData: Object.values(enumCommon.autoAddToAdministrator),
		isAdd: false,
		isTableLoading: false,
	};
	
	componentDidMount() {
		this.getList(1, this.state.pageSize, this.state.search);
	}
	
	/**
	 * @param {number} currentPage
	 * @param {number} pageSize
	 * @param {string} search
	 * @param {function} [callback]
	 */
	getList = (currentPage, pageSize, search, callback) => {
		this.setState({isTableLoading: true}, () => {
			webAPI.administratorAuthEnumList({
				currentPage,
				pageSize,
				search,
			}).then(info => {
				this.setState({
					currentPage,
					pageSize,
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
	 * 编辑权限枚举
	 * @param record
	 */
	handleEdit = record => {
		T.helper.renderModal(<UpdateAuthEnumInfoModal
			record={record}
			successCallback={() => {
				T.prompt.success('更新成功');
				this.getList(1, this.state.pageSize, this.state.search);
			}}
		/>);
	};
	
	/**
	 * 删除权限枚举
	 * @param{Array<Object>} selectedRows
	 */
	handleDelete = selectedRows => {
		const self = this;
		T.prompt.confirm({
			onOk() {
				return webAPI.administratorAuthEnumDelete({authValue: selectedRows.map(value => value.value)}).then(() => {
					T.prompt.success('删除成功');
					self.getList(1, self.state.pageSize, self.state.search);
				}).catch(info => T.prompt.error(info.msg));
			},
		});
	};
	
	/**
	 * 重置表单信息
	 */
	resetFields = () => this.props.form.resetFields();
	
	get columns() {
		const self = this;
		return [
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
				title: '操作',
				render(test, record) {
					return (
						<React.Fragment>
							<T.auth.AuthComponent auth={enumAuth.sAdministratorAuthEnumUpdate.value}>
								<Button
									className="base-gap"
									type="primary"
									onClick={() => self.handleEdit(record)}
								>
									编辑
								</Button>
							</T.auth.AuthComponent>
						</React.Fragment>
					);
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
				self.getList(currentPage, pageSize, self.state.search);
			},
			onShowSizeChange(currentPage, pageSize) {
				self.getList(1, pageSize, self.state.search);
			},
		};
	}
	
	handleSubmit = e => {
		e.preventDefault();
		const self = this;
		self.props.form.validateFields((err, values) => {
			if (!err) {
				T.prompt.confirm({
					onOk() {
						return self.setState({isAdd: true}, () => {
							webAPI.administratorAuthEnumAdd(values).then(() => {
								T.prompt.success('添加成功');
								self.resetFields();
								self.getList(1, self.state.pageSize, self.state.search);
							}).catch(info => T.prompt.error(info.msg)).finally(() => self.setState({isAdd: false}));
						});
					},
					title: '确认新增权限枚举吗?',
				});
			}
		});
	};
	
	handleDownloadAuth = () => {
		T.request.form(enumAPI.administratorAuthEnumDownload, {method: 'GET'});
	};
	
	render() {
		const {getFieldDecorator} = this.props.form;
		return (
			<React.Fragment>
				<T.auth.AuthComponent auth={enumAuth.sAdministratorAuthEnumDownload.value}>
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
				</T.auth.AuthComponent>
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
										max: 64,
										message: '超过最大长度',
									},
								],
							})(
								<Input placeholder="请填写权限描述"/>,
							)}
						</Form.Item>
						<Form.Item
							label="是否自动加到administrator"
							{...formItemLayout}
						>
							{getFieldDecorator('autoAddToAdministrator', {
								initialValue: this.state.autoAddToAdministrator,
								rules: [
									{
										required: true,
										message: '请选择',
									},
								],
							})(
								<Radio.Group>
									{
										this.state.autoAddToAdministratorData.map(value => <Radio value={value.value} key={value.value}>{value.label}</Radio>)
									}
								</Radio.Group>,
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
							<T.auth.AuthComponent auth={enumAuth.sAdministratorAuthEnumAdd.value}>
								<Button
									htmlType="submit"
									className="base-gap"
									loading={this.state.isAdd}
									type="primary"
								>
									添加权限
								</Button>
							</T.auth.AuthComponent>
						</Form.Item>
					</Form>
				</div>
				<MainHeader
					className={styles['operate-container']}
				>
					<T.auth.AuthComponent auth={enumAuth.sAdministratorAuthEnumList.value}>
						<Input.Search
							onChange={event => this.setState({search: event.target.value})}
							placeholder="请搜索权限值或者描述"
							onSearch={() => this.getList(1, this.state.pageSize, this.state.search)}
						/>
					</T.auth.AuthComponent>
					<T.auth.AuthComponent auth={enumAuth.sAdministratorAuthEnumDelete.value}>
						<Button
							type="primary"
							disabled={this.state.selectedRows.length <= 0}
							onClick={() => this.handleDelete(this.state.selectedRows)}
						>
							删除
						</Button>
					</T.auth.AuthComponent>
				</MainHeader>
				
				<div className={T.classNames(styles['main-container'], 'flex-column-grow')}>
					<Table
						loading={this.state.isTableLoading}
						size="small"
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
