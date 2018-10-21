/**
 * Created by joey on 2018/2/18
 */

import enumAPI from 'constants/enumAPI';
import T from 'utils/t';

/**
 * 获取用户列表
 * @param {number} currentPage
 * @param {number} pageSize
 * @param {string} search
 * @return {Promise}
 */
export const getUserList = (currentPage, pageSize, search) => T.request.get(enumAPI.userList, {
	currentPage,
	pageSize,
	search,
});

/**
 * 删除用户
 * @param {Array} userId
 * @return {Promise}
 */
export const deleteUser = (userId) => T.request.del(enumAPI.userDelete, {userId});
