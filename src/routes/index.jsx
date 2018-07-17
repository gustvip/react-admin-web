/**
 * Created by joey on 2018/2/18
 */

import T from 'utils/t'
import {
	BrowserRouter,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom'

import { NoMatch } from './route_tool'
import CommonRoutes from './common'         // 公共模块--相关路由,如:登录,注册...
import UserRoutes from './user'         // 用户相关模块
import TestRoutes from './test'	         // 测试相关模块

const checkLoginRedirect = () => <Redirect to={T.auth.isLogin ? ENV.login.defaultRedirectUrl : ENV.login.loginUrl}/>

/**
 * 路由配置
 * @constructor
 */
const Routes = () => (
	<BrowserRouter
		forceRefresh={!('pushState' in history)}
		keyLength={12}
	>
		<Switch>
			< Route exact path="/" render={() => checkLoginRedirect()}/>
			< Route exact path={ENV.rootPath} render={() => checkLoginRedirect()}/>
			
			{/* 公共--路由 */}
			{CommonRoutes()}
			
			{/* 用户--路由 */}
			{UserRoutes()}
			
			{/* 测试--路由 */}
			{TestRoutes()}
			
			{/* 404 NOT found */}
			<Route component={NoMatch}/>
		
		</Switch>
	
	</BrowserRouter>
)

export default Routes
