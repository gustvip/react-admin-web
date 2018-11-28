/**
 * Created by joey on 18-9-4
 */
import React from 'react';
import {Form, Input, Button, Radio, Modal} from 'antd';
import regExpHelper from 'utils/core/regexp';
import crypto from 'utils/core/crypto';
import PropTypes from 'prop-types';
import {userSex} from 'constants/app/common';
import enumAPI from 'constants/enumAPI';
import * as request from 'utils/core/request';

import isFunction from 'lodash/isFunction';

const RadioGroup = Radio.Group;
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

class AddUserModal extends React.PureComponent {
	static propTypes = {
		form: PropTypes.object.isRequired,
		successCallback: PropTypes.func,
		failCallback: PropTypes.func,
		className: PropTypes.string,
		option: PropTypes.object,
	};
	
	state = {
		showModal: true,
		loading: false,
	};
	
	handleSubmit = (e) => {
		e.preventDefault();
		const self = this;
		self.props.form.validateFields((err, values) => {
			if (!err) {
				self.setState({loading: true}, () => {
					const {userName, userPassword, userEmail, userPhone, userDescription, userSex, name} = values;
					request.postJSON(enumAPI.userAdd, {
						userName,
						userPassword: crypto.hmacSHA512(userPassword, userPassword),
						userEmail,
						userPhone,
						userDescription,
						userSex,
						name,
					}).then(() => {
						self.setState({showModal: false}, () => {
							isFunction(self.props.successCallback) && self.props.successCallback();
						});
					}).catch(info => {
						isFunction(self.props.successCallback) && self.props.successCallback(info);
						self.setState({loading: false});
					});
				});
			}
		});
	};
	
	handleConfirmPassword = (rule, value, callback) => {
		if (value && value !== this.props.form.getFieldValue('userPassword')) {
			callback('两次输入的密码不一致');
		} else {
			callback();
		}
	};
	
	render() {
		const {className = '', option = {}} = this.props;
		const {getFieldDecorator} = this.props.form;
		return (
			<Modal
				title="新增用户"
				classNmae={className}
				okButtonProps={{loading: this.state.loading}}
				onOk={this.handleSubmit}
				onCancel={() => this.setState({showModal: false})}
				okText="确认"
				cancelText="取消"
				closable={true}
				visible={this.state.showModal}
				maskClosable={false}
				destroyOnClose={true}
				{...option}
			>
				<Form
					onSubmit={this.handleSubmit}
				>
					<Form.Item
						label="名称"
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator('userName', {
							rules: [
								{
									required: true,
									message: '请填写名称',
								},
								{
									pattern: regExpHelper.name(),
									message: '不能有空格。名称可以是数字、字母、下划线的组合(长度大于等于8,小于等于16,且以英文或者下划线开头)',
								},
							],
						})(
							<Input placeholder="请填写名称"/>,
						)}
					</Form.Item>
					<Form.Item
						label="密码"
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator('userPassword', {
							rules: [
								{
									required: true,
									message: '请填密码',
								},
								{
									pattern: regExpHelper.password(),
									message: '密码长度大于等6小于等于16。不能有空格。必须是数字、字母、下划线之一',
								},
							],
						})(
							<Input type="password" placeholder="请填写密码"/>,
						)}
					</Form.Item>
					<Form.Item
						label="密码"
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator('confirmPassword', {
							rules: [
								{
									required: true,
									message: '请再次填写密码',
								},
								{validator: this.handleConfirmPassword},
							],
						})(
							<Input type="password" placeholder="请再次填写密码"/>,
						)}
					</Form.Item>
					<Form.Item
						label="邮箱"
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator('userEmail', {
							rules: [
								{
									required: true,
									message: '请填写邮箱',
								},
								{
									pattern: regExpHelper.email,
									message: '邮箱格式不对',
								},
							],
						})(
							<Input placeholder="请填写邮箱"/>,
						)}
					</Form.Item>
					<Form.Item
						label="手机"
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator('userPhone', {
							rules: [
								{
									required: true,
									message: '请填写手机',
								},
								{
									pattern: regExpHelper.telephone,
									message: '手机格式不对',
								},
							],
						})(
							<Input placeholder="请填写手机"/>,
						)}
					</Form.Item>
					<Form.Item
						label="姓名"
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator('name', {
							rules: [
								{
									required: true,
									message: '请填写姓名',
								},
								{
									max: 10,
									message: '姓名长度不能超过10',
								},
							],
						})(<Input placeholder="请填写姓名"/>)}
					</Form.Item>
					<Form.Item
						label="性别"
						{...formItemLayout}
					>
						{getFieldDecorator('userSex', {
							initialValue: userSex.secret.value,
							rules: [
								{
									required: true,
									message: '请选择性别',
								},
								{
									type: 'enum',
									enum: Object.values(userSex).map(value => value.value),
									message: '性别枚举不对',
								},
							],
						})(
							<RadioGroup>
								{
									Object.values(userSex).map(value => {
										return <Radio key={value.value} value={value.value}>{value.label}</Radio>;
									})
								}
							</RadioGroup>,
						)}
					</Form.Item>
				</Form>
			</Modal>
		);
	}
}

export default Form.create()(AddUserModal);
