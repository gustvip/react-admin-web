/**
 * Created by joey 2018/02/19
 */

/**
 * Mock数据---接入真实数据不要引入
 */
// import './mock';
import Locale from './locale';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as React from 'react';
import './base.scss';
// import './ant-theme.less';
import ErrorBoundary from 'templates/toolComponents/errorBoundary';
import store from './store';
import Routes from './routes/index';

const renderApp = Routes => {
	const wrapper = document.createElement('div');
	wrapper.id = 'wrapper';
	return render(
		<ErrorBoundary>
			<Provider store={store()}>
				{
					Locale(Routes)
				}
			</Provider>
		</ErrorBoundary>,
		document.body.appendChild(wrapper),
	);
};
renderApp(Routes);
