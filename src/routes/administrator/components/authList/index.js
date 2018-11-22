/**
 * Created by joey on 2018/2/18
 */
import T from 'utils/t';
import enumAPI from 'constants/enumAPI';
import {MainHeader} from 'templates/mainLayout';
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
		authParent: null,
		isAdd: false,
	};
	
	componentDidMount() {
		this.getList(this.state.search);
	}
	
	getList = (search) => {
		webAPI.administratorAuthList({search}).then(info => {
			this.setState({
				search,
				dataSource: info.data,
			});
		}).catch(info => T.prompt.error(info.msg));
	};
	
	get columns() {
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
				title: 'authParent',
				dataIndex: 'authParent',
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'authParent',
					});
				},
			},
			{
				title: 'level',
				dataIndex: 'level',
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'level',
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
						this.props.form.resetFields();
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
								placeholder="请搜索"
								onSearch={debounce(() => this.getList(this.state.search), 300)}
							/>
						</T.AuthComponent>
					}
					right={
						<Button
							loading={this.state.isAdd}
							onClick={this.handleSubmit}
							type="primary"
						>
							添加
						</Button>
					}
				/>
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
						label="权限父级"
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator('authParent', {
							initialValue: this.state.authParent,
							rules: [{required: false}],
						})(
							<Select placeholder="请选择权限父级">
								{
									this.state.dataSource.map(value => {
										return <Option key={value.value} value={value.value}>{value.value}</Option>;
									})
								}
							</Select>,
						)}
					</Form.Item>
				</Form>
				<div className={style['main-container']}>
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
