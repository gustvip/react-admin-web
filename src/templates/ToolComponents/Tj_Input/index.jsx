/**
 * Created by willem on 2018/3/16.
 */
import styles from './index.scss'
import { Input } from 'antd'
import classNames from 'classnames'

const Tj_Input = (props) => (<Input
	{...props}
	className={classNames(styles.tj_inputBox, props.className)}
/>)
// 继承Input组件下的TextArea, Search 等等
Object.keys(Input).forEach(key => Tj_Input[key] = Input[key])

export default Tj_Input





