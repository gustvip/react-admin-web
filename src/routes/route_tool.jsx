/**
 * Created by joey on 2018/02/19
 */
import { Route } from 'react-router-dom';
import T from 'utils/t';
import Exception from 'templates/toolComponents/exception';
import lazyLoad from 'templates/lazyLoad';
import MainLayoutComponent from 'templates/mainLayout';

/**
 * 默认布局方式
 * @param {Object}  Component
 * @param {Array} rest
 * @param {Array} reducers
 */
export const DefaultLayout = ({component: Component, reducers, ...rest}) => {
	const LazyComponent = lazyLoad(Component);
	return <Route
		key={rest.path}
		{...rest}
		exact
		render={() => <LazyComponent reducers={reducers}/>}/>;
};

/**
 * 主要页面布局
 * @param {Object} Component
 * @param {Array} rest
 * @param {Array} reducers
 */
export const MainLayout = ({component: Component, reducers, ...rest}) => {
	const LazyComponent = lazyLoad(Component);
	return (
		<Route
			key={rest.path}
			{...rest}
			exact
			render={() => (
				<MainLayoutComponent>
					<LazyComponent reducers={reducers}/>
				</MainLayoutComponent>
			)}/>
	);
};

/**
 * 组装路由
 * @param {Array} routes
 * @returns {function()}
 */
export const AssembleRoute = (...routes) => () => T.lodash.flattenDeep(routes).map(val => val.layout ? DefaultLayout(val) : MainLayout(val));

/**
 * 未匹配到的页面
 */
export const NoMatch = () => <Exception style={{minHeight: 500, height: '100%'}}/>;
