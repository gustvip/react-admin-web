/**
 * Created by joey on 2019/4/6
 */

import enumAPI from 'constants/enumAPI';
import * as request from 'utils/core/request';

/**
 * 生成验证码
 * @return {Promise}
 */
export const createRandomCode = () => request.postJSON(enumAPI.commonCheckCode);

/**
 * 生成mock数据
 * @param {object} condition mockjs模版
 * @return {Promise}
 */
export const mock = condition => request.postJSON(enumAPI.commonMock, condition);

/**
 * 用户登录
 * @param {string} condition.userName
 * @param {string} condition.userPassword
 * @param {string} condition.checkCode
 * @return {Promise}
 */
export const userLogin = condition => request.postJSON(enumAPI.userLogin, condition);

/**
 * 新增用户
 * @param {string} condition.userName
 * @param {string} condition.userPassword
 * @param {string} condition.userEmail
 * @param {string} condition.userPhone
 * @param {string} condition.userSex
 * @param {string} condition.name
 * @return {Promise}
 */
export const userAdd = condition => request.postJSON(enumAPI.userAdd, condition);

/**
 * 用户详情
 * @param {string} condition.userId
 * @return {Promise}
 */
export const userDetail = condition => request.get(enumAPI.userDetail, condition);

/**
 * 更新用户组和角色
 * @param {string} condition.userId
 * @return {Promise}
 */
export const userUpdateGroupAndRole = condition => request.put(enumAPI.userUpdateGroupAndRole, condition);

/**
 * 更新用户密码
 * @param {string} condition.oldPassword
 * @param {string} condition.newPassword
 * @return {Promise}
 */
export const userUpdatePassword = condition => request.put(enumAPI.userUpdatePassword, condition);

/**
 * 更新用户信息
 * @param {number} condition.userId
 * @param {string} condition.userName
 * @param {string} condition.userEmail
 * @param {string} condition.userPhone
 * @param {string} condition.userSex
 * @param {string} condition.name
 * @return {Promise}
 */
export const userUpdateInfo = condition => request.put(enumAPI.userUpdateInfo, condition);

/**
 * 用户登出
 * @return {Promise}
 */
export const userLoginOut = () => request.postJSON(enumAPI.userLoginOut);

/**
 * 重置用户密码
 * @param {string} condition.userId
 * @return {Promise}
 */
export const userResetPassword = condition => request.put(enumAPI.userResetPassword, condition);

/**
 * 获取用户列表
 * @param {number} condition.currentPage
 * @param {number} condition.pageSize
 * @param {string} condition.search
 * @param {string} [condition.group]
 * @param {string} [condition.role]
 * @param {string} [condition.status]
 * @param {string} [condition.sex]
 * @return {Promise}
 */
export const getUserList = condition => request.get(enumAPI.userList, condition);

/**
 * 删除用户
 * @param {number[]} condition.userId
 * @return {Promise}
 */
export const deleteUser = condition => request.del(enumAPI.userDelete, condition);

/**
 * 恢复用户
 * @param {number[]} condition.userId
 * @return {Promise}
 */
export const userRecover = condition => request.postJSON(enumAPI.userRecover, condition);

/**
 * 获取组列表
 * @param {number} [condition.currentPage]
 * @param {number} [condition.pageSize]
 * @param {string} [condition.search]
 * @return {Promise}
 */
export const administratorGroupList = condition => request.get(enumAPI.administratorGroupList, condition);

/**
 * 增加组
 * @param {string} condition.groupValue
 * @param {string} condition.groupLabel
 * @return {Promise}
 */
export const administratorGroupAdd = condition => request.postJSON(enumAPI.administratorGroupAdd, condition);

/**
 * 删除组
 * @param {String[]} condition.groupValue
 * @return {Promise}
 */
export const administratorGroupDelete = condition => request.del(enumAPI.administratorGroupDelete, condition);

/**
 * 更新组
 * @param {string} condition.oldGroupValue
 * @param {string} condition.groupLabel
 * @return {Promise}
 */
export const administratorGroupUpdate = condition => request.put(enumAPI.administratorGroupUpdate, condition);

/**
 * 获取组对应角色已有权限列表
 * @param {string} condition.group
 * @param {string} condition.role
 * @param {string} condition.search
 * @return {Promise}
 */
export const administratorAuthListGroupAndRoleAuth = condition => request.get(enumAPI.administratorAuthListGroupAndRoleAuth, condition);

/**
 * 删除组对应角色已有权限
 * @param {String[]} condition.authValue
 * @param {String} condition.group
 * @param {String} condition.role
 * @return {Promise}
 */
export const administratorAuthListDelete = condition => request.del(enumAPI.administratorAuthListDelete, condition);

/**
 * 分配组对应角色已有权限
 * @param {String[]} condition.authValue
 * @param {String} condition.group
 * @param {String} condition.role
 * @return {Promise}
 */
export const administratorAuthListDistribute = condition => request.put(enumAPI.administratorAuthListDistribute, condition);

/**
 * 获取权限枚举列表
 * @param {number} [condition.currentPage]
 * @param {number} [condition.pageSize]
 * @param {string} [condition.search]
 * @return {Promise}
 */
export const administratorAuthEnumList = condition => request.get(enumAPI.administratorAuthEnumList, condition);

/**
 * 增加权限枚举
 * @param {string} condition.authValue
 * @param {string} condition.authLabel
 * @param {string} condition.autoAddToAdministrator
 * @return {Promise}
 */
export const administratorAuthEnumAdd = condition => request.postJSON(enumAPI.administratorAuthEnumAdd, condition);

/**
 * 删除权限枚举
 * @param {String[]} condition.authValue
 * @return {Promise}
 */
export const administratorAuthEnumDelete = condition => request.del(enumAPI.administratorAuthEnumDelete, condition);

/**
 * 更新权限枚举
 * @param {string} condition.oldAuthValue
 * @param {string} condition.newAuthValue
 * @param {string} condition.authLabel
 * @return {Promise}
 */
export const administratorAuthEnumUpdate = condition => request.put(enumAPI.administratorAuthEnumUpdate, condition);
