/**
 * Created by joey on 2018/6/20
 */
export default (function () {
  'use strict'
  
  /**
   * 是否为函数
   * @param {*} x
   * @returns {boolean}
   */
  function isFunction (x) {
    return typeof x === 'function'
  }
  
  /**
   * 查找符合条件的索引
   * @param {String || Array} x
   * @param {Function} predicate
   * @returns {number}
   */
  function findIndex (x, predicate) {
    var len = x.length,
      k = -1,
      kValue
    while (++k < len) {
      kValue = x[k]
      if (predicate(kValue, k, x)) return k
    }
    return -1
  }
  
  /**
   * 判断是否为null或者undefined
   * @param {*} x
   * @returns {boolean}
   */
  function isNil (x) {
    return x == null
  }
  
  /**
   * 增加监听函数
   * @param {String} type 类型
   * @param {Function} callback 回掉函数
   * @param {Boolean} [isOnce] 是否是一次性
   * @returns {Undefined}
   */
  function addListener (type, callback, isOnce) {
    if (!isFunction(callback)) {
      throw new TypeError('callback must be function')
    }
    isOnce = !!isOnce
    var row = this.__selfListeners__[type],
      obj = {isOnce: isOnce, callback: callback}
    row ? row.push(obj)
      : this.__selfListeners__[type] = [obj]
    
    return this
  }
  
  /**
   * 移除监听的函数
   * @param {String} [type] 类型
   * @param {Function} [callback] 监听时的id
   * @returns {Undefined}
   */
  function removeListener (type, callback) {
    var row = this.__selfListeners__[type],
      index
    
    if (isNil(type) && isNil(callback)) {
      this.__selfListeners__ = {}
    } else if (row && !isFunction(callback)) {
      delete this.__selfListeners__[type]
    } else if (row && isFunction(callback)) {
      index = findIndex(row, function (value) {
        return value.callback === callback
      })
      if (index !== -1) {
        if (row.length > 1) {
          row.splice(index, 1)
        } else {
          delete this.__selfListeners__[type]
        }
      }
    }
    
    return this
  }
  
  /**
   * 促发监听的函数
   * @param {String} type 监听时的类型
   * @returns {Undefined}
   */
  function trigger (type) {
    var row = this.__selfListeners__[type],
      arg = arguments
    if (row && row.length) {
      this.__selfListeners__[type] = row.filter(function (value) {
        value.callback.apply(null, [].slice.call(arg, 1))
        return !value.isOnce
      })
      if (this.__selfListeners__[type].length === 0) {
        delete this.__selfListeners__[type]
      }
    }
    
    return this
  }
  
  function _emmiter () {
    this.__selfListeners__ = {}
  }
  
  Object.defineProperties(_emmiter.prototype, {
    on: {
      value: addListener,
      configuarable: false,
    },
    addListener: {
      value: addListener,
      configuarable: false,
    },
    off: {
      value: removeListener,
      configuarable: false,
    },
    removeListener: {
      value: removeListener,
      configuarable: false,
    },
    trigger: {
      value: trigger,
      configuarable: false,
    },
    emit: {
      value: trigger,
      configuarable: false,
    },
    dispatch: {
      value: trigger,
      configuarable: false,
    },
  })
  
  return _emmiter
})()
