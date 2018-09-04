import enumAPI from 'constants/enumAPI';
import * as  request from 'utils/core/request';

/**
 * 用户添加
 * @param {string} condition.user_name  用户名
 * @param {string} condition.user_password  用户密码
 * @param {string} condition.user_email  用户邮箱
 * @param {string} condition.user_phone  用户手机
 * @return {Promise}
 */
export const userAdd = condition => request.post(enumAPI.user_add, condition);
