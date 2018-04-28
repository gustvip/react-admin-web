/**
 * created by joey 2018/02/20
 */
import ENV from 'ENV'

var localStorageInstance = (function () {
  var toString = Object.prototype.toString
  
  /**
   * 验证函数
   * null 和 undefined浪费空间,没有意义
   */
  function isObject (x) {
    return toString.call(x) === '[object Object]'
  }
  
  function isString (x) {
    return toString.call(x) === '[object String]'
  }
  
  function isBoolean (x) {
    return toString.call(x) === '[object Boolean]'
  }
  
  function isNumber (x) {
    return toString.call(x) === '[object Number]'
  }
  
  function isArray (x) {
    return Array.isArray(x)
  }
  
  function canJSON (x) {
    return isObject(x) || isString(x) || isNumber(x) || isObject(x) || isArray(x) || isBoolean(x)
  }
  
  /**
   * 判断是否新鲜
   * @param {Number} expTime
   * @returns {Boolean}
   */
  function isFresh (expTime) {
    return expTime === NO_EXPIRE || (isNumber(expTime) && isFinite(expTime) && expTime - Date.now() > 0)
  }
  
  /**
   * 更新localStorage
   * @param {String} key
   * @param {String || Number || Boolean || Object || Array} value
   */
  function update (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  
  /**
   * 无限期
   * @type {number}
   */
  var NO_EXPIRE = 0
  
  return function _constructor (STORAGE_KEY) {
    if (!isString(STORAGE_KEY)) {
      throw new TypeError('storage key must be string')
    }
    
    /**
     * 临时存储的变量
     * @type {Object}
     */
    var storageValue = (function () {
      var result = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
      return isObject(result) ? result : {}
    })()
    
    /**
     * 定义localStorage原型方法
     */
    Object.defineProperties(_constructor.prototype, {
      /**
       * 定义length
       * @return {Number}
       */
      'length': {
        get: function () {
          this.clearExpired()
          
          return Object.keys(storageValue).length
        },
        configurable: false,
      },
      
      /**
       * 返回localStorage的所有值
       * @return {Object}
       */
      'getAll': {
        value: function () {
          this.clearExpired()
          
          return JSON.parse(JSON.stringify(storageValue))
        },
        configurable: false,
      },
      
      /**
       * 设置localStorage
       * @param {String} key 名称
       * @param {String || Number ||  Boolean || Array || Object} value 设置的值
       * @param {Number} expTime 过期时间
       * @return {_constructor}
       */
      'setItem': {
        value: function (key, value, expTime) {
          this.clearExpired()
          expTime = parseInt(expTime, 10)
          
          /**
           * value不可序列化直接返回
           */
          if (!canJSON(value)) {
            console.warn('设置的值不可序列化，请重新设置')
            return this
          }
          
          /**
           * expTime的判断---不是有限Number或者小于0--将其设置为无限期
           */
          if (!isFinite(expTime) || expTime < 0) {
            expTime = NO_EXPIRE
          }
          
          /**
           * 设置并更新localStorage的值
           */
          storageValue[key] = {
            value,
            expire: expTime === NO_EXPIRE ? NO_EXPIRE : expTime + Date.now(),
          }
          update(STORAGE_KEY, storageValue)
          
          return this
        },
        configurable: false,
      },
      
      /**
       * 获取localStorage某一项的值
       * @param {String} key 数据名
       * @returns {String || Boolean || Number || Array || Object}
       */
      'getItem': {
        value: function (key) {
          this.clearExpired()
          
          var storage = storageValue[key]
          if (storage) {
            return storage.value
          }
        },
        configurable: false,
      },
      
      /**
       * 续期localStorage的expire
       * @param {String} key 数据名
       * @param {Number} expTime 过期时间
       * @return {_constructor}
       */
      'keepExpire': {
        value: function (key, expTime) {
          this.clearExpired()
          var storage = storageValue[key]
          expTime = parseInt(expTime)
          
          if (storage && isFinite(expTime)) {
            storage.expire = storage.expire + expTime
            update(STORAGE_KEY, storageValue)
            
            return true
          } else {
            return false
          }
        },
        configurable: false,
      },
      
      /**
       * 更新localStorage的expire
       * @param {String} key 数据名
       * @param {Number} expTime 过期时间
       * @return {_constructor}
       */
      'updateExpire': {
        value: function (key, expTime) {
          this.clearExpired()
          var storage = storageValue[key]
          expTime = parseInt(expTime)
          /**
           * expTime的判断---不是有限Number或者小于0--将其设置为无限期
           */
          if (!isFinite(expTime) || expTime < 0) {
            expTime = NO_EXPIRE
          }
          
          if (storage) {
            storage.expire = expTime === NO_EXPIRE ? NO_EXPIRE : Date.now() + expTime
            update(STORAGE_KEY, storageValue)
            
            return true
          } else {
            return false
          }
        },
        configurable: false,
      },
      
      /**
       * 删除localStorage的某一项数据---固定信息不可删除
       * @param {string} key 数据名
       * @return {_constructor}
       */
      'removeItem': {
        value: function (key) {
          this.clearExpired()
          
          delete storageValue[key]
          update(STORAGE_KEY, storageValue)
          
          return this
        },
        configurable: false,
      },
      
      /**
       * 清空本地数据---固定信息不可删除
       * @return {_constructor}
       */
      'clear': {
        value: function () {
          storageValue = {}
          update(STORAGE_KEY, storageValue)
          
          return this
        },
        configurable: false,
      },
      
      /**
       * 清空过期的数据
       * @return {_constructor}
       */
      'clearExpired': {
        value: function () {
          for (var key in storageValue) {
            if (storageValue.hasOwnProperty(key)) {
              var value = storageValue[key]
              if (!isObject(value) || !canJSON(value.value) || !isFresh(value.expire)) {
                delete storageValue[key]
              }
            }
          }
          
          update(STORAGE_KEY, storageValue)
          
          return this
        },
        configurable: false,
      },
    })
    
    /**
     * 清除localStorage中过期的数据
     */
    this.clearExpired()
  }
})()

export default new localStorageInstance(ENV.localStorage.mainKeyName)

