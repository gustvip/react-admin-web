import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from './mainHeader.scss';

export default function MainHeader({className, style, alignItems, justifyContent, children}) {
	return (
		<header
			className={classNames(styles['content-header-container'], className)}
			style={Object.assign({
				alignItems,
				justifyContent,
			}, style)}
		>
			{children}
		</header>
	);
}
MainHeader.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	justifyContent: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around']),
	alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'baseline', 'stretch']),
	style: PropTypes.object,
};

MainHeader.defaultProps = {
	className: '',
	styles: {},
	alignItems: 'center',
	justifyContent: 'space-between',
};
