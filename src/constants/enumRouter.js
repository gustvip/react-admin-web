/**
 * Created by joey on 2018/02/19
 */
import helper from 'utils/core/helper';
import { flowRight, identity, partial } from 'lodash';

/**
 * @type {{rootPath: string, login: string, noPermit: string, testDemo: string, testParseFile: string, userList: string, administratorAuthEnumList: string, administratorGroupList: string}}
 */
const enumRouter = {
	rootPath: '',
	login: 'login', // 登陆
	noPermit: 'noPermit', // 无权限
	
	/*
   |-----------------------------------------------
   | 测试-相关的路由
   |-----------------------------------------------
  */
	testDemo: 'test/demo', // demo
	testParseFile: 'test/parseFile', // 解析文件
	
	/*
	 |-----------------------------------------------
	 | 用户-相关的路由
	 |-----------------------------------------------
	 */
	userList: 'user/list', // 用户列表
	
	/*
	 |-----------------------------------------------
	 | 超级管理员-相关的路由
	 |-----------------------------------------------
	 */
	administratorAuthEnum: 'administrator/authEnum', // 权限枚举
	administratorAuthList: 'administrator/authList', // 权限列表
	administratorGroupList: 'administrator/groupList', // 组列表
};

export default helper.immutable(enumRouter, flowRight(partial(helper.combineUrl, ENV.rootPath), helper.removeTrailingSlash, helper.removeBlank, identity));
