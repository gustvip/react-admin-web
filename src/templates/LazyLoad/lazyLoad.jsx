/**
 * created by joey 2018/02/19
 */

/**
 * 基本
 */
import PropTypes from 'prop-types'
import T from 'utils/T'
import { STORE_INJECT } from 'store.js'
import ENV from 'ENV'

/**
 * 组件
 */
import { Spin } from 'antd'

/**
 * 定义注入的reducer
 * @param reducers {Object}
 */
const injectReducers = reducers => ({[STORE_INJECT]: reducers})

@T.decorator.contextTypes('store', 'router')
@T.decorator.propTypes({
	lazyLoader: PropTypes.func.isRequired,
	reducers: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			reducer: PropTypes.func.isRequired,
		}).isRequired,
	),
})
export default class LazyLoadTpl extends React.PureComponent {
	
	state = {
		Component: null,
	}
	
	componentDidMount () {
		const _this = this
		const {defaultQuery, login} = ENV
		
		/**
		 * 验证是否登录
		 * 没登陆---重定向到login
		 * 带上location的state
		 */
		if (!T.auth.isLogin) {
			_this.context.router.history.push(
				`${login.loginUrl}?${defaultQuery}=${encodeURIComponent(window.location.pathname)}`,
				_this.context.router.route.location.state,
			)
		} else if (!_this.state.Component) {
			_this.props.lazyLoader(Component => {
				_this.setState({
					Component: Component.default,
				})
			})
		}
	}
	
	render () {
		const _this = this
		const Component = _this.state.Component
		
		if (Component) {
			if (T.helper.checkArray(_this.props.reducers)) {
				_this.context.store.dispatch(injectReducers(_this.props.reducers))
			}
			return <Component {..._this.props} />
		} else {
			return <Spin size="large"/>
		}
	}
}
