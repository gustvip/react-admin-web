/**
 * Created by joey on 2018/2/18
 */

import T from "utils/t";
import * as webAPI from "../../webAPI/list/index";
import * as actionTypes from "../../constants/list/index";

/**
 * 获取初始化数据
 * @param {Object} condition {{currentPage: Number, pageSize: Number}}
 */
export const getInitialDataAction = condition => (dispatch) => {
	webAPI.getInitialData(condition).then((info) => {
		dispatch({
			type: actionTypes.GET_INITIAL_DATA,
			data: info[0].data,
		});
	}).catch(info => T.prompt.error(info.msg));
};

/**
 * 设置用户搜索
 * @param {Object} condition {{userInfo: String, limitLength: Number}}
 */
export const setUserSearchAction = condition => (dispatch) => {
	webAPI.searchUser(condition).then((info) => {
		dispatch({
			type: actionTypes.SET_USER_SEARCH,
			data: info.data,
		});
	}).catch(info => T.prompt.error(info.msg));
};

/**
 * 获取用户详情
 * @param {Object} condition {{currentPage: Number, pageSize: Number}}
 */
export const getUserListAction = condition => (dispatch) => {
	webAPI.getUserList(condition).then((info) => {
		dispatch({
			type: actionTypes.GET_USER_LIST,
			data: info.data,
		});
	}).catch(info => T.prompt.error(info.msg));
};

/**
 * 删除用户
 * @param {Object} condition {{userId: Array, currentPage: Number, pageSize: Number}}
 */
export const deleteUserAction = condition => (dispatch) => {
	webAPI.deleteUser(condition.userId).then(() => {
		return webAPI.getUserList({ currentPage: condition.currentPage, pageSize: condition.pageSize });
	}).then((info) => {
		dispatch({
			type: actionTypes.GET_USER_LIST,
			data: info.data,
		});
	}).catch(info => T.prompt.error(info.msg));
};

/**
 * 设置删除的行
 * @param {Array} selectedRowKeys
 * @return {{type: Symbol, data: *}}
 * @constructor
 */
export const setDeleteRowAction = (selectedRowKeys) => {
	return {
		type: actionTypes.SET_DELETE_ROW,
		data: selectedRowKeys,
	};
};
