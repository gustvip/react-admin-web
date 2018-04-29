import moment from 'moment'
import _ from 'lodash'
import classNames from 'classnames'

class Helper {
  /**
   * ant-design排序
   * @param {Object} prev
   * @param {Object} now
   * @param {String} property
   * @return {number}
   */
  sort ({prev, now, property} = {}) {
    const prevValue = _.get(prev, property)
    const nowValue = _.get(now, property)
    if (prevValue < nowValue) {
      return -1
    } else if (prevValue > nowValue) {
      return 1
    } else {
      return 0
    }
  }
  
  /**
   * @param {*} data
   * @param {[Function]} callBack
   * @param {[Boolean]} enumerable 属性是否可以枚举
   * @return {*}
   */
  immutable (data, callBack, enumerable = true) {
    const _this = this
    callBack = _.isFunction(callBack) ? callBack : value => value
    
    return (function fn (_data) {
      let result = _data
      
      if (_this.isObject(_data) || Array.isArray(_data)) {
        result = Array.isArray(_data) ? [] : {}
        _.each(_data, (value, key) => {
          Object.defineProperty(result, key, {
            value: fn(callBack(value, key)),
            enumerable,
          })
        })
      }
      
      return result
    })(data)
  }
  
  /**
   * 设置class
   * @param {[*]} basisClass 不是字符串，默认为iconfont,不想加传递''
   * @return {Function}
   */
  classNames (basisClass) {
    return (...rest) => classNames(_.isString(basisClass) ? basisClass : 'iconfont', ...rest)
  }
  
  /**
   * 字符串类型的渲染默认值
   * @param {String}    val  检测的字段
   * @param {[String]}    defaultVal  不满足条件的默认值
   * @return {String}
   */
  showValue (val, defaultVal = '-') {
    return (this.checkString(val) || this.isUsefulNumber(val)) ? val : defaultVal
  }
  
  /**
   * 检测长度大于0的数组或者类数组对象---Array,nodeList
   * @param {*} x
   * @return {Boolean}
   */
  checkArray (x) {
    return Array.isArray(x) && x.length > 0
  }
  
  /**
   * 检测去除左右空白后长度大于0的字符串
   * @param {*} x
   * @return {Boolean}
   */
  checkString (x) {
    return _.isString(x) && x.trim().length > 0
  }
  
  /**
   * 是否为纯的对象
   * @param x
   * @return {boolean}
   */
  isObject (x) {
    return Object.prototype.toString.call(x) === '[object Object]'
  }
  
  /**
   * 检测不为NaN、Infinity、-Infinity的Number
   * @param {*} x
   * @return {Boolean}
   */
  isUsefulNumber (x) {
    return _.isNumber(x) && isFinite(x)
  }
  
  /**
   * 去除尾部下划线
   * @param {String} x
   */
  removeTrailingSlash (x) {
    return /\/$/.test(x) ? x.slice(0, x.length - 1) : x
  }
  
  /**
   * 去除字符串的空白
   * @param {String} x
   * @return {* | String}
   */
  removeBlank (x) {
    return _.isString(x) ? [].filter.call(x, val => val).join('') : x
  }
  
  /**
   * 根据值查找路径
   * @param {Array} data
   * @param {*} stopValue 停止的值
   * @param {Function} stopCallback 停止的回调
   * @param {[Function]} resultCallback 如果没有,stopCallback替换
   * @param {[String]} childrenProperty 递归的属性名称
   * @return {Array}
   */
  findPath ({data, stopValue, stopCallback, resultCallback, childrenProperty = 'children'} = {}) {
    data = Array.isArray(data) ? data.slice() : []
    resultCallback = resultCallback ? resultCallback : stopCallback
    
    let tag = false
    let index = 0
    let array = []
    const len = data.length
    
    while (!tag && index < len) {
      (function fn (_data, _array) {
        /**
         * 将值添加到数组---无条件
         */
        const val = stopCallback(_data)
        _array.push(resultCallback(_data))
        
        if (val === stopValue) {
          array = _array
          tag = true
        } else {
          const childData = _.get(_data, childrenProperty)
          const len = childData.length
          let index = 0
          while (index < len && !tag) {
            fn(childData[index++], _array.slice())
          }
        }
        
      })(data[index++], array.slice())
    }
    return array
  }
  
  /**
   * 格式化树状数据
   * @param {Array} data
   * @param {Function} resultCallback 每一轮的返回值
   * @param {String} [childrenName] 递归的属性名称---默认"children"
   * @return {Array}
   */
  formatTree ({data, resultCallback, childrenName = 'children'} = {}) {
    data = _.isArray(data) ? data.slice() : []
    const _this = this
    
    return (function fn (_data) {
      return _data.map(item => {
        const children = _.get(item, childrenName)
        const info = resultCallback(item)
        
        if (_this.checkArray(children)) {
          info[childrenName] = fn(children)
        } else {
          info[childrenName] = []
        }
        
        return info
      })
    })(data)
  }
  
