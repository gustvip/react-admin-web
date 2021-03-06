/**
 * Created by joey on 2018/2/18
 */
import * as React from 'react';
import auth from 'utils/core/auth';
import EnumRouter from 'constants/enumRouter';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Redirect from 'react-router-dom/Redirect';
import {NoMatch} from './routeTool';
import CommonRoutes from './common'; // 公共模块--相关路由,如:登录,注册...
import Administrator from './administrator'; // 超级管理员相关模块
import UserRoutes from './user'; // 用户相关模块
import TestRoutes from './test'; // 测试相关模块

const checkLoginRedirect = () => <Redirect to={auth.isLogin ? ENV.login.defaultRedirectUrl : ENV.login.loginUrl}/>;

/**
 * 路由配置
 * @constructor
 */
const Routes = () => (
	<BrowserRouter
		forceRefresh={true}
		keyLength={12}
	>
		<Switch>
			<Route exact path="/" render={() => checkLoginRedirect()}/>
			<Route exact path={EnumRouter.rootPath} render={() => checkLoginRedirect()}/>
			
			{/* 公共--路由 */}
			{CommonRoutes()}
			
			{/* 超级管理员--路由 */}
			{Administrator()}
			
			{/* 用户--路由 */}
			{UserRoutes()}
			
			{/* 测试--路由 */}
			{TestRoutes()}
			
			{/* 404 NOT found */}
			<Route component={NoMatch}/>
		
		</Switch>
	
	</BrowserRouter>
);

export default Routes;
