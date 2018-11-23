/**
 * Created by joey on 2018/2/18
 */
import T from 'utils/t';
import {MainHeader} from 'templates/mainLayout';
import UpdateAuthInfoModal from './updateAuthInfoModal';
import {Button, Input, Table, Form} from 'antd';
import enumAuth from 'constants/enumAuth';
import enumAPI from 'constants/enumAPI';
import * as webAPI from '../../webAPI/index';
import React from 'react';
import PropTypes from 'prop-types';
import {status} from 'constants/app/common';
import style from '../../scss/authList/index.scss';

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
		selectedRowKeys: [],
		selectedRows: [],
		dataSource: [],
		search: '',
		authValue: '',
		authLabel: '',
		isAdd: false,
	};
	
	componentDidMount() {
		this.getList(this.state.search);
	}
	
	/**
	 * @param {string} search
	 * @param {function} [callback]
	 */
	getList = (search, callback) => {
		webAPI.administratorAuthList({search}).then(info => {
			this.setState({
				selectedRowKeys: [],
				selectedRows: [],
				search,
				dataSource: info.data,
			}, () => {
				this.resetFields();
				callback && callback();
			});
		}).catch(info => T.prompt.error(info.msg));
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
				this.getList(this.state.search);
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
			onOk() {
				return webAPI.administratorAuthDelete({authValue: selectedRows.map(value => value.value)}).then(() => {
					T.prompt.success('删除成功');
					self.getList(self.state.search);
				}).catch(info => T.prompt.error(info.msg));
			},
		});
	};
	
	/**
	 * 恢复枚举权限
	 * @param {Array<Object>} selectedRows
	 */
	handleRecover = (selectedRows) => {
		const self = this;
		T.prompt.confirm({
			title: '确认恢复吗?',
			onOk() {
				return webAPI.administratorAuthRecover({authValue: selectedRows.map(value => value.value)}).then(() => {
					T.prompt.success('恢复成功');
					self.getList(self.state.search);
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
				title: 'status',
				dataIndex: 'status',
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'status',
					});
				},
				render(text) {
					return Object.values(status).find(value => value.value === text).label;
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
			{
				title: '操作',
				render(test, record) {
					return (
						<React.Fragment>
							<Button
								className="base-gap"
								type="primary"
								onClick={() => self.handleEdit(record)}
							>
								编辑
							</Button>
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
	
	handleSubmit = (e) => {
		e.preventDefault();
		const self = this;
		self.props.form.validateFields((err, values) => {
			if (!err) {
				self.setState({isAdd: true}, () => {
					webAPI.administratorAuthAdd(values).then(() => {
						T.prompt.success('添加成功');
						this.setState({isAdd: false}, () => this.getList(this.state.search));
						this.resetFields();
					}).catch(info => {
						this.setState({isAdd: false});
						T.prompt.error(info.msg);
					});
				});
			}
		});
	};
	
	handleDownloadAuth = () => {
		window.open(enumAPI.administratorAuthDownload);
	};
	
	render() {
		const {getFieldDecorator} = this.props.form;
		return (
			<React.Fragment>
				<div className={style['main-container']}>
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
								添加权限
							</Button>
						</Form.Item>
						<div
							className={style['operate-container']}
						>
							<Input.Search
								onChange={event => this.setState({search: event.target.value})}
								placeholder="请搜索权限值或者描述"
								onSearch={() => this.getList(this.state.search)}
							/>
							<Button
								type="primary"
								disabled={this.state.selectedRows.length <= 0}
								onClick={() => this.handleDelete(this.state.selectedRows)}
							>
								删除
							</Button>
							<Button
								type="primary"
								disabled={this.state.selectedRows.length <= 0}
								onClick={() => this.handleRecover(this.state.selectedRows)}
							>
								恢复
							</Button>
							
							<Button
								className="base-gap"
								onClick={() => this.handleDownloadAuth()}
								type="primary"
							>
								下载权限
							</Button>
						</div>
					</Form>
					<Table
						size="middle"
						rowSelection={this.rowSelection}
						dataSource={this.state.dataSource.map(value => ({
							...value,
							key: value.value,
						}))}
						bordered
						columns={this.columns}
						pagination={false}
					/>
				</div>
			</React.Fragment>
		);
	}
}

export default Form.create()(List);
