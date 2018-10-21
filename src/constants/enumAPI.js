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
 * @type {{userLogin: *, userAdd: *, userDelete: *, userDetail: *, userUpdateInfo: *, userUpdatePassword: *, userResetPassword: *, userList: *, fileParseXlsx: *, fileParseCsv: *, fileDownJson: *}}
 */
const API = {
	/*
   |----------------------------------------------------------------
   | 用户相关API地址
   |----------------------------------------------------------------
 */
	userLogin: _userAPI('/user/login'),
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
	fileDownJson: _userAPI('/file/downJson'),
	
};
export default helper.immutable(API, flowRight(helper.removeTrailingSlash, helper.removeBlank, identity));
