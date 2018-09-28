/**
 * Created by joey on 2018/02/19
 */
import {Route} from "react-router-dom";
import flattenDeep from "lodash/flattenDeep";
import Exception from "templates/toolComponents/exception";
import lazyLoad from "templates/lazyLoad";
import * as React from "react";
import {DefaultLayout as DefaultLayoutComponent} from "templates/mainLayout";

/**
 * 布局方式
 * @param {Object}  Component
 * @param {Object || null}  LayoutComponent
 * @param {Array} rest
 * @param {Array} reducers
 */
export const DefaultLayout = ({component: Component, layout: LayoutComponent, reducers, ...rest}) => {
	const LazyComponent = lazyLoad(Component);
	LayoutComponent = LayoutComponent ? LayoutComponent : DefaultLayoutComponent;
	return (
		<Route
			key={rest.path}
			{...rest}
			exact
			render={() => (
				<LayoutComponent>
					<LazyComponent reducers={reducers}/>
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
export const AssembleRoute = (...routes) => () => flattenDeep(routes).map(val => DefaultLayout(val));

/**
 * 未匹配到的页面
 */
export const NoMatch = () => (<Exception style={{
	minHeight: 500,
	height: "100%",
}}/>);
