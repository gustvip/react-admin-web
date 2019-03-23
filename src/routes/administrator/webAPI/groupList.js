/**
 * Created by joey on 2018/2/18
 */
import enumAPI from 'constants/enumAPI';
import T from 'utils/t';

/**
 * 获取组列表
 * @param {number} [condition.currentPage]
 * @param {number} [condition.pageSize]
 * @param {string} [condition.search]
 * @return {Promise}
 */
export const administratorGroupList = condition => T.request.get(enumAPI.administratorGroupList, condition);

/**
 * 增加组
 * @param {string} condition.groupValue
 * @param {string} condition.groupLabel
 * @return {Promise}
 */
export const administratorGroupAdd = condition => T.request.postJSON(enumAPI.administratorGroupAdd, condition);

/**
 * 删除组
 * @param {String[]} condition.groupValue
 * @return {Promise}
 */
export const administratorGroupDelete = condition => T.request.del(enumAPI.administratorGroupDelete, condition);

/**
 * 更新组
 * @param {string} condition.oldGroupValue
 * @param {string} condition.groupLabel
 * @return {Promise}
 */
export const administratorGroupUpdate = condition => T.request.put(enumAPI.administratorGroupUpdate, condition);
