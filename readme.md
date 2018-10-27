1.项目目录结构说明
```
|--build
|    |--webpack.config.base.js       	// webpack打包基础配置文件
|    |--server.js       	// webpack打包开发环境下配置文件
|    |--webpack.config.prod.js        // webpack打包生产环境下配置文件
|    |--util.js      								 	// 小工具
|    |--publish.js       							// 项目发布文件
|--public
| *  |--config          			// 发布配置目录（定义一个全局对变量。详细见文件说明）
|    |--index.html      			// 发布入口文件
|    |--assets      					// 本地依赖文件。如antd-design字体本地化
|    |--nginx.conf      			// nginx简单配置文件（mac环境）
|    |--template.html      		// 生产环境下生产html文件的模版
|--src
   |--constants
    		|--enumAPI.js	 								// api的枚举
    		|--enumDefaultMenus.js	 			// 菜单的枚举
    		|--enumRouter.js	 						// 路由的枚举
    |--mock          				// mockjs的封装
    |--templates
				|--lazyLoad          					// 路由懒加载（配合bundle-loader）
	*			|--mainLayout          				// 常见布局方式的封装（顶部菜单、顶部菜单+左侧菜单、自定义）
				|--toolComponents          		// 公共组件的封装
    |--utils            		// 存放工具方法
    		|--classNames				// 自己写的classNames
    		|--dataStructures		// 自己练习数据结构
    		|--emitter					// 事件的发布订阅的封装
    		|--localStorage			// localStorage的封装，支持时间限制等
    		|--queryString			// query-string的包直接提到commons会出问题---把包的内容复制出来
    		|--utils						// 自己练习lodash的常用方法
    		|--auth.js					// 权限的封装
    		|--crypto.js				// 加密算法的封装
    		|--decorate.js			// 装饰器的封装
    		|--helper.js				// 业务中常用的方法的封装
    		|--prompt.js				// antd-design的弹出框封装
    		|--regexp.js				// 常用正则的封装
    		|--request.js				// axios的封装（结合业务）
    |--index.js         		// 入口文件
  * |--store.js         		// 实例redux store的封装
    |--base.scss        		// 基础样式
		|--routes           		// 存放路由配置和路由入口
	*			|--index.js          					// 对各个大模块的引入
	*			|--routeTool.js          			// 路由工具
						|--actions          					// 存放action
						|--components       					// 存放业务组件的，不同模块的业务组件不能相互引用
						|--constants         					// 存放枚举
						|--reducers         					// 存放reducer
						|--routes         						// 对components的引用和结合react-reudx连接组件
						|--scss         							// 样式文件
						|--webAPI         						// http请求
						|--index.js										// 对组件、路由path、布局方式、reducer对引入
						
2. 项目启动
		下载
			git clone git@github.com:air-supply94/react-demo.git
			npm install      yarn install
		启动
			npm run dev			yarn run dev
			在浏览器输入    localhost:11111
			如果不需要验证登陆将public/config/env.js的login下的isCheckLogin改为false
```
