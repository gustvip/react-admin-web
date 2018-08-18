/**
 * created by joey 2018/02/19
 */
import { render } from 'react-dom';
import { Provider } from 'react-redux';

/**
 * 加载基础样式
 */
import 'antd/lib/message/style';
import 'antd/lib/modal/style';
import './base.scss';

/**
 * 加载 redux store
 */
import store from './store';

/**
 * 加载路由
 */
import Routes from './routes/index';

/**
 * 错误处理程序
 */
import ErrorBoundary from 'templates/tool_components/errorBoundary';

/**
 * 渲染程序
 */
const renderApp = Routes => {
	const wrapper = document.createElement('div');
	wrapper.id = 'wrapper';
	return render(
		<ErrorBoundary>
			<Provider store={store()}>
				<Routes/>
			</Provider>
		</ErrorBoundary>
		,
		document.body.appendChild(wrapper));
};
renderApp(Routes);
