/**
 * Created by joey on 2018/2/18
 */

import cookies from 'js-cookie'
import queryString from 'query-string'

import lodash from 'lodash'
import helper from './core/helper'
import prompt from './core/prompt'
import auth from './core/auth'
import regExp from './core/reg_exp'
import localStorage from './core/local_storage'
import * as decorator from './core/decorator'
import * as request from './core/request'

/**
 *
 * @type {{prompt: Prompt, regExp: *, helper: Helper, socket: Socket, auth: Auth, decorator, request, localStorage, lodash: {compact, difference, differenceBy, differenceWith, drop, dropWhile, dropRight, dropRightWhile, first, header, flatten, flattenDeep, flattenDepth, initial, intersection, intersectionBy, intersectionWith, tail, take, takeWhile, takeRight, takeRightWhile, union, unionBy, unionWith, uniq, uniqBy, uniqWith, xor, xorBy, xorWith, each, forEach, eachRight, forEachRight, groupBy, keyBy, orderBy, partition, size, sortBy, curry, curryRight, delay, wrap, flow, flowRight, clone, cloneWith, cloneDeep, cloneDeepWith, eq, isArguments, isArray, isArrayLike, isArrayLikeObject, isBoolean, isDate, isElement, isEmpty, isEqual, isEqualWith, isError, isFunction, isInteger, isLength, isNil, isNull, isNumber, isObject, isObjectLike, isPlainObject, isRegExp, isSafeInteger, isString, isUndefined, toInteger, toSafeInteger, ceil, floor, max, maxBy, mean, meanBy, min, minBy, round, sum, sumBy, clamp, inRange, random, at, findKey, findLastKey, get, has, keys, merge, mergeWith, pick, pickWith, set, unset, update, escape, capitalize, lowerCase, upperCase, toLower, toUpper, range, rangeRight, times, uniqueId}, cookies: *, queryString, onfire: *, moment: (moment | ((inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, language?: string, strict?: boolean) => moment.Moment) | ((inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, strict?: boolean) => moment.Moment))}}
 */
const T = {
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
  
  // axios
  request,
  
  // localStorage
  localStorage,
  
  // 说明文档: https://lodash.com/docs/4.17.5
  lodash,
  
  // 说明文档: https://github.com/js-cookie/js-cookie
  cookies,
  
  // 说明文档: https://github.com/sindresorhus/query-string
  queryString,
}
export default T

