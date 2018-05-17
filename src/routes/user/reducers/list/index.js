/**
 * Created by joey on 2018/2/18
 */

import * as actionTypes from '../../constants/list'
import update from 'immutability-helper'
import T from 'utils/t'

/**
 * 初始state
 * @type {{commonInfo: {}, pageSize: number, currentPage: number, count: number, totalPages: number, dataSource: Array, selectedRowKeys: Array}}
 */
const initState = {
  commonInfo: {},
  pageSize: 10, //每页显示的条数
  currentPage: 1, //当前页
  count: 10, //总条数
  totalPages: 1, //总页数
  dataSource: [],
  selectedRowKeys: [],
}

export default function userListReducer (state = initState, action) {
  switch (action.type) {
    /**
     * 获得初始数据
     */
    case actionTypes.GET_INITIAL_DATA:
      return update(state, {
        dataSource: {
          $apply: x => T.helper.checkArray(action.data.data)
            ? action.data.data
            : x,
        },
        pageSize: {$set: action.data.pageSize},
        currentPage: {$set: action.data.currentPage},
        count: {$set: action.data.count},
        totalPages: {$set: action.data.totalPages},
      })
    
    /**
     * 用户搜索
     */
    case actionTypes.SET_USER_SEARCH:
      return update(state, {
        dataSource: {$set: action.data},
        currentPage: {$set: 1},
      })
    
    /**
     * 获得用户列表数据
     */
    case actionTypes.GET_USER_LIST:
      return update(state, {
        dataSource: {
          $apply: x => T.helper.checkArray(action.data.data)
            ? action.data.data
            : x,
        },
        pageSize: {$set: action.data.pageSize},
        currentPage: {$set: action.data.currentPage},
        count: {$set: action.data.count},
        totalPages: {$set: action.data.totalPages},
        selectedRowKeys: {$set: []},
      })
    
    /**
     * 设置删除的行
     */
    case actionTypes.SET_DELETE_ROW:
      return update(state, {
        selectedRowKeys: {$set: action.data},
      })
    
    default:
      return state
  }
}
