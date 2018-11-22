/**
 * Created by joey on 2018/2/18
 */
import enumAPI from 'constants/enumAPI';
import T from 'utils/t';

/**
 * 获取权限枚举列表
 * @param {string} condition.search
 * @return {Promise}
 */
export const administratorAuthList = (condition) => T.request.get(enumAPI.administratorAuthList, condition);

/**
 * 增加权限
 * @param {string} condition.authValue
 * @param {string} condition.label
 * @param {null | undefined} [condition.parent]
 * @return {Promise}
 */
export const administratorAuthAdd = (condition) => T.request.postJSON(enumAPI.administratorAuthAdd, condition);

/**
 * 获取组对应角色已有权限列表
 * @param {string} condition.group
 * @param {string} condition.role
 * @return {Promise}
 */
export const administratorGroupList = (condition) => T.request.get(enumAPI.administratorGroupGroupAndRoleAuth, condition);
