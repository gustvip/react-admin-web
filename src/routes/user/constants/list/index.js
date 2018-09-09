/**
 * Created by joey on 2018/2/18
 */
import { uniqueId } from 'lodash';

/**
 * 获得初始数据
 * @type {string}
 */
export const GET_INITIAL_DATA = uniqueId('user_list_');

/**
 * 设置用户搜索
 * @type {string}
 */
export const SET_USER_SEARCH = uniqueId('user_list_');

/**
 * 获得用户列表数据
 * @type {string}
 */
export const GET_USER_LIST = uniqueId('user_list_');

/**
 * 设置删除的行
 * @type {string}
 */
export const SET_DELETE_ROW = uniqueId('user_list_');
