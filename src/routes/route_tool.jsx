/**
 * Created by joey on 2018/02/19
 */

import { Route, Link } from 'react-router-dom'
import T from 'utils/t'
import Exception from 'templates/tool_components/exception'
import lazyLoad from 'templates/lazy_load'
import MainLayoutComponent from 'templates/main_layout'

/**
 * 默认布局方式
 * @param Component
 * @param rest
 * @param reducers
 * @returns {XML}
 * @constructor
 */
export const DefaultLayout = ({component: Component, reducers, ...rest}) => {
  const LazyComponent = lazyLoad(Component)
  return <Route
    key={rest.path}
    {...rest}
    exact
    render={() => <LazyComponent reducers={reducers}/>}/>
}

/**
 * 主要页面布局
 * @param Component
 * @param rest
 * @param reducers
 * @returns {XML}
 * @constructor
 */
export const MainLayout = ({component: Component, reducers, ...rest}) => {
  const LazyComponent = lazyLoad(Component)
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
  )
}

/**
 * 组装路由
 * @param {Array} routes
 * @returns {function()}
 * @constructor
 */
export const AssembleRoute = (...routes) => () => T.lodash.flattenDeep(routes).map(val => val.Layout ? DefaultLayout(val) : MainLayout(val))

/**
 * 未匹配到的页面
 * @constructor
 */
export const NoMatch = () => <Exception type="404" style={{minHeight: 500, height: '100%'}} linkElement={Link}/>
