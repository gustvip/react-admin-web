/**
 * Created by joey on 2018/2/18
 */
import enumAPI from 'constants/enumAPI';
import T from 'utils/t';

/**
 * 获取权限枚举列表
 * @return {Promise}
 */
export const administratorAuthList = () => T.request.get(enumAPI.administratorAuthList, {search: ''});

/**
 * 获取组对应角色已有权限列表
 * @param {string} condition.group
 * @param {string} condition.role
 * @param {string} condition.search
 * @return {Promise}
 */
export const administratorGroupList = (condition) => T.request.get(enumAPI.administratorGroupGroupAndRoleAuth, condition);

/**
 * 删除组对应角色已有权限
 * @param {Array<String>} condition.authValue
 * @param {String} condition.group
 * @param {String} condition.role
 * @return {Promise}
 */
export const administratorGroupDelete = (condition) => T.request.del(enumAPI.administratorGroupDelete, condition);

/**
 * 分配组对应角色已有权限
 * @param {Array<String>} condition.authValue
 * @param {String} condition.group
 * @param {String} condition.role
 * @return {Promise}
 */
export const administratorGroupDistribute = (condition) => T.request.postJSON(enumAPI.administratorGroupDistribute, condition);
