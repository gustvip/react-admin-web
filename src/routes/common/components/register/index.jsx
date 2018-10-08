/**
 * Created by joey on 18-9-4
 */
import React from "react";
import styles from "../../scss/register/index.scss";
import {Form, Input, Button} from "antd";
import regExpHelper from "utils/core/regexp";
import crypto from "utils/core/crypto";
import PropTypes from "prop-types";
import enumRouter from "constants/enumRouter";
import prompt from "utils/core/prompt";
import * as webAPI from "../../webAPI/register/index";
import bg from "../login/img/bg.jpeg";

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
					const {userName, userPassword, userEmail, userPhone} = values;
					webAPI.userAdd({
						userName,
						userPassword: crypto.hmacSHA512(userPassword, userPassword),
						userEmail,
						userPhone,
					}).then(() => {
						prompt.success("注册成功,正在跳转至登陆页面");
						setTimeout(() => {
							self.context.router.history.push(enumRouter.login);
						}, 1000);
					}).catch(info => prompt.error(info.msg));
				});
			}
		});
	};
	
	render() {
		const {getFieldDecorator} = this.props.form;
		
		return (
			<div className={styles["main-container"]}>
				<img src={bg} alt="背景图片"/>
				<Form
					onSubmit={this.handleSubmit}
				>
					<Form.Item
						{...formItemLayout}
					>
						{getFieldDecorator("userName", {
							rules: [
								{
									required: true,
									message: "请填写名称",
								},
								{
									pattern: regExpHelper.name,
									message: "不能有空格。名称可以是数字、字母、中文、下划线的组合(长度大于等于8,小于等于16,且以英文或者下划线开头)",
								},
							],
						})(
							<Input placeholder="请填写名称"/>,
						)}
					</Form.Item>
					<Form.Item
						{...formItemLayout}
					>
						{getFieldDecorator("userPassword", {
							rules: [
								{
									required: true,
									message: "请填密码",
								},
								{
									pattern: regExpHelper.password,
									message: "密码长度大于等6小于等于16。不能有空格。必须是数字、字母、下划线之一",
								},
							],
						})(
							<Input type="password" placeholder="请填写密码"/>,
						)}
					</Form.Item>
					<Form.Item
						{...formItemLayout}
					>
						{getFieldDecorator("userEmail", {
							rules: [
								{
									required: true,
									message: "请填写邮箱",
								},
								{
									pattern: regExpHelper.email,
									message: "邮箱格式不对",
								},
							],
						})(
							<Input placeholder="请填写邮箱"/>,
						)}
					</Form.Item>
					<Form.Item
						{...formItemLayout}
					>
						{getFieldDecorator("userPhone", {
							rules: [
								{
									required: true,
									message: "请填写手机",
								},
								{
									pattern: regExpHelper.telephone,
									message: "手机格式不对",
								},
							],
						})(
							<Input placeholder="请填写手机"/>,
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
