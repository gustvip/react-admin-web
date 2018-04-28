/**
 * created by joey 2018/02/19
 */
import helper from 'utils/core/helper'

const rootPath = '/'

export default helper.immutable({
  apiDomain: 'http://localhost:8081',         // api请求接口   测试服务器
  rootPath: rootPath,                       	// 路由的根路径
  apiSuccessCode: 0,                          // api响应成功的code
  apiFailCode: 900,                          // api响应失败的code
  defaultQuery: 'redirect_uri',							// 跳转时search的key
  
  /**
   * 登陆配置
   */
  login: {
    isCheckLogin: true,                            // web端是否验证登录
    defaultRedirectUrl: rootPath + 'user/list',  // 登录成功默认重定向的url
    loginUrl: rootPath + 'login',                   // 登录页面url
    noCheckIsLoginRoutes: [    						// 不需要验证是否登录的路由配置
      rootPath + 'login',
    ],
  },
  
  /**
   * localStorage配置
   */
  localStorage: {
    mainKeyName: '__STORAGE__', 			// 私有localStorage的key
    login: {
      key: '__LOGIN_USER_INFO__',		// 私有localStorage的key下的登陆的key
      value: true,									// 私有localStorage的key下的登陆的value
      expire: 24 * 60 * 60 * 1000		// 私有localStorage的key下的登陆的expire
    },
  },
  
  /**
   * websocket配置
   */
  socket: {
    etl: {
      isStart: true,                          // 是否开启etl websocket服务
      domain: 'ws://10.0.3.179:9091',         // etl websocket domain地址
      opts: {
        path: '/pubsub',
      },
    },
  },
  
  /**
   * 单元测试配置
   */
  mock: {
    apiDomain: 'http://localhost:8180',     // mockApi请求接口
    isStart: false,                         // 是否开启mock
  },
}, null)

