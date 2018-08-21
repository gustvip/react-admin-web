/**
 * 延迟加载工具
 * created by joey 2018/02/19
 */
import LazyLoad from './lazyLoad';

export default lazyLoader => {
	return props => {
		return <LazyLoad {...props} lazyLoader={lazyLoader}/>;
	};
}

