/**
 * Created by willem on 2018/3/16.
 */
import styles from './index.scss'
import { Checkbox } from 'antd'
import classNames from 'classnames'

const Tj_Checkbox = (props) => (<Checkbox
	{...props}
	className={classNames(styles.tj_CheckBox, props.className)}
>{props.children}</Checkbox>)

export default Tj_Checkbox
