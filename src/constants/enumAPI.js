/**
 * Created by joey on 2018/02/19
 */
import helper from 'utils/core/helper';
import { identity, flowRight } from 'lodash';

const _proxyAPI = api => window.ENV.apiDomain + api;

const _mockAPI = api => window.ENV.mockDomain + api;

/**
 * @type {{userLogin: *, userLoginOut: *, userAdd: *, userDelete: *, userRecover: *, userDetail: *, userUpdateInfo: *, userUpdatePassword: *, userResetPassword: *, userList: *, userUpdateGroupAndRole: *, fileParseXlsx: *, fileParseCsv: *, fileParseXml: *, fileDownJson: *, administratorAuthDownload: *, administratorAuthList: *, administratorAuthAdd: *, administratorAuthDelete: *, administratorAuthRecover: *, administratorAuthUpdate: *, administratorGroupGroupAndRoleAuth: *, administratorGroupDelete: *, administratorGroupDistribute: *}}
 */
const API = {
	/*
   |----------------------------------------------------------------
   | 用户相关API地址
   |----------------------------------------------------------------
  */
	userLogin: _proxyAPI('/user/login'), // 用户登陆
	userLoginOut: _proxyAPI('/user/loginOut'), // 安全退出
	userAdd: _proxyAPI('/user/add'), // 新增用户
	userDelete: _proxyAPI('/user/delete'), // 删除用户
	userRecover: _proxyAPI('/user/recover'), // 恢复用户
	userDetail: _proxyAPI('/user/detail'), // 获取用户详情
	userUpdateInfo: _proxyAPI('/user/updateInfo'), // 更新用户信息
	userUpdatePassword: _proxyAPI('/user/updatePassword'), // 更新密码
	userResetPassword: _proxyAPI('/user/resetPassword'), // 重置密码
	userList: _proxyAPI('/user/list'), // 获取用户列表
	userUpdateGroupAndRole: _proxyAPI('/user/updateGroupAndRole'), // 更改角色和组
	
	/*
   |----------------------------------------------------------------
   | 文件相关API地址
   |----------------------------------------------------------------
  */
	fileParseXlsx: _proxyAPI('/file/parseXlsx'), // 解析xlsx文件
	fileParseCsv: _proxyAPI('/file/parseCsv'), // 解析csv文件
	fileParseXml: _proxyAPI('/file/parseXml'), // 解析xml文件
	fileDownJson: _proxyAPI('/file/downJson'), // 下载json文件
	
	/*
   |----------------------------------------------------------------
   | 超级管理员相关API地址
   |----------------------------------------------------------------
  */
	administratorAuthDownload: _proxyAPI('/administrator/auth/download'), // 权限json下载
	administratorAuthList: _proxyAPI('/administrator/auth/list'), // 权限枚举列表
	administratorAuthAdd: _proxyAPI('/administrator/auth/add'), // 权限枚举新增
	administratorAuthDelete: _proxyAPI('/administrator/auth/delete'), // 权限枚举删除
	administratorAuthRecover: _proxyAPI('/administrator/auth/recover'), // 权限枚举恢复
	administratorAuthUpdate: _proxyAPI('/administrator/auth/update'), // 权限枚举更新
	administratorGroupGroupAndRoleAuth: _proxyAPI('/administrator/group/groupAndRoleAuth'), // 组对应角色权限列表
	administratorGroupDelete: _proxyAPI('/administrator/group/delete'), // 组对应角色权限删除
	administratorGroupDistribute: _proxyAPI('/administrator/group/distribute'), // 组对应角色权限分配
};
export default helper.immutable(API, flowRight(helper.removeTrailingSlash, helper.removeBlank, identity));

