/**
 * created by joey 2018/02/19
 */
import { render } from 'react-dom'
import { Provider } from 'react-redux'

/**
 * 加载基础样式
 */
import 'antd/lib/message/style'
import 'antd/lib/modal/style'
import './base.scss'

/**
 * 加载 redux store
 */
import store from './store'
/**
 * 加载路由
 */
import Routes from './routes/index'

/**
 * 渲染程序
 */
const renderApp = Component => {
  const wrapper = document.createElement('div')
  wrapper.id = 'wrapper'
  document.body.appendChild(wrapper)
  
  return render(<Provider store={store()}>
      <Component/>
    </Provider>,
    wrapper)
}
renderApp(Routes)