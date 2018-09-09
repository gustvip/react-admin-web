/**
 * Created by joey on 2018/02/19
 */
import helper from 'utils/core/helper';
import { identity, flowRight } from 'lodash';

const _userAPI = api => window.ENV.apiDomain + api;

/**
 * @type {{user_login: *, user_list: *, user_add: *, user_delete: *, user_detail: *, user_update: *, user_search: *}}
 */
export default helper.immutable({
	/*
   |----------------------------------------------------------------
   | 用户相关API地址
   |----------------------------------------------------------------
   */
	user_login: _userAPI('/user/login'),
	user_add: _userAPI('/user/add'),
	user_delete: _userAPI('/user/delete'),
	user_detail: _userAPI('/user/detail'),
	user_update: _userAPI('/user/update'),
	user_search: _userAPI('/user/search'),
	user_list: _userAPI('/user/list'),
}, flowRight(helper.removeTrailingSlash, helper.removeBlank, identity));

