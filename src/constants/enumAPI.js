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
	fileParseXlsx: _userAPI('/file/parseXlsx'), // 解析xlsx文件
	fileParseCsv: _userAPI('/file/parseCsv'), // 解析csv文件
	fileParseXml: _userAPI('/file/parseXml'), // 解析xml文件
	fileDownJson: _userAPI('/file/downJson'), // 下载json文件
	
	/*
   |----------------------------------------------------------------
   | 超级管理员相关API地址
   |----------------------------------------------------------------
 */
	administratorAuthDownload: _userAPI('/administrator/auth/download'), // 权限json下载
	administratorAuthList: _userAPI('/administrator/auth/list'), // 权限枚举列表
	administratorAuthAdd: _userAPI('/administrator/auth/add'), // 权限枚举新增
	administratorAuthDelete: _userAPI('/administrator/auth/delete'), // 权限枚举删除
	administratorAuthRecover: _userAPI('/administrator/auth/recover'), // 权限枚举恢复
	administratorAuthUpdate: _userAPI('/administrator/auth/update'), // 权限枚举更新
	administratorGroupGroupAndRoleAuth: _userAPI('/administrator/group/groupAndRoleAuth'), // 组对应角色权限列表
	administratorGroupDelete: _userAPI('/administrator/group/delete'), // 组对应角色权限删除
};
export default helper.immutable(API, flowRight(helper.removeTrailingSlash, helper.removeBlank, identity));
