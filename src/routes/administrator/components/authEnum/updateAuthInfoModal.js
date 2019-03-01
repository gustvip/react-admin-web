/**
 * Created by joey on 18-9-4
 */
import PropTypes from 'prop-types';
import React from 'react';
import { Form, Input, Modal } from 'antd';
import prompt from 'utils/core/prompt';
import enumAuth from 'constants/enumAuth';
import * as webAPI from '../../webAPI/authEnum';

import { isFunction } from 'lodash';

const formItemLayout = {
	labelCol: {
		xs: {span: 24},
		sm: {span: 6},
	},
	wrapperCol: {
		xs: {span: 24},
		sm: {span: 18},
	},
};

class UpdateAuthInfoModal extends React.PureComponent {
	static propTypes = {
		form: PropTypes.object.isRequired,
		successCallback: PropTypes.func,
		record: PropTypes.object.isRequired,
		className: PropTypes.string,
		option: PropTypes.object,
	};
	
	constructor (props) {
		super();
		this.state = {
			showModal: true,
			loading: false,
			oldAuthValue: props.record.value,
			newAuthValue: props.record.value,
			authLabel: props.record.label,
		};
	}
	
	handleSubmit = () => {
		const self = this;
		self.props.form.validateFields((err, values) => {
			if (!err) {
				self.setState({loading: true}, () => {
					webAPI.administratorAuthEnumUpdate(values).then(() => {
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
	
	render () {
		const {className = '', option = {}} = this.props;
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
						label="原先权限枚举值"
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator('oldAuthValue', {
							initialValue: this.state.oldAuthValue,
							rules: [
								{
									required: true,
									message: '请填写原先权限枚举值',
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
							<Input disabled placeholder="请填写原先权限枚举值"/>,
						)}
					</Form.Item>
					<Form.Item
						label="新的权限枚举值"
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator('newAuthValue', {
							initialValue: this.state.newAuthValue,
							rules: [
								{
									required: true,
									message: '请填写新的权限枚举值',
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
							<Input placeholder="请填写新的权限枚举值"/>,
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
			</Modal>
		);
	}
}

export default Form.create()(UpdateAuthInfoModal);
