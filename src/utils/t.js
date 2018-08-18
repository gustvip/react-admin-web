/**
 * Created by joey on 2018/2/18
 */
import numeral from 'numeral';
import queryString from 'query-string';
import lodash from 'lodash';

import helper from './core/helper';
import prompt from './core/prompt';
import auth from './core/auth';
import regExp from './core/reg_exp';
import localStorage from './core/local_storage';
import emitter from './core/emitter';
import * as decorator from './core/decorator';
import * as request from './core/request';
import crypto from './core/crypto';

const T = {
	
	// 说明文档: https://lodash.com/docs/4.17.5
	lodash,
	
	// 说明文档: https://github.com/sindresorhus/query-string
	queryString,
	
	// 说明文档: http://numeraljs.com/
	numeral,
	
	// 加密算法
	crypto,
	
	// 事件监听
	emitter,
	
	// 确认弹窗
	prompt,
	
	// 常用正则
	regExp,
	
	// 常用自己封装的方法
	helper,
	
	// 权限
	auth,
	
	// 装饰器
	decorator,
	
	// axios二次封装
	request,
	
	// localStorage
	localStorage,
};
export default T;

