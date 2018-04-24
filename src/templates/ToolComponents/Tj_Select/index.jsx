/**
 * Created by willem on 2018/3/16.
 */
import styles from './index.scss'
import { Select } from 'antd'
import classNames from 'classnames'
import Tj_Input from '../Tj_Input'

const Tj_Select = (props) => (<Select
	{...props}
	className={classNames(styles.tj_selectBox, props.className)}
	dropdownClassName={classNames(styles.tj_selectDropBox, props.dropdownClassName)}
>{props.children}</Select>)
// 继承Select组件下的Option 等等
Object.keys(Select).forEach(key => Tj_Select[key] = Select[key])

export default Tj_Select
