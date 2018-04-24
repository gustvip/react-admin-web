/**
 * Created by joey on 2018/2/18
 */

import EnumAPI from 'constants/EnumAPI'
import T from 'utils/T'

/**
 * 获取用户详情
 * @param {Object} condition {{userInfo: String, limitLength: Number}}
 * @return {Promise}
 */
export const searchUser = condition => T.request.get(EnumAPI.user_search, condition)

/**
 * 获取用户详情
 * @param {Object} condition {{currentPage: Number, pageSize: Number}}
 * @return {Promise}
 */
export const getUserList = condition => T.request.get(EnumAPI.user_list, condition)

/**
 * 删除用户
 * @param {Array} condition {{user_id: Number || Array ,currentPage: Number, pageSize: Number}}
 * @return {Promise}
 */
export const deleteUser = condition => T.request.del(EnumAPI.user_delete, {user_id: condition})

/**
 * 获得初始数据
 * @param {Object} condition {{currentPage: Number, pageSize: Number}}
 * @return {Promise}
 */
export const getInitialData = condition => T.request.all([getUserList(condition)])

