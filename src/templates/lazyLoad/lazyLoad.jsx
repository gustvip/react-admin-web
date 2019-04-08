/**
 * Created by joey 2018/02/19
 */

import PropTypes from 'prop-types';
import {STORE_INJECT} from 'store.js';
import {Spin} from 'antd';
import auth from 'utils/core/auth';
import enumRouter from 'constants/enumRouter';

/**
 * 定义注入的reducer
 * @param reducers {Object}
 */
const injectReducers = reducers => ({[STORE_INJECT]: reducers});

export default class LazyLoadTpl extends React.PureComponent {
	static contextTypes = {
		store: PropTypes.object.isRequired,
		router: PropTypes.object.isRequired,
	};

	static propTypes = {
		lazyLoader: PropTypes.func.isRequired,
		reducers: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				reducer: PropTypes.func.isRequired,
			}).isRequired,
		),
		auth: PropTypes.string,
	};
	
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
		} else if (self.props.auth && !auth.hasAuth(self.props.auth)) {
			self.context.router.history.push(enumRouter.noPermit);
		} else if (!self.state.Component) {
			self.props.lazyLoader(Component => {
				self.setState({Component: Component.default});
			});
		}
	}
	
	render() {
		const self = this;
		const Component = self.state.Component;
		const {auth, reducers, lazyLoader, ...rest} = self.props;
		if (Component) {
			if (Array.isArray(self.props.reducers) && self.props.reducers.length > 0) {
				self.context.store.dispatch(injectReducers(self.props.reducers));
			}
			return <Component {...rest} auth={auth}/>;
		}
		return <Spin size="large"/>;
	}
}
