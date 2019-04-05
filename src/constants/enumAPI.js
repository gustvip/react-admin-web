/**
 * Created by joey on 2018/02/19
 */
import helper from 'utils/core/helper';
import { identity, flowRight } from 'lodash';

const _proxyNodeAPI = api => helper.combineUrl('/proxyNodeAPI', api);

/**
 * @type {{userLogin: *, userLoginOut: *, userAdd: *, userDelete: *, userRecover: *, userDetail: *, userUpdateInfo: *, userUpdatePassword: *, userResetPassword: *, userList: *, userUpdateGroupAndRole: *, fileParseJson: *, fileParseXlsx: *, fileParseCsv: *, fileParseXml: *, fileDownload: *, administratorAuthEnumDownload: *, administratorAuthEnumList: *, administratorAuthEnumAdd: *, administratorAuthEnumDelete: *, administratorAuthEnumUpdate: *, administratorAuthListGroupAndRoleAuth: *, administratorAuthListDelete: *, administratorAuthListDistribute: *}}
 */
const API = {
	/*
   |----------------------------------------------------------------
   | 用户相关API
   |----------------------------------------------------------------
  */
	userLogin: _proxyNodeAPI('user/login'), // 用户---登陆
	userLoginOut: _proxyNodeAPI('user/loginOut'), // 用户---安全退出
	userAdd: _proxyNodeAPI('user/add'), // 用户---新增
	userDelete: _proxyNodeAPI('user/delete'), // 用户---删除
	userRecover: _proxyNodeAPI('user/recover'), // 用户---恢复
	userDetail: _proxyNodeAPI('user/detail'), // 用户---详情
	userUpdateInfo: _proxyNodeAPI('user/updateInfo'), // 用户---更新信息
	userUpdatePassword: _proxyNodeAPI('user/updatePassword'), // 用户---更新密码
	userResetPassword: _proxyNodeAPI('user/resetPassword'), // 用户---重置密码
	userList: _proxyNodeAPI('user/list'), // 用户---列表
	userUpdateGroupAndRole: _proxyNodeAPI('user/updateGroupAndRole'), // 用户---更改角色和组
	
	/*
   |----------------------------------------------------------------
   | 文件相关API
   |----------------------------------------------------------------
  */
	fileParseJson: _proxyNodeAPI('file/parseJson'), // 文件---解析json文件
	fileParseXlsx: _proxyNodeAPI('file/parseXlsx'), // 文件---解析xlsx文件
	fileParseCsv: _proxyNodeAPI('file/parseCsv'), // 文件---解析csv文件
	fileParseXml: _proxyNodeAPI('file/parseXml'), // 文件---解析xml文件
	fileDownload: _proxyNodeAPI('file/download'), // 文件---下载文件
	
	/*
   |----------------------------------------------------------------
   | 公共-API
   |----------------------------------------------------------------
  */
	commonCheckCode: _proxyNodeAPI('common/checkCode'), // 生成验证码
	commonMock: _proxyNodeAPI('common/mock'), // 生成mockjs数据
	
	/*
   |----------------------------------------------------------------
   | 组相关API
   |----------------------------------------------------------------
  */
	administratorGroupList: _proxyNodeAPI('administrator/group/list'), // 组---列表
	administratorGroupAdd: _proxyNodeAPI('administrator/group/add'), // 组---新增
	administratorGroupDelete: _proxyNodeAPI('administrator/group/delete'), // 组---删除
	administratorGroupUpdate: _proxyNodeAPI('administrator/group/update'), // 组---更新
	
	/*
   |----------------------------------------------------------------
   | 权限枚举相关API
   |----------------------------------------------------------------
  */
	administratorAuthEnumDownload: _proxyNodeAPI('administrator/authEnum/download'), // 权限枚举---json下载
	administratorAuthEnumList: _proxyNodeAPI('administrator/authEnum/list'), // 权限枚举---列表
	administratorAuthEnumAdd: _proxyNodeAPI('administrator/authEnum/add'), // 权限枚举---新增
	administratorAuthEnumDelete: _proxyNodeAPI('administrator/authEnum/delete'), // 权限枚举---删除
	administratorAuthEnumUpdate: _proxyNodeAPI('administrator/authEnum/update'), // 权限枚举---更新
	
	/*
   |----------------------------------------------------------------
   | 权限列表相关API
   |----------------------------------------------------------------
  */
	administratorAuthListGroupAndRoleAuth: _proxyNodeAPI('administrator/authList/groupAndRoleAuth'), // 权限列表---组和角色
	administratorAuthListDelete: _proxyNodeAPI('administrator/authList/delete'), // 权限列表---删除
	administratorAuthListDistribute: _proxyNodeAPI('administrator/authList/distribute'), // 权限列表---分配
};

export default helper.immutable(API, flowRight(helper.removeTrailingSlash, helper.removeBlank, identity));
