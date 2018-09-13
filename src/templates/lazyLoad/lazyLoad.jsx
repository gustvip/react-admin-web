/**
 * Created by joey 2018/02/19
 */

import PropTypes from "prop-types";
import {STORE_INJECT} from "store.js";
import * as decorate from "utils/core/decorate";
import {Spin} from "antd";
import auth from "utils/core/auth";

/**
 * 定义注入的reducer
 * @param reducers {Object}
 */
const injectReducers = reducers => ({[STORE_INJECT]: reducers});

@decorate.contextTypes("store", "router")
@decorate.propTypes({
	lazyLoader: PropTypes.func.isRequired,
	reducers: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			reducer: PropTypes.func.isRequired,
		}).isRequired,
	),
})
class LazyLoadTpl extends React.PureComponent {

	state = {
		Component: null,
	};

	componentDidMount() {
		const _this = this;
		const {defaultQuery, login} = ENV;
		if (!auth.isLogin) {
			_this.context.router.history.push(
				`${login.loginUrl}?${defaultQuery}=${encodeURIComponent(window.location.pathname)}`,
				_this.context.router.route.location.state,
			);
		} else if (!_this.state.Component) {
			_this.props.lazyLoader(Component => {
				_this.setState({
					Component: Component.default,
				});
			});
		}
	}

	render() {
		const _this = this;
		const Component = _this.state.Component;

		if (Component) {
			if (Array.isArray(_this.props.reducers) && _this.props.reducers.length > 0) {
				_this.context.store.dispatch(injectReducers(_this.props.reducers));
			}
			return <Component {..._this.props} />;
		} else {
			return <Spin size="large"/>;
		}
	}
}

export default LazyLoadTpl;
