/**
 * Created by joey on 2018/02/19
 */
import helper from "utils/core/helper";
import identity from "lodash/identity";
import flowRight from "lodash/flowRight";

const _userAPI = api => window.ENV.apiDomain + api;

/**
 * @type {{userLogin: *, userAdd: *, userDelete: *, userDetail: *, userUpdate: *, userSearch: *, userList: *, userParseXlsx: *, userParseCsv: *, userDownJson: *}}
 */
const API = {
	/*
   |----------------------------------------------------------------
   | 用户相关API地址
   |----------------------------------------------------------------
   */
	userLogin: _userAPI("/user/login"),
	userAdd: _userAPI("/user/add"),
	userDelete: _userAPI("/user/delete"),
	userDetail: _userAPI("/user/detail"),
	userUpdate: _userAPI("/user/update"),
	userSearch: _userAPI("/user/search"),
	userList: _userAPI("/user/list"),
	userParseXlsx: _userAPI("/user/parseXlsx"),
	userParseCsv: _userAPI("/user/parseCsv"),
	userDownJson: _userAPI("/user/downJson"),
};
export default helper.immutable(API, flowRight(helper.removeTrailingSlash, helper.removeBlank, identity));
