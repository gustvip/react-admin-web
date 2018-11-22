/**
 * Created by joey on 2018/2/18
 */
import T from 'utils/t';
import enumAPI from 'constants/enumAPI';
import {MainHeader} from 'templates/mainLayout';
import {Button, Input, Table} from 'antd';
import enumAuth from '../../../../constants/enumAuth';
import * as webAPI from '../../webAPI/index';
import React from 'react';
import PropTypes from 'prop-types';
import {userSex, role, status} from 'constants/app/common';
import style from '../../scss/authList/index.scss';

import debounce from 'lodash/debounce';

export default class List extends React.PureComponent {
	static contextTypes = {
		router: PropTypes.object.isRequired,
	};
	
	state = {
		dataSource: [],
		group: '1',
		role: '3',
		groupData: [],
		roleData: [],
	};
	
	componentDidMount() {
		this.getList(this.state.group, this.state.role);
	}
	
	getList = (group, role) => {
		webAPI.administratorGroupList({
			group,
			role,
		}).then(info => {
			this.setState({
				group,
				role,
				dataSource: info.data,
			});
		}).catch(info => T.prompt.error(info.msg));
	};
	
	get columns() {
		return [
			{
				title: 'groupId',
				dataIndex: 'groupId',
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'groupId',
					});
				},
			},
			{
				title: 'value',
				dataIndex: 'value',
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'value',
					});
				},
			},
			{
				title: 'label',
				dataIndex: 'label',
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'label',
					});
				},
			},
			{
				title: 'authParent',
				dataIndex: 'authParent',
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'authParent',
					});
				},
			},
			{
				title: 'level',
				dataIndex: 'level',
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'level',
					});
				},
			},
			{
				title: '创建时间',
				dataIndex: 'createdAt',
				render: val => new Date(val).toLocaleString(),
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'createdAt',
					});
				},
			},
			{
				title: '更新时间',
				dataIndex: 'updatedAt',
				render: val => new Date(val).toLocaleString(),
				sorter(prev, now) {
					return T.helper.sort({
						prev,
						now,
						property: 'updatedAt',
					});
				},
			},
		];
	}
	
	render() {
		const self = this;
		return (
			<React.Fragment>
				<div className={style['main-container']}>
					<Table
						size="middle"
						dataSource={self.state.dataSource.map(value => ({
							...value,
							key: value.value,
						}))}
						bordered
						columns={self.columns}
						pagination={false}
					/>
				</div>
			</React.Fragment>
		);
	}
}
