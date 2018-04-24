/**
 * Created by willem on 2018/3/16.
 */
import styles from './index.scss'
import { InputNumber } from 'antd'
import classNames from 'classnames'

const Tj_InputNumber = (props) => (<InputNumber
	{...props}
	className={classNames(styles.tj_inputNumberBox, props.className)}
>{props.children}</InputNumber>)

export default Tj_InputNumber
