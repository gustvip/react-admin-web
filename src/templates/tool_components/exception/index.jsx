/**
 * Created by joey on 2018/02/19
 */
import styles from './index.scss';
import img_404 from './img/404.svg';

import { Link } from 'react-router-dom';
import { Button } from 'antd';

export default ({className = '', ...rest}) => {
	
	return (
		<div className={styles.exception + ' ' + className} {...rest}>
			<div className={styles.imgBlock}>
				<div
					className={styles.imgEle}
					style={{backgroundImage: `url(${img_404})`}}
				/>
			</div>
			<div className={styles.content}>
				<h1>404</h1>
				<div className={styles.content}>抱歉，你访问的页面不存在</div>
				<div className={styles.actions}>
					<Link to={ENV.rootPath}>
						<Button type="primary">返回首页</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
