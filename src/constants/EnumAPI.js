/**
 * Created by joey on 2018/02/19
 */
import ENV from 'ENV'
import helper from 'utils/core/helper'
import lodash from 'utils/core/lodash'

const _userAPI = api => {
	if (ENV.mock.isStart) {
		return '/mockAPI' + api
	}
	
	return api
}

/**
 * 所有API接口
 * @type {{user_login: *, user_list: *, user_add: *, user_delete: *, user_detail: *, user_update: *, user_search: *}}
 */
export default helper.immutable({
	/*
	 |----------------------------------------------------------------
	 | 用户相关API地址
	 |----------------------------------------------------------------
	 */
	user_loginIn: _userAPI('/user/loginIn'), // 登陆
	user_loginOut: _userAPI('/user/loginOut'), //  退出登陆
	user_list: _userAPI('/user/list'), // 所有用户列表
	user_add: _userAPI('/user/add'), // 添加
	user_delete: _userAPI('/user/delete'), // 删除单个用户
	user_detail: _userAPI('/user/detail'), // 单个用户详情
	user_update: _userAPI('/user/update'), // 更新
	user_search: _userAPI('/user/search'), // 搜索
	
}, value => lodash.flowRight(helper.removeTrailingSlash, helper.removeBlank)(value))

