/**
 * Created by joey on 18-9-4
 */
import React from 'react';
import { Form, Input, Button } from 'antd';
import regExpHelper from 'utils/core/regexp';

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
	
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
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
							{pattern: regExpHelper.name, message: '名称长度大于等8小于等于16。不能有空格。必须是数字、字母、中文、下划线之一'},
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
					wrapperCol={{span: 12, offset: 6}}
				>
					<Button type="primary" htmlType="submit">确认</Button>
				</Form.Item>
			</Form>
		);
	}
}

const RegisterForm = Form.create()(RegisterComponent);
export default RegisterForm;
