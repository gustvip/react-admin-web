/**
 * Created by joey on 18-2-7
 */

import T from 'utils/t'
import EnumDefaultMenus from 'constants/enum_default_menus'

/**
 * location.pathname和分类值的对应关系
 * @type {{[location.pathname]:{category:String}}}
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
    let resultUrl = []
    let resultChildren = []
    
    if (T.helper.checkArray(children)) {
      resultChildren = children.map(item => {
        if (T.helper.checkArray(item.children)) {
          const result = formatData(item.children)
          resultUrl = resultUrl.concat(result.resultUrl)
          
          return T.lodash.assign(
            {},
            item,
            {
              children: result.resultChildren,
              url: T.lodash.uniq(
                (Array.isArray(item.url)
                    ? item.url
                    : T.helper.checkString(item.url)
                      ? [item.url]
                      : []
                ).concat(result.resultUrl),
              ),
            },
          )
        } else {
          
          if (Array.isArray(item.url) || T.helper.checkString(item.url)) {
            resultUrl = resultUrl.concat(item.url)
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
      {
        children: result.resultChildren,
        url: T.lodash.uniq(
          (Array.isArray(item.url)
              ? item.url
              : T.helper.checkString(item.url)
                ? [item.url]
                : []
          ).concat(result.resultUrl),
        ),
      },
    )
  })
  
  mapUrlToCategory = T.helper.immutable(mapUrlToCategory)
  return T.helper.immutable(menuData)
})()

/**
 * 获取window.location.pathname对应的分类数据
 * @param {String} locationPathname window.location.pathname
 * @return {String || null}
 */
export const getCategoryData = locationPathname => {
  const result = mapUrlToCategory[T.lodash.flowRight(T.helper.removeTrailingSlash, T.helper.removeBlank)(locationPathname)]
  
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
 * 获取分类路由
 * @param {String} locationPathname window.location.pathname
 * @return {Array}
 */
export const getCategoryRoute = locationPathname => T.lodash.flowRight(getCategoryChildrenData, getCategoryData)(locationPathname)

/**
 * 获取window.location.pathname对应的菜单数据
 * @param {String} locationPathname window.location.pathname
 * @return {Array}
 */
export const getMenuData = locationPathname => {
  locationPathname = T.lodash.flowRight(T.helper.removeTrailingSlash, T.helper.removeBlank)(locationPathname)
  const result = T.lodash.find(getCategoryRoute(locationPathname), item => item.url.indexOf(locationPathname) !== -1)
  
  return T.helper.isObject(result)
    ? Array.isArray(result.children)
      ? result.children
      : []
    : []
}

/**
 * 获取菜单打开的数组
 * @param {String} locationPathname window.location.pathname
 * @return {Array}
 */
export const getOpenKeys = locationPathname => {
  locationPathname = T.lodash.flowRight(T.helper.removeTrailingSlash, T.helper.removeBlank)(locationPathname)
  const dataSource = getMenuData(locationPathname)
  const data = [];
  
  (function fn (_dataSource) {
    /**
     * 从顶层开始判断当前的location.pathname是否在其中
     * 如果在将对应的url[0]添加到返回的data中
     * 如果该行的children为长度大于0的数组则继续递归
     */
    const result = T.lodash.find(_dataSource, item => item.url.indexOf(locationPathname) !== -1)
    if (result) {
      data.push(result.url[0])
      T.helper.checkArray(result.children) && fn(result.children)
    }
  })(dataSource)
  
  return data.slice(0, data.length - 1)
}
