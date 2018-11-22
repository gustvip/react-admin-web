/**
 * Created by joey on 2018/2/18
 */

import enumAPI from 'constants/enumAPI';
import T from 'utils/t';

/**
 * 获取用户列表
 * @param {number} condition.currentPage
 * @param {number} condition.pageSize
 * @param {string} condition.search
 * @return {Promise}
 */
export const getUserList = (condition) => T.request.get(enumAPI.userList, condition);

/**
 * 删除用户
 * @param {Array} condition.userId
 * @return {Promise}
 */
export const deleteUser = (condition) => T.request.del(enumAPI.userDelete, condition);
