(function() {
	'use strict';
	var rootPath = '/pw/';
	var apiDomain = 'http://localhost:8081';
	var mockDomain = 'http://localhost:8081';
	
	Object.defineProperty(window, 'ENV', {
		value: immutable({
			apiDomain: apiDomain,         // api请求接口
			mockDomain: mockDomain,         // mock的api请求接口
			rootPath: rootPath,                       	// 路由的根路径
			apiSuccessCode: 0,                          // api响应成功的code
			apiFailCode: 900,                          // api响应失败的code
			defaultQuery: 'redirect_uri',							// 跳转时search的key
			
			login: {
				auth: 'auth',   // 登陆成功权限的key
				userDetail: 'userDetail',   // 登陆成功用户详细信息的key
				
				isCheckLogin: true,                            // web端是否验证登录
				defaultRedirectUrl: rootPath + 'test/demo',  // 登录成功默认重定向的url
				loginUrl: rootPath + 'login',                   // 登录页面url
				noCheckIsLoginRoutes: [    						// 不需要验证是否登录的路由配置
					rootPath + 'login'
				],
			},
			
			localStorage: {
				login: {
					key: '__LOGIN_USER_INFO__',		// login的key
					value: '__LOGIN_USER_INFO__',									// login的value
					expire: 24 * 60 * 60 * 1000,		// login的expire
				},
				userInfo: {
					key: '__USER_INFO__',		// userInfo的key
					expire: 24 * 60 * 60 * 1000,		// userInfo的expire
				},
			},
			
		}, null),
		configurable: false,
	});
	
	function isObject(x) {
		return Object.prototype.toString.call(x) === '[object Object]';
	}
	
	function immutable(data, callback) {
		callback = callback ? callback : function(value, key) {
			return value;
		};
		
		return (function fn(_data) {
			var result = _data;
			if (Array.isArray(_data)) {
				result = [];
				_data.forEach(function(value, key) {
					Object.defineProperty(result, key, {
						value: fn(callback(value, key)),
						configurable: false,
					});
				});
			} else if (isObject(_data)) {
				result = {};
				for (var key in _data) {
					if (Object.prototype.hasOwnProperty.call(_data, key)) {
						Object.defineProperty(result, key, {
							value: fn(callback(_data[key], key)),
							configurable: false,
						});
					}
				}
			}
			return result;
		})(data);
	}
})();
