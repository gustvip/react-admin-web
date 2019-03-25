/**
 * Created by joey on 2018/02/19
 */
import Route from 'react-router-dom/Route';
import Exception from 'templates/toolComponents/exception';
import lazyLoad from 'templates/lazyLoad';
import * as React from 'react';
import { DefaultLayout as DefaultLayoutComponent } from 'templates/mainLayout';
import { flattenDeep } from 'lodash';

/**
 * 布局方式
 * @param {Object}  Component
 * @param {Object}  [LayoutComponent]
 * @param {string}  path
 * @param {string}  [auth]
 * @param {Array} rest
 * @param {Array} reducers
 */
export const DefaultLayout = ({component: Component,path, layout: LayoutComponent, reducers, auth, ...rest}) => {
	const LazyComponent = lazyLoad(Component);
	LayoutComponent = LayoutComponent ? LayoutComponent : DefaultLayoutComponent;
	return (
		<Route
			key={path}
			path={path}
			exact
			render={() => (
				<LayoutComponent>
					<LazyComponent reducers={reducers} auth={auth} {...rest}/>
				</LayoutComponent>
			)}
		/>
	);
};

/**
 * 组装路由
 * @param {Array} routes
 * @returns {function()}
 */
export const AssembleRoute = routes => () => flattenDeep(routes).map(val => DefaultLayout(val));

/**
 * 未匹配到的页面
 */
export const NoMatch = () => (<Exception style={{
	minHeight: 500,
	height: '100%',
}}/>);
