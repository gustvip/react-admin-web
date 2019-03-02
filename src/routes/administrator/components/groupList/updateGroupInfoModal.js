/**
 * Created by joey on 18-9-4
 */
import PropTypes from 'prop-types';
import React from 'react';
import { Form, Input, Modal } from 'antd';
import prompt from 'utils/core/prompt';
import * as webAPI from '../../webAPI/groupList';

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

class UpdateGroupInfoModal extends React.PureComponent {
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
			oldGroupValue: props.record.value,
			groupLabel: props.record.label,
		};
	}
	
	handleSubmit = () => {
		const self = this;
		self.props.form.validateFields((err, values) => {
			if (!err) {
				self.setState({loading: true}, () => {
					webAPI.administratorGroupUpdate(values).then(() => {
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
						label="原先组值"
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator('oldGroupValue', {
							initialValue: this.state.oldGroupValue,
							rules: [
								{
									required: true,
									message: '请填写原先组值',
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
							<Input disabled placeholder="请填写原先组值"/>,
						)}
					</Form.Item>
					<Form.Item
						label="组描述"
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator('groupLabel', {
							initialValue: this.state.groupLabel,
							rules: [
								{
									required: true,
									message: '请填写组描述',
								},
								{
									max: 64,
									message: '超过最大长度',
								},
							],
						})(
							<Input placeholder="请填写组描述"/>,
						)}
					</Form.Item>
				</Form>
			</Modal>
		);
	}
}

export default Form.create()(UpdateGroupInfoModal);
