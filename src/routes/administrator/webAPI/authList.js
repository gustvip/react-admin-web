/**
 * Created by joey on 2018/2/18
 */
import enumAPI from 'constants/enumAPI';
import T from 'utils/t';

/**
 * 获取权限枚举列表
 * @param {number} condition.currentPage
 * @param {number} condition.pageSize
 * @param {string} condition.search
 * @param {string | null | undefined} condition.status
 * @return {Promise}
 */
export const administratorAuthList = (condition) => T.request.get(enumAPI.administratorAuthList, condition);

/**
 * 增加权限枚举
 * @param {string} condition.authValue
 * @param {string} condition.label
 * @return {Promise}
 */
export const administratorAuthAdd = (condition) => T.request.postJSON(enumAPI.administratorAuthAdd, condition);

/**
 * 删除权限枚举
 * @param {Array<String>} condition.authValue
 * @return {Promise}
 */
export const administratorAuthDelete = (condition) => T.request.del(enumAPI.administratorAuthDelete, condition);

/**
 * 恢复权限枚举
 * @param {Array<String>} condition.authValue
 * @return {Promise}
 */
export const administratorAuthRecover = (condition) => T.request.postJSON(enumAPI.administratorAuthRecover, condition);

/**
 * 更新权限枚举
 * @param {string} condition.oldAuthValue
 * @param {string} condition.newAuthValue
 * @param {string} condition.authLabel
 * @return {Promise}
 */
export const administratorAuthUpdate = (condition) => T.request.postJSON(enumAPI.administratorAuthUpdate, condition);
