/**
 * Created by joey on 18-9-4
 */
import PropTypes from 'prop-types';
import React from 'react';
import { Form, Input, Modal } from 'antd';
import regExpHelper from 'utils/core/regexp';
import crypto from 'utils/core/crypto';
import enumAPI from 'constants/enumAPI';
import * as request from 'utils/core/request';

import { isFunction } from 'lodash';

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

class UpdatePasswordModal extends React.PureComponent {
	static defaultProps = {
		className: '',
		option: {},
	};
	
	static propTypes = {
		className: PropTypes.string,
		failCallback: PropTypes.func,
		form: PropTypes.object.isRequired,
		option: PropTypes.object,
		successCallback: PropTypes.func,
	};
	
	state = {
		showModal: true,
		loading: false,
	};
	
	handleSubmit = () => {
		const self = this;
		self.props.form.validateFields((err, values) => {
			if (!err) {
				self.setState({loading: true}, () => {
					const {oldPassword, newPassword} = values;
					request.postJSON(enumAPI.userUpdatePassword, {
						oldPassword: crypto.md5(oldPassword, oldPassword),
						newPassword: crypto.md5(newPassword, newPassword),
					}).then(() => {
						self.setState({showModal: false}, () => {
							isFunction(self.props.successCallback) && self.props.successCallback();
						});
					}).catch(info => {
						isFunction(self.props.failCallback) && self.props.failCallback(info);
					}).finally(() => self.setState({loading: false}));
				});
			}
		});
	};
	
	handleConfirmPassword = (rule, value, callback) => {
		if (value && value !== this.props.form.getFieldValue('newPassword')) {
			callback('两次输入的密码不一致');
		} else {
			callback();
		}
	};
	
	render () {
		const {className = '', option = {}} = this.props;
		const {getFieldDecorator} = this.props.form;
		return (
			<Modal
				classNmae={className}
				okButtonProps={{loading: this.state.loading}}
				onOk={() => this.handleSubmit()}
				onCancel={() => this.setState({showModal: false})}
				okText="确认"
				cancelText="取消"
				closable={false}
				visible={this.state.showModal}
				maskClosable={true}
				destroyOnClose={true}
				{...option}
			>
				<Form
					onSubmit={this.handleSubmit}
				>
					<Form.Item
						label="原始密码"
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator('oldPassword', {
							rules: [
								{
									required: true,
									message: '请填写原始密码',
								},
								{
									pattern: regExpHelper.password(),
									message: '密码长度大于等6小于等于16。不能有空格。必须是数字、字母、下划线之一',
								},
							],
						})(
							<Input type="password" placeholder="请填写原始密码"/>,
						)}
					</Form.Item>
					<Form.Item
						label="新密码"
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator('newPassword', {
							rules: [
								{
									required: true,
									message: '请填写新密码',
								},
								{
									pattern: regExpHelper.password(),
									message: '密码长度大于等6小于等于16。不能有空格。必须是数字、字母、下划线之一',
								},
							],
						})(
							<Input type="password" placeholder="请填写新密码"/>,
						)}
					</Form.Item>
					<Form.Item
						label="确认密码"
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator('confirmNewPassword', {
							rules: [
								{
									required: true,
									message: '请再次填写新密码',
								},
								{validator: this.handleConfirmPassword},
							],
						})(
							<Input type="password" placeholder="请再次填写新密码"/>,
						)}
					</Form.Item>
				</Form>
			</Modal>
		);
	}
}

export default Form.create()(UpdatePasswordModal);
