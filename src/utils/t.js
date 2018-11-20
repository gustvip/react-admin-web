/**
 * Created by joey on 2018/2/18
 */
import * as queryString from './core/queryString';
import helper from './core/helper';
import prompt from './core/prompt';
import auth, {AuthComponent} from './core/auth';
import regExp from './core/regexp';
import localStorage from './core/localStorage/index';
import emitter from './core/emitter/index';
import * as decorate from './core/decorate';
import * as request from './core/request';
import crypto from './core/crypto';
import classNames from 'classnames';
import update from 'immutability-helper';

/**
 * @type {{update: (<T, C extends CustomCommands<object>=never>(target: T, spec: Spec<T, C>) => T) | update, classNames: ClassNamesExport | classNames, queryString: {extract?, parse?, stringify?, parseUrl?}, crypto: Crypto, emitter, prompt: Prompt, regExp: {name(*=, *=, *=): *, password(*=, *=, *=): *, url: RegExp, email: RegExp, html: RegExp, ip: RegExp, chinese: RegExp, telephone: RegExp}, helper: Helper, auth: Auth, AuthComponent: AuthComponent, decorate: {contextTypes?, propTypes?}, request: {get?, post?, postJSON?, upload?, del?, put?, form?, all?}, localStorage: {length: *, clearExpired: clearExpired, setItem: setItem, getItem: (function(String): undefined), keepItemExpire: keepItemExpire, updateItemExpire: updateItemExpire, updateItemValue: updateItemValue, removeItem: removeItem, clear: clear}}}
 */
const T = {
	update,
	
	classNames,
	
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
	
	// 权限相关
	auth,
	
	// 权限组件
	AuthComponent,
	
	// 装饰器
	decorate,
	
	// axios二次封装
	request,
	
	// LocalStorage
	localStorage,
};
export default T;
