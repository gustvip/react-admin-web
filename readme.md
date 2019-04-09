## 项目目录结构说明

- build
  - webpack.config.base.js  webpack打包基础配置文件
  - webpack.config.dev.js  webpack打包开发环境下配置文件
  - webpack.config.prod.js webpack打包生产环境下配置文件
  - util.js 工具方法
  - publish.js  项目发布配置文件
- public
  - ``config``  配置目录（定义一个全局变量）
  - index.html  入口html文件
  - assets  本地依赖文件。如antd-design字体本地化
  - nginx.conf  nginx简单配置文件（mac环境）
  - template.html 生产环境下生产html文件的模版
- src
  - ``constants``
    - ``enumAPI.js``  api的枚举
    - ``enumMenus.js``  菜单的枚举
    - ``enumRouter.js``  路由的枚举  			
  - templates
    - ``lazyLoad``  路由懒加载（配合bundle-loader）
    - ``mainLayout``  常见布局方式的封装（顶部菜单、顶部菜单+左侧菜单、自定义）
    - toolComponents 公共组件的封装
  - utils  工具方法
    - emitter  事件的发布订阅的封装
    - ``localStorage``  localStorage的封装，支持时间限制等
    - ``auth.js``  权限的封装
    - crypto.js  加密算法的封装
    - decorate.js  装饰器的封装
    - index.js  业务中常用的方法的封装
    - prompt.js  antd-design的弹出框封装
    - regexp.js  常用正则的封装
    - ``request.js``  axios的封装（结合业务）
  - index.js  入口文件
  - ``store.js``  redux的封装
  - base.scss  基础样式
  - index.js  对各个大模块的引入
  - routes  存放路由配置和路由入口
    - ``routeTool.js``  路由工具
    - ``components``  存放业务组件的，不同模块的业务组件不能相互引用
    - constants  存放枚举
    - reducers  存放reducer
    - ``routes``  对components的引用和结合react-reudx连接组件
    - ``webAPI``  接口
    - index.js  对组件、路由path、布局方式、reducer对引入
						
## 项目启动

- 启动
  - npm run dev
  - yarn run dev
    - 在浏览器输入: localhost:11111
    - 如果不需要验证登陆将public/config/env.js的login下的isCheckLogin改为false
