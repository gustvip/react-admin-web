/**
 * Created by joey on 2018/02/19
 */
import helper from 'utils/core/helper';
import { identity, flowRight } from 'lodash';

const _proxyAPI = api => window.ENV.apiDomain + api;

const _mockAPI = api => window.ENV.mockDomain + api;

/**
 * @type {{userLogin: *, userLoginOut: *, userAdd: *, userDelete: *, userRecover: *, userDetail: *, userUpdateInfo: *, userUpdatePassword: *, userResetPassword: *, userList: *, userUpdateGroupAndRole: *, fileParseJson: *, fileParseXlsx: *, fileParseCsv: *, fileParseXml: *, fileDownload: *, administratorAuthEnumDownload: *, administratorAuthEnumList: *, administratorAuthEnumAdd: *, administratorAuthEnumDelete: *, administratorAuthEnumUpdate: *, administratorAuthListGroupAndRoleAuth: *, administratorAuthListDelete: *, administratorAuthListDistribute: *}}
 */
const API = {
	/*
   |----------------------------------------------------------------
   | 用户相关API
   |----------------------------------------------------------------
  */
	userLogin: _proxyAPI('/user/login'), // 用户---登陆
	userLoginOut: _proxyAPI('/user/loginOut'), // 用户---安全退出
	userAdd: _proxyAPI('/user/add'), // 用户---新增
	userDelete: _proxyAPI('/user/delete'), // 用户---删除
	userRecover: _proxyAPI('/user/recover'), // 用户---恢复
	userDetail: _proxyAPI('/user/detail'), // 用户---详情
	userUpdateInfo: _proxyAPI('/user/updateInfo'), // 用户---更新信息
	userUpdatePassword: _proxyAPI('/user/updatePassword'), // 用户---更新密码
	userResetPassword: _proxyAPI('/user/resetPassword'), // 用户---重置密码
	userList: _proxyAPI('/user/list'), // 用户---列表
	userUpdateGroupAndRole: _proxyAPI('/user/updateGroupAndRole'), // 用户---更改角色和组
	
	/*
   |----------------------------------------------------------------
   | 文件相关API
   |----------------------------------------------------------------
  */
	fileParseJson: _proxyAPI('/file/parseJson'), // 文件---解析json文件
	fileParseXlsx: _proxyAPI('/file/parseXlsx'), // 文件---解析xlsx文件
	fileParseCsv: _proxyAPI('/file/parseCsv'), // 文件---解析csv文件
	fileParseXml: _proxyAPI('/file/parseXml'), // 文件---解析xml文件
	fileDownload: _proxyAPI('/file/download'), // 文件---下载文件
	
	/*
   |----------------------------------------------------------------
   | 权限枚举相关API
   |----------------------------------------------------------------
  */
	administratorAuthEnumDownload: _proxyAPI('/administrator/authEnum/download'), // 权限枚举---json下载
	administratorAuthEnumList: _proxyAPI('/administrator/authEnum/list'), // 权限枚举---列表
	administratorAuthEnumAdd: _proxyAPI('/administrator/authEnum/add'), // 权限枚举---新增
	administratorAuthEnumDelete: _proxyAPI('/administrator/authEnum/delete'), // 权限枚举---删除
	administratorAuthEnumUpdate: _proxyAPI('/administrator/authEnum/update'), // 权限枚举---更新
	
	/*
   |----------------------------------------------------------------
   | 权限列表相关API
   |----------------------------------------------------------------
  */
	administratorAuthListGroupAndRoleAuth: _proxyAPI('/administrator/authList/groupAndRoleAuth'), // 权限列表---组和角色
	administratorAuthListDelete: _proxyAPI('/administrator/authList/delete'), // 权限列表---删除
	administratorAuthListDistribute: _proxyAPI('/administrator/authList/distribute'), // 权限列表---分配
};
export default helper.immutable(API, flowRight(helper.removeTrailingSlash, helper.removeBlank, identity));

