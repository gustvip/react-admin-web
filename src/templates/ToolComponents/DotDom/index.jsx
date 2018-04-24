import styles from './index.scss'

import classNames from 'classnames'
import PropType from 'prop-types'

/**
 * 状态小圆点警示图表
 * @param props
 * @returns {*}
 * @constructor
 */
const DotDom = (props) => (<div
	style={{background: props.color}}
	{...props}
	className={classNames(styles.dotDom, props.className)}
/>)

DotDom.propTypes = {
	color: PropType.string.isRequired,
}
export default DotDom
