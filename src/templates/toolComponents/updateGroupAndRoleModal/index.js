/**
 * Created by joey on 18-9-4
 */
import PropTypes from 'prop-types';
import React from 'react';
import { Form, Modal, Select } from 'antd';
import auth from 'utils/core/auth';
import enumAPI from 'constants/enumAPI';
import * as request from 'utils/core/request';
import * as enumCommon from 'constants/app/common';

import { isFunction } from 'lodash';

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

class UpdateGroupAndRoleModal extends React.PureComponent {
	static propTypes = {
		form: PropTypes.object.isRequired,
		successCallback: PropTypes.func,
		failCallback: PropTypes.func,
		userId: PropTypes.number.isRequired,
		group: PropTypes.string.isRequired,
		role: PropTypes.string.isRequired,
		className: PropTypes.string,
		option: PropTypes.object,
	};
	
	constructor (props) {
		super(props);
		this.state = {
			showModal: true,
			loading: false,
			groupData: [],
			group: props.group,
			roleData: Object.values(enumCommon.role).map(value => {
				return {
					value: value.value,
					label: value.label,
				};
			}),
			role: props.role,
		};
	}
	
	componentDidMount () {
		request.get(enumAPI.administratorGroupList, {}).then(info => {
			this.setState({
				groupData: info.data.map(value => {
					return {
						value: value.value,
						label: value.label,
					};
				}),
			});
		}).catch(info => prompt.error(info.msg));
	}
	
	handleSubmit = () => {
		const self = this;
		self.props.form.validateFields((err, values) => {
			if (!err) {
				self.setState({loading: true}, () => {
					const userId = self.props.userId;
					request.put(enumAPI.userUpdateGroupAndRole, {
						userId,
						...values,
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
						label="组"
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator('group', {
							initialValue: this.state.group,
							rules: [
								{
									required: true,
									message: '请选择分组',
								},
							],
						})(
							<Select
								disabled={!auth.isAdministrator}
								onChange={group => this.setState({group})}
								placeholder="请选择分组"
							>
								{
									this.state.groupData.map((value => {
										return <Option key={value.value}>{value.value}</Option>;
									}))
								}
							</Select>,
						)}
					</Form.Item>
					<Form.Item
						label="角色"
						hasFeedback
						{...formItemLayout}
					>
						{getFieldDecorator('role', {
							initialValue: this.state.role,
							rules: [
								{
									required: true,
									message: '请选择角色',
								},
							],
						})(
							<Select
								onChange={role => this.setState({role})}
								placeholder="请选择角色"
							>
								{
									this.state.roleData.map((value => {
										return <Option key={value.value}>{value.value}</Option>;
									}))
								}
							</Select>,
						)}
					</Form.Item>
				</Form>
			</Modal>
		);
	}
}

export default Form.create()(UpdateGroupAndRoleModal);
