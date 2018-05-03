/**
 * Created by joey on 2018/02/19
 */

import helper from 'utils/core/helper'
import lodash from 'lodash'

/**
 * 所有路由
 * @type {{rootPath: string, login: string, userAdd: string, userEdit: string, userList: string}}
 */

export default helper.immutable({
	rootPath: '',
	login: 'login',
	
	/*
 	|-----------------------------------------------
 	| 用户-相关的路由
 	|-----------------------------------------------
 	*/
	user_list: 'user/list',
	
}, value => ENV.rootPath.trim() + lodash.flowRight(helper.removeTrailingSlash, helper.removeBlank)(value))
