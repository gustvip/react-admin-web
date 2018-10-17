import enumAPI from "constants/enumAPI";
import * as request from "utils/core/request";

/**
 * 用户添加
 * @param {string} condition.userName  用户名
 * @param {string} condition.userPassword  用户密码
 * @param {string} condition.userEmail  用户邮箱
 * @param {string} condition.userPhone  用户手机
 * @param {string} condition.userDescription  用户描述
 * @param {string} condition.userSex  用户性别
 * @param {string} condition.name  用户姓名
 * @return {Promise}
 */
export const userAdd = condition => request.post(enumAPI.userAdd, condition);
