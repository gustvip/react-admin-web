/**
 * Created by joey on 2018/02/19
 */

import helper from "utils/core/helper";
import flowRight from "lodash/flowRight";

/**
 * @type {{rootPath: string, login: string, register: string, testDemo: string, parseFile: string, userList: string}}
 */
const enumRouter = {
	rootPath: "",
	login: "login",
	register: "register",
	testDemo: "test/demo",
	testParseFile: "test/parseFile",
	
	/*
	 |-----------------------------------------------
	 | 用户-相关的路由
	 |-----------------------------------------------
	 */
	userList: "user/list",
};
export default helper.immutable(enumRouter, value => ENV.rootPath.trim() + flowRight(helper.removeTrailingSlash, helper.removeBlank)(value));
