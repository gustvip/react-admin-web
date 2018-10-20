/**
 * Created by joey on 18-9-4
 */
import PropTypes from "prop-types";
import React from "react";
import {Form, Input, Radio, Modal} from "antd";
import prompt from "utils/core/prompt";
import regExpHelper from "utils/core/regexp";
import enumAPI from "constants/enumAPI";
import * as request from "utils/core/request";

import isFunction from "lodash/isFunction";
import {userSex} from "constants/app/common";

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

class UpdateUserInfoModal extends React.PureComponent {
	static propTypes = {
		form: PropTypes.object.isRequired,
		successCallback: PropTypes.func,
		userId: PropTypes.string.isRequired,
		className: PropTypes.string,
		option: PropTypes.object,
	};
	
	componentDidMount() {
		request.get(enumAPI.userDetail, {userId: this.props.userId}).then(info => {
			this.setState({
				userName: info.data.userName,
				userEmail: info.data.userEmail,
				userPhone: info.data.userPhone,
				userSex: info.data.userSex,
				name: info.data.name,
				userDescription: info.data.userDescription,
			});
		}).catch(info => prompt.error(info.msg));
	}
	
	state = {
		showModal: true,
		loading: false,
		userName: "",
		userEmail: "",
		userPhone: "",
		userSex: "",
		name: "",
		userDescription: "",
	};
	
	handleSubmit = () => {
		const self = this;
		self.props.form.validateFields((err, values) => {
			if (!err) {
				self.setState({loading: true}, () => {
					const {userName, userEmail, userPhone, userSex, name, userDescription} = values;
					const userId = self.props.userId;
					
					request.postJSON(enumAPI.userUpdateInfo, {
						userId,
						userName,
						userEmail,
						userPhone,
						userSex,
						name,
						userDescription,
					}).then(() => {
						self.setState({showModal: false}, () => {
							isFunction(self.props.successCallback) && self.props.successCallback();
						});
					}).catch(info => {
						prompt.error(info.msg);
						self.setState({loading: false});
					});
				});
			}
		});
	};
	
	render() {
		const {className = "", option = {}} = this.props;
		const {getFieldDecorator} = this.props.form;
		return (
			<Modal
				okButtonProps={{loading: this.state.loading}}
				onOk={() => this.handleSubmit()}
				onCancel={() => this.setState({showModal: false})}
				okText="确认"
				cancelText="取消"
				closable={false}
				visible={this.state.showModal}
				maskClosable={true}
				destroyOnClose={true}
				classNmae={className}
				{...option}
			>
				<Form
					onSubmit={this.handleSubmit}
				>
					<Form.Item
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator("userName", {
							initialValue: this.state.userName,
							rules: [
								{
									required: true,
									message: "请填写名称",
								},
								{
									pattern: regExpHelper.name(),
									message: "不能有空格。名称可以是数字、字母、下划线的组合(长度大于等于8,小于等于16,且以英文或者下划线开头)",
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
						{getFieldDecorator("userEmail", {
							initialValue: this.state.userEmail,
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
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator("userPhone", {
							initialValue: this.state.userPhone,
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
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator("name", {
							initialValue: this.state.name,
							rules: [
								{
									required: true,
									message: "请填写姓名",
								},
								{
									max: 10,
									message: "姓名长度不能超过10",
								},
							],
						})(<Input placeholder="请填写姓名"/>)}
					</Form.Item>
					<Form.Item
						{...formItemLayout}
					>
						{getFieldDecorator("userSex", {
							initialValue: this.state.userSex,
							rules: [
								{
									required: true,
									message: "请选择性别",
								},
								{
									type: "enum",
									enum: Object.values(userSex).map(value => value.value),
									message: "性别枚举不对",
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
						{getFieldDecorator("userDescription", {
							initialValue: this.state.userDescription,
							rules: [
								{required: false},
								{
									max: 50,
									message: "描述不能超过50字",
								},
							],
						})(
							<Input.TextArea placeholder="请填写描述"/>,
						)}
					</Form.Item>
				</Form>
			</Modal>
		);
	}
}

export default Form.create()(UpdateUserInfoModal);
