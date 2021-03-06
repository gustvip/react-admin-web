/**
 * Created by joey on 2018/02/19
 */
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import {Button} from 'antd';
import styles from './index.scss';
import img404 from './img/404.svg';
import classNames from 'classnames';

export default function Exception({className, code, ...rest}) {
	const enumInfo = {
		404: {
			label: '抱歉，你访问的页面不存在',
			code: 404,
		},
		403: {
			label: '抱歉，你没有访问该页面的权限',
			code: 403,
		},
	};
	const info = enumInfo[code];
	return (
		<div className={classNames(styles.exception, className)} {...rest}>
			<div className={styles.imgBlock}>
				<div
					className={styles.imgEle}
					style={{backgroundImage: `url(${img404})`}}
				/>
			</div>
			<div className={styles.content}>
				<h1>{info.code}</h1>
				<div className={styles.content}>{info.label}</div>
				<div className={styles.actions}>
					<Link to={ENV.rootPath}>
						<Button type="primary">返回首页</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

Exception.propTypes = {
	className: PropTypes.string,
	code: PropTypes.oneOf([404, 403]),
};

Exception.defaultProps = {
	className: '',
	code: 404,
};
