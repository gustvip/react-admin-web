/**
 * Created by joey on 2018/02/19
 */
import helper from 'utils/core/helper';
import identity from 'lodash/identity';
import flowRight from 'lodash/flowRight';

/**
 * @param api
 * @return {*}
 * @private
 */
const _userAPI = api => window.ENV.apiDomain + api;

/**
 * @type {{userLogin: *, userLoginOut: *, userAdd: *, userDelete: *, userDetail: *, userUpdateInfo: *, userUpdatePassword: *, userResetPassword: *, userList: *, fileParseXlsx: *, fileParseCsv: *, fileParseXml: *, fileDownJson: *, administratorAuthDownload: *, administratorAuthList: *, administratorAuthAdd: *, administratorAuthDelete: *, administratorAuthRecover: *, administratorAuthUpdate: *, administratorGroupGroupAndRoleAuth: *}}
 */
const API = {
	/*
   |----------------------------------------------------------------
   | 用户相关API地址
   |----------------------------------------------------------------
 */
	userLogin: _userAPI('/user/login'),
	userLoginOut: _userAPI('/user/loginOut'),
	userAdd: _userAPI('/user/add'),
	userDelete: _userAPI('/user/delete'),
	userDetail: _userAPI('/user/detail'),
	userUpdateInfo: _userAPI('/user/updateInfo'),
	userUpdatePassword: _userAPI('/user/updatePassword'),
	userResetPassword: _userAPI('/user/resetPassword'),
	userList: _userAPI('/user/list'),
	
	/*
   |----------------------------------------------------------------
   | 文件相关API地址
   |----------------------------------------------------------------
 */
	fileParseXlsx: _userAPI('/file/parseXlsx'),
	fileParseCsv: _userAPI('/file/parseCsv'),
	fileParseXml: _userAPI('/file/parseXml'),
	fileDownJson: _userAPI('/file/downJson'),
	
	/*
   |----------------------------------------------------------------
   | 超级管理员相关API地址
   |----------------------------------------------------------------
 */
	administratorAuthDownload: _userAPI('/administrator/auth/download'),
	administratorAuthList: _userAPI('/administrator/auth/list'),
	administratorAuthAdd: _userAPI('/administrator/auth/add'),
	administratorAuthDelete: _userAPI('/administrator/auth/delete'),
	administratorAuthRecover: _userAPI('/administrator/auth/recover'),
	administratorAuthUpdate: _userAPI('/administrator/auth/update'),
	administratorGroupGroupAndRoleAuth: _userAPI('/administrator/group/groupAndRoleAuth'),
};
export default helper.immutable(API, flowRight(helper.removeTrailingSlash, helper.removeBlank, identity));
