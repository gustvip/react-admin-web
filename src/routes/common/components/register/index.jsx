/**
 * Created by joey on 18-9-4
 */
import React from 'react';
import styles from './register.scss';
import {Form, Input, Button, Radio} from 'antd';
import regExpHelper from 'utils/core/regexp';
import crypto from 'utils/core/crypto';
import PropTypes from 'prop-types';
import enumRouter from 'constants/enumRouter';
import {userSex} from 'constants/app/common';
import prompt from 'utils/core/prompt';
import * as webAPI from '../../webAPI/register';
import auth from 'utils/core/auth';

const RadioGroup = Radio.Group;
const formItemLayout = {
	labelCol: {
		xs: {span: 24},
		sm: {span: 4},
	},
	wrapperCol: {
		xs: {span: 24},
		sm: {span: 24},
	},
};

class RegisterComponent extends React.PureComponent {
	static contextTypes = {
		router: PropTypes.object.isRequired,
	};
	
	state = {
		loading: false,
	};
	
	handleSubmit = (e) => {
		e.preventDefault();
		const self = this;
		self.props.form.validateFields((err, values) => {
			if (!err) {
				self.setState({loading: true}, () => {
					const {userName, userPassword, userEmail, userPhone, userDescription, userSex, name} = values;
					webAPI.userAdd({
						userName,
						userPassword: crypto.hmacSHA512(userPassword, userPassword),
						userEmail,
						userPhone,
						userDescription,
						userSex,
						name,
					}).then(() => {
						prompt.success('正在跳转');
						setTimeout(() => self.context.router.history.push(
							auth.isLogin ? ENV.login.defaultRedirectUrl : enumRouter.login,
						), 1000);
					}).catch(info => {
						prompt.error(info.msg);
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
		const {getFieldDecorator} = this.props.form;
		
		return (
			<div className={styles['main-container']}>
				<Form
					onSubmit={this.handleSubmit}
				>
					<Form.Item
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
					<Form.Item
						{...formItemLayout}
					>
						{getFieldDecorator('userDescription', {
							initialValue: '',
							rules: [
								{required: false},
								{
									max: 50,
									message: '描述不能超过50字',
								},
							],
						})(
							<Input.TextArea placeholder="请填写描述"/>,
						)}
					</Form.Item>
					<Form.Item
					>
						<Button disabled={this.state.loading} loading={this.state.loading} type="primary" htmlType="submit">确认</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}

const RegisterForm = Form.create()(RegisterComponent);
export default RegisterForm;
