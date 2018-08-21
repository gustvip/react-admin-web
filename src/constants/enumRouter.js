/**
 * Created by joey on 2018/02/19
 */

import helper from 'utils/core/helper';
import _ from 'lodash';

/**
 * @type {{rootPath: string, login: string, userAdd: string, userEdit: string, userList: string}}
 */

export default helper.immutable({
	rootPath: '',
	login: 'login',
	test_demo: 'test/demo',
	
	/*
	 |-----------------------------------------------
	 | 用户-相关的路由
	 |-----------------------------------------------
	 */
	user_list: 'user/list',
}, value => ENV.rootPath.trim() + _.flowRight(helper.removeTrailingSlash, helper.removeBlank)(value));
