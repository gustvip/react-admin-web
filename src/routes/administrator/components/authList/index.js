/**
 * Created by joey on 2018/2/18
 */
import T from 'utils/t';
import {MainHeader} from 'templates/mainLayout';
import UpdateAuthInfoModal from './updateAuthInfoModal';
import {Button, Input, Table, Form, Select} from 'antd';
import enumAuth from 'constants/enumAuth';
import * as webAPI from '../../webAPI/index';
import React from 'react';
import PropTypes from 'prop-types';
import {status} from 'constants/app/common';
import style from '../../scss/authList/index.scss';

import debounce from 'lodash/debounce';

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
	 * 删除一个枚举权限
	 * @param record
	 */
	handleDelete = (record) => {
		const self = this;
		T.prompt.confirm({
			onOk() {
				return webAPI.administratorAuthDelete({authValue: record.value}).then(() => {
					T.prompt.success('删除成功');
					self.getList(self.state.search);
				}).catch(info => T.prompt.error(info.msg));
			},
		});
	};
	
	/**
	 * 恢复一个枚举权限
	 * @param record
	 */
	handleRecover = (record) => {
		const self = this;
		T.prompt.confirm({
			title: '确认恢复吗?',
			onOk() {
				return webAPI.administratorAuthRecover({authValue: record.value}).then(() => {
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
							<Button
								className="base-gap"
								type="primary"
								onClick={() => self.handleDelete(record)}
							>
								删除
							</Button>
							<Button
								className="base-gap"
								type="primary"
								onClick={() => self.handleRecover(record)}
							>
								恢复
							</Button>
						</React.Fragment>
					);
				},
			},
		];
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
	
	render() {
		const {getFieldDecorator} = this.props.form;
		return (
			<React.Fragment>
				<MainHeader
					left={
						<T.AuthComponent auth={enumAuth.serverUserList.value}>
							<Input.Search
								onChange={event => this.setState({search: event.target.value})}
								placeholder="请搜索权限值或者描述"
								onSearch={debounce(() => this.getList(this.state.search), 300)}
							/>
						</T.AuthComponent>
					}
					right={
						<React.Fragment>
							<Button
								className="base-gap"
								loading={this.state.isAdd}
								onClick={this.handleSubmit}
								type="primary"
							>
								添加权限
							</Button>
							<Button
								className="base-gap"
								onClick={() => this.resetFields()}
								type="primary"
							>
								重置表单
							</Button>
						</React.Fragment>
					}
				/>
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
					</Form>
					<Table
						size="middle"
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
