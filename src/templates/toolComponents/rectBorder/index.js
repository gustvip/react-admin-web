import PropTypes from 'prop-types';
import React from 'react';
import styles from './title.scss';
import classNames from 'classnames';

export default class RectBorder extends React.PureComponent {
	static defaultProps = {
		className: '',
		style: {},
		option: {},
	};
	
	static propTypes = {
		className: PropTypes.string,
		style: PropTypes.object,
		option: PropTypes.object,
	};
	
	render() {
		const {style = {}, className = '', children, option} = this.props;
		return (
			<div className={classNames(styles['container'], className)} style={style} {...option}>
				{children}
				<i className={styles['left-top']}/>
				<i className={styles['right-top']}/>
				<i className={styles['left-bottom']}/>
				<i className={styles['right-bottom']}/>
			</div>
		);
	}
}
