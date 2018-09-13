/**
 * Created by joey on 2018/02/19
 */

import helper from "utils/core/helper";
import flowRight from "lodash/flowRight";

/**
 * @type {{rootPath: string, login: string, userAdd: string, userEdit: string, userList: string}}
 */

export default helper.immutable({
	rootPath: "",
	login: "login",
	register: "register",
	testDemo: "test/demo",

	/*
	 |-----------------------------------------------
	 | 用户-相关的路由
	 |-----------------------------------------------
	 */
	userList: "user/list",
}, value => ENV.rootPath.trim() + flowRight(helper.removeTrailingSlash, helper.removeBlank)(value));
