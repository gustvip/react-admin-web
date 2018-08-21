/**
 * Created by joey on 2018/2/18
 */
import queryString from 'query-string';
import lodash from 'lodash';

import helper from './core/helper';
import prompt from './core/prompt';
import auth from './core/auth';
import regExp from './core/regexp';
import localStorage from './core/localStorage';
import emitter from './core/emitter/index';
import * as decorator from './core/decorator';
import * as request from './core/request';
import crypto from './core/crypto';
import collection from './core/collection';

const T = {
	// 集合操作
	collection,
	
	// 说明文档: https://lodash.com/docs/4.17.5
	lodash,
	
	// 说明文档: https://github.com/sindresorhus/query-string
	queryString,
	
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

