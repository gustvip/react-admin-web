/**
 * Created by joey on 2018/02/19
 */
import helper from 'utils/core/helper'
import lodash from 'lodash'

const _userAPI = api => {
  if (ENV.mock.isStart) {
    return '/mockAPI' + api
  }
  
  return api
}

/**
 * @type {{user_login: *, user_list: *, user_add: *, user_delete: *, user_detail: *, user_update: *, user_search: *}}
 */
export default helper.immutable({
  /*
   |----------------------------------------------------------------
   | 用户相关API地址
   |----------------------------------------------------------------
   */
  user_loginIn: _userAPI('/user/loginIn'),
  user_loginOut: _userAPI('/user/loginOut'),
  user_add: _userAPI('/user/add'),
  user_delete: _userAPI('/user/delete'),
  user_detail: _userAPI('/user/detail'),
  user_update: _userAPI('/user/update'),
  user_search: _userAPI('/user/search'),
  user_list: _userAPI('/user/list'),
  
}, value => lodash.flowRight(helper.removeTrailingSlash, helper.removeBlank)(value))

