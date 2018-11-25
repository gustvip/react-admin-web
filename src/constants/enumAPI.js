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
 * @type {{userLogin: *, userLoginOut: *, userAdd: *, userDelete: *, userDetail: *, userUpdateInfo: *, userUpdatePassword: *, userResetPassword: *, userList: *, fileParseXlsx: *, fileParseCsv: *, fileParseXml: *, fileDownJson: *, administratorAuthDownload: *, administratorAuthList: *, administratorAuthAdd: *, administratorAuthDelete: *, administratorAuthRecover: *, administratorAuthUpdate: *, administratorGroupGroupAndRoleAuth: *, administratorGroupDelete: *}}
 */
const API = {
	/*
   |----------------------------------------------------------------
   | 用户相关API地址
   |----------------------------------------------------------------
 */
	userLogin: _userAPI('/user/login'), // 用户登陆
	userLoginOut: _userAPI('/user/loginOut'), // 安全退出
	userAdd: _userAPI('/user/add'), // 新增用户
	userDelete: _userAPI('/user/delete'), // 删除用户
	userDetail: _userAPI('/user/detail'), // 获取用户详情
	userUpdateInfo: _userAPI('/user/updateInfo'), // 更新用户信息
	userUpdatePassword: _userAPI('/user/updatePassword'), // 更新密码
	userResetPassword: _userAPI('/user/resetPassword'), // 重置密码
	userList: _userAPI('/user/list'), // 获取用户列表
	
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
	administratorGroupDistribute: _userAPI('/administrator/group/distribute'), // 组对应角色权限分配
};
export default helper.immutable(API, flowRight(helper.removeTrailingSlash, helper.removeBlank, identity));
