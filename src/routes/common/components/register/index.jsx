/**
 * Created by joey on 18-9-4
 */
import React from 'react';
import { Form, Input, Button } from 'antd';
import regExpHelper from 'utils/core/regexp';
import * as  webAPI from '../../webAPI';
import crypto from 'utils/core/crypto';
import PropTypes from 'prop-types';
import enumRouter from 'constants/enumRouter';
import T from 'utils/t';

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

class RegisterComponent extends React.PureComponent {
	static contextTypes = {
		router: PropTypes.object.isRequired,
	};
	
	handleSubmit = (e) => {
		e.preventDefault();
		const _this = this;
		_this.props.form.validateFields((err, values) => {
			if (!err) {
				const {user_name, user_password, user_email, user_phone} = values;
				webAPI.userAdd({
					user_name,
					user_password: crypto.hmacSHA512(user_password, user_password),
					user_email,
					user_phone,
				}).then(() => {
					T.prompt.success('注册成功,正在跳转至登陆页面');
					setTimeout(() => {
						_this.context.router.history.push(enumRouter.login);
					}, 1000);
				}).catch(info => T.prompt.error(info.msg));
			}
		});
	};
	
	render () {
		const {getFieldDecorator} = this.props.form;
		
		return (
			<Form
				onSubmit={this.handleSubmit}
			>
				<Form.Item
					{...formItemLayout}
					label="用户名"
				>
					{getFieldDecorator('user_name', {
						rules: [
							{required: true, message: '请填写名称'},
							{pattern: regExpHelper.name, message: '不能有空格。名称可以是数字、字母、中文、下划线的组合(长度大于等于8,小于等于16,且以英文或者下划线开头)'},
						],
					})(
						<Input placeholder="请填写用户名"/>,
					)}
				</Form.Item>
				<Form.Item
					{...formItemLayout}
					label="密码"
				>
					{getFieldDecorator('user_password', {
						rules: [
							{required: true, message: '请填密码'},
							{pattern: regExpHelper.password, message: '密码长度大于等6小于等于16。不能有空格。必须是数字、字母、下划线之一'},
						],
					})(
						<Input type="password" placeholder="请填写密码"/>,
					)}
				</Form.Item>
				<Form.Item
					{...formItemLayout}
					label="邮箱"
				>
					{getFieldDecorator('user_email', {
						rules: [
							{required: true, message: '请填写邮箱'},
							{pattern: regExpHelper.email, message: '邮箱格式不对'},
						],
					})(
						<Input placeholder="请填写邮箱"/>,
					)}
				</Form.Item>
				<Form.Item
					{...formItemLayout}
					label="手机"
				>
					{getFieldDecorator('user_phone', {
						rules: [
							{required: true, message: '请填写手机'},
							{pattern: regExpHelper.telephone, message: '手机格式不对'},
						],
					})(
						<Input placeholder="请填写手机"/>,
					)}
				</Form.Item>
				<Form.Item
					wrapperCol={{span: 24, offset: 10}}
				>
					<Button type="primary" htmlType="submit">确认</Button>
				</Form.Item>
			</Form>
		);
	}
}

const RegisterForm = Form.create()(RegisterComponent);
export default RegisterForm;
