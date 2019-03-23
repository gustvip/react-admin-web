/**
 * Created by joey on 2018/2/18
 */
import enumAPI from 'constants/enumAPI';
import T from 'utils/t';

/**
 * 获取权限列表
 * @return {Promise}
 */
export const administratorAuthEnumList = () => T.request.get(enumAPI.administratorAuthEnumList, {search: ''});

/**
 * 获取组对应角色已有权限列表
 * @param {string} condition.group
 * @param {string} condition.role
 * @param {string} condition.search
 * @return {Promise}
 */
export const administratorAuthListGroupAndRoleAuth = condition => T.request.get(enumAPI.administratorAuthListGroupAndRoleAuth, condition);

/**
 * 删除组对应角色已有权限
 * @param {String[]} condition.authValue
 * @param {String} condition.group
 * @param {String} condition.role
 * @return {Promise}
 */
export const administratorAuthListDelete = condition => T.request.del(enumAPI.administratorAuthListDelete, condition);

/**
 * 分配组对应角色已有权限
 * @param {String[]} condition.authValue
 * @param {String} condition.group
 * @param {String} condition.role
 * @return {Promise}
 */
export const administratorAuthListDistribute = condition => T.request.put(enumAPI.administratorAuthListDistribute, condition);
