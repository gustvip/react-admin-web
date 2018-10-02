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
		const self = this;
		const {defaultQuery, login} = ENV;
		if (!auth.isLogin) {
			self.context.router.history.push(
				`${login.loginUrl}?${defaultQuery}=${encodeURIComponent(window.location.pathname)}`,
				self.context.router.route.location.state,
			);
		} else if (!self.state.Component) {
			self.props.lazyLoader(Component => {
				self.setState({
					Component: Component.default,
				});
			});
		}
	}

	render() {
		const self = this;
		const Component = self.state.Component;

		if (Component) {
			if (Array.isArray(self.props.reducers) && self.props.reducers.length > 0) {
				self.context.store.dispatch(injectReducers(self.props.reducers));
			}
			return <Component {...self.props}/>;
		} else {
			return <Spin size="large"/>;
		}
	}
}

export default LazyLoadTpl;
