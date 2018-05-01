/**
 * Created by joey on 18-2-7
 */

import T from 'utils/T'
import EnumDefaultMenus from 'constants/EnumDefaultMenus'
import helper from '../../utils/core/helper'

/**
 * window.location.pathname和分类值的对应关系
 * @type {{[window.location.pathname]:{category:String}}}
 */
let mapUrlToCategory = {}

/**
 * 配置菜单文件
 * @return {Array}
 */
export const EnumMenus = (() => {
  /**
   * 格式化数据
   * @param {Array} children
   * @return {{resultChildren: Array, resultUrl: Array}}
   */
  const formatData = children => {
    /**
     * 定义返回parent的url和children
     * 注意children的url和遍历的url不能混为一谈
     *        parent的url包含children的url
     *        children的url在遍历中定义----最后再和parent连接
     */
    let resultUrl = []
    let resultChildren = []
    
    if (T.helper.checkArray(children)) {
      resultChildren = children.map(item => {
        let itemUrl = []
        
        /**
         * url的处理
         */
        if (Array.isArray(item.url) || T.helper.checkString(itemUrl)) {
          resultUrl = resultUrl.concat(item.url)
          itemUrl = itemUrl.concat(item.url)
        }
        
        if (T.helper.checkArray(item.children)) {
          const result = formatData(item.children)
          /**
           * 注意返回的url和当前的url连接---去重
           */
          itemUrl = T.lodash.uniq(result.resultUrl.concat(itemUrl))
          
          /**
           * 在children下的所有和parent的url连接---去重
           */
          resultUrl = T.lodash.uniq(resultUrl.concat(itemUrl))
          
          return T.lodash.assign(
            {},
            item,
            {
              children: result.resultChildren,
              url: Array.isArray(item.url)
                ? T.lodash.uniq(item.url.concat(itemUrl))
                : T.helper.checkString(item.url)
                  ? T.lodash.uniq([item.url].concat(itemUrl))
                  : [],
            },
          )
        } else {
          
          if (helper.checkString(item.url)) {
            resultUrl = T.lodash.uniq(resultUrl.concat(item.url))
          }
          
          return T.lodash.assign(
            {},
            item,
            {
              children: [],
              url: Array.isArray(item.url)
                ? T.lodash.uniq(item.url)
                : T.helper.checkString(item.url)
                  ? [item.url]
                  : [],
            },
          )
        }
      })
    }
    return {resultChildren, resultUrl}
  }
  
  const menuData = EnumDefaultMenus.map(item => {
    const result = formatData(item.children)
    /**
     * url和category的映射
     */
    result.resultUrl.forEach(locationPathname => {
      mapUrlToCategory[locationPathname] = {category: item.value}
    })
    
    return T.lodash.assign(
      {},
      item,
      {children: result.resultChildren, url: T.lodash.uniq(item.url.concat(result.resultUrl))},
    )
  })
  
  mapUrlToCategory = T.helper.immutable(mapUrlToCategory, null)
  return T.helper.immutable(menuData, null)
})()

/**
 * 获取window.location.pathname对应的分类数据
 * @param {String} locationPathname window.location.pathname
 * @return {String || null}
 */
export const getCategoryData = locationPathname => {
  locationPathname = T.lodash.flowRight(T.helper.removeTrailingSlash, T.helper.removeBlank)(locationPathname)
  const result = mapUrlToCategory[locationPathname]
  
  return T.helper.isObject(result) ? result.category : null
}

/**
 * 获取window.location.pathname对应的分类的children数据
 * @param {String} category
 * @return {Array}
 */
export const getCategoryChildrenData = category => {
  const result = T.lodash.find(EnumMenus, item => item.value === category)
  
  return T.helper.isObject(result)
    ? Array.isArray(result.children)
      ? result.children
      : []
    : []
}

/**
 * 获取window.location.pathname的分类路由
 * @param {String} locationPathname window.location.pathname
 * @return {Array}
 */
export const getCategoryRoute = locationPathname => {
  const result = T.lodash.flowRight(getCategoryChildrenData, getCategoryData, T.helper.removeTrailingSlash, T.helper.removeBlank)(locationPathname)
  
  return Array.isArray(result) ? result : []
}

/**
 * 获取window.location.pathname对应的菜单数据
 * @param {String} locationPathname window.location.pathname
 * @return {Array}
 */
export const getMenuData = locationPathname => {
  const data = getCategoryRoute(locationPathname)
  const result = T.lodash.find(data, item => item.url.indexOf(locationPathname) !== -1)
  
  return T.helper.isObject(result)
    ? Array.isArray(result.children)
      ? result.children
      : []
    : []
}

/**
 * 获取window.location.pathname的菜单打开的数组
 * @param {String} locationPathname window.location.pathname
 * @return {Array}
 */
export const getOpenKeys = locationPathname => {
  locationPathname = T.lodash.flowRight(T.helper.removeTrailingSlash, T.helper.removeBlank)(locationPathname)
  const dataSource = getMenuData(locationPathname)
  const data = [];
  
  (function fn (_dataSource) {
    /**
     * 从顶层开始判断当前的window.location.pathname是否在其中
     * 如果在将对应的url[0]添加到返回的data中
     * 如果该行的children为长度大于0的数组则继续递归
     */
    const result = T.lodash.find(_dataSource, item => item.url.indexOf(locationPathname) !== -1)
    if (result) {
      data.push(result.url[0])
      T.helper.checkArray(result.children) && fn(result.children)
    }
  })(dataSource)
  
  return data
}
