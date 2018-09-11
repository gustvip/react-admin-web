/**
 * Created by joey on 2018/02/19
 */
import helper from 'utils/core/helper';
import identity from 'lodash/identity';
import flowRight from 'lodash/flowRight';

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
	userAdd: _userAPI('/user/add'),
	userDelete: _userAPI('/user/delete'),
	user_detail: _userAPI('/user/detail'),
	user_update: _userAPI('/user/update'),
	userSearch: _userAPI('/user/search'),
	userList: _userAPI('/user/list'),
}, flowRight(helper.removeTrailingSlash, helper.removeBlank, identity));