  /**
   * 跳转页面
   * @param {String} url
   * @param {Number} timeout
   */
  redirect (url, timeout) {
    if (this.isUsefulNumber(url) && _.isNil(timeout)) {
      timeout = Math.round(url)
      url = null
    }
    
    setTimeout(function () {
      location.href = url || location.href
    }, timeout || 0)
  }
  
  /**
   * 浮点型保留小数
   * @param {*} num 要转化的数字
   * @param {Number} fixNum 小数位数
   * @param {String} defaultVal 格式化错误的默认值
   * @return {String}
   */
  toFixed (num, fixNum = 2, defaultVal = '-') {
    num = Number(num)
    return !isFinite(num) ? defaultVal : num.toFixed(fixNum)
  }
  
  /**
   * 时间格式化
   * @param {*} date
   * @param {String} template
   * @return {String}
   */
  formatDate (date, template = 'YYYY-MM-DD HH:mm:ss') {
    return moment(
      this.isUsefulNumber(date) ? Math.round(date) : Date.now(),
    ).format(template)
  }
  
  /**
   * 将字节根据大小自动转换成适应的单位大小
   * @param {*} size 字节大小
   * @param {Number} fixNum 保留小数位数
   * @param {String} defaultVal 不是类似数字时显示的默认值
   * @returns {string}
   */
  autoToSize (size, fixNum = 0, defaultVal = '-') {
    /**
     * 不是类似数字
     */
    if (!this.isUsefulNumber(size)) {
      return defaultVal
    }
    
    /**
     * 以b字节输出
     * toFixed(0)，会自动四舍五入，防止如1023.8b转化为1024kb这种情况
     * 下面的同理
     */
    let middleValue = fixNum === 0 ? Math.round(size / Math.pow(1024, 0)) : size / Math.pow(1024, 0)
    if (middleValue < Math.pow(1024, 1)) {
      return this.toFixed(size * Math.pow(1024, 0), fixNum, defaultVal) + 'B'
    }
    
    /**
     * 以kb字节输出
     */
    middleValue = fixNum === 0 ? Math.round(size / Math.pow(1024, 1)) : size / Math.pow(1024, 1)
    if (middleValue < Math.pow(1024, 1)) {
      return this.byteToKb(size / Math.pow(1024, 0), fixNum, defaultVal)
    }
    
    /**
     * 以Mb字节输出
     */
    middleValue = fixNum === 0 ? Math.round(size / Math.pow(1024, 2)) : size / Math.pow(1024, 2)
    if (middleValue < Math.pow(1024, 1)) {
      return this.kbToMb(size / Math.pow(1024, 1), fixNum, defaultVal)
    }
    
    /**
     * 以Gb字节输出
     */
    middleValue = fixNum === 0 ? Math.round(size / Math.pow(1024, 3)) : size / Math.pow(1024, 3)
    if (middleValue < Math.pow(1024, 1)) {
      return this.mbToGb(size / Math.pow(1024, 2), fixNum, defaultVal)
    }
    
    /**
     * 以tb字节输出
     * 只转化到这一步
     */
    return this.gbToTb(size / Math.pow(1024, 3), fixNum, defaultVal)
  }
  
  /**
   * Gb转换成Tb
   * @param {Number} size
   * @param {Number} fixNum 保留小数的位数
   * @param {String} defaultVal  格式化错误的默认值
   * @return {String}
   */
  gbToTb (size, fixNum = 2, defaultVal = '-') {
    return this.toFixed(size / Math.pow(1024, 1), fixNum, defaultVal) + ' TB'
  }
  
  /**
   * Mb转换成Gb
   * @param {Number} size
   * @param {Number} fixNum 保留小数的位数
   * @param {String} defaultVal  格式化错误的默认值
   * @return {String}
   */
  mbToGb (size, fixNum = 2, defaultVal = '-') {
    return this.toFixed(size / Math.pow(1024, 1), fixNum, defaultVal) + ' GB'
  }
  
  /**
   * Kb转换成Mb
   * @param {Number} size
   * @param {Number} fixNum 保留小数的位数
   * @param {String} defaultVal  格式化错误的默认值
   * @return {String}
   */
  kbToMb (size, fixNum = 2, defaultVal = '-') {
    return this.toFixed(size / Math.pow(1024, 1), fixNum, defaultVal) + ' MB'
  }
  
  /**
   * byte转换成 kb
   * @param {Number} size
   * @param {Number} fixNum 保留小数的位数
   * @param {String} defaultVal  格式化错误的默认值
   * @return {String}
   */
  byteToKb (size, fixNum = 2, defaultVal = '-') {
    return this.toFixed(size / Math.pow(1024, 1), fixNum, defaultVal) + ' KB'
  }
}

export default new Helper()

