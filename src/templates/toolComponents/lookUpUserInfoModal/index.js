/**
 * Created by joey on 18-9-4
 */
import PropTypes from 'prop-types';
import React from 'react';
import { Modal, Spin } from 'antd';
import prompt from 'utils/core/prompt';
import helper from 'utils/core/helper';
import styles from './lookUpUserInfoModal.scss';
import * as enumCommon from 'constants/app/common';
import * as webAPI from 'constants/webAPI';

export default class LookUpUserInfoModal extends React.PureComponent {
	static defaultProps = {
		style: {},
		className: '',
		option: {},
	};
	
	static propTypes = {
		className: PropTypes.string,
		option: PropTypes.object,
		userId: PropTypes.number.isRequired,
	};
	
	state = {
		isLoading: true,
		showModal: true,
		userInfo: {},
	};
	
	componentDidMount() {
		webAPI.userDetail({userId: this.props.userId}).then(info => {
			this.setState({
				userInfo: info.data,
				isLoading: false,
			});
		}).catch(info => prompt.error(info.msg));
	}
	
	render() {
		const {className = '', option = {}} = this.props;
		return !this.state.isLoading && (
			<Modal
				title="信息中心"
				footer={null}
				classNmae={className}
				okButtonProps={{loading: this.state.loading}}
				onOk={() => this.handleSubmit()}
				onCancel={() => this.setState({showModal: false})}
				okText="确认"
				cancelText="取消"
				closable={true}
				visible={this.state.showModal}
				maskClosable={true}
				destroyOnClose={true}
				{...option}
			>
				<div className={styles['content-container']}>
					<div className={styles['item']}>
						<div className={styles['description']}>名称:&nbsp;&nbsp;</div>
						<div className={styles['value']}>{this.state.userInfo.userName}</div>
					</div>
					<div className={styles['item']}>
						<div className={styles['description']}>邮箱:&nbsp;&nbsp;</div>
						<div className={styles['value']}>{this.state.userInfo.userEmail}</div>
					</div>
					<div className={styles['item']}>
						<div className={styles['description']}>手机:&nbsp;&nbsp;</div>
						<div className={styles['value']}>{this.state.userInfo.userPhone}</div>
					</div>
					<div className={styles['item']}>
						<div className={styles['description']}>组:&nbsp;&nbsp;</div>
						<div className={styles['value']}>{this.state.userInfo.group}</div>
					</div>
					<div className={styles['item']}>
						<div className={styles['description']}>角色:&nbsp;&nbsp;</div>
						<div className={styles['value']}>{this.state.userInfo.role}</div>
					</div>
					<div className={styles['item']}>
						<div className={styles['description']}>状态:&nbsp;&nbsp;</div>
						<div className={styles['value']}>{Object.values(enumCommon.status).find(value => value.value === this.state.userInfo.status).label}</div>
					</div>
					<div className={styles['item']}>
						<div className={styles['description']}>性别:&nbsp;&nbsp;</div>
						<div className={styles['value']}>{Object.values(enumCommon.userSex).find(value => value.value === this.state.userInfo.userSex).label}</div>
					</div>
					<div className={styles['item']}>
						<div className={styles['description']}>姓名:&nbsp;&nbsp;</div>
						<div className={styles['value']}>{this.state.userInfo.name}</div>
					</div>
					<div className={styles['item']}>
						<div className={styles['description']}>创建时间:&nbsp;&nbsp;</div>
						<div className={styles['value']}>{helper.dateFormat(this.state.userInfo.createdAt)}</div>
					</div>
					<div className={styles['item']}>
						<div className={styles['description']}>更新时间:&nbsp;&nbsp;</div>
						<div className={styles['value']}>{helper.dateFormat(this.state.userInfo.updatedAt)}</div>
					</div>
				</div>
			</Modal>
		);
	}
}
