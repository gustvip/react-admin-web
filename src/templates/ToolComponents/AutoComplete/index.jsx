/**
 * Created by john on 2018/3/23.
 */
import styles from './index.scss'
import { AutoComplete } from 'antd'

const Tj_AutoComplete = ({...rest}) => {
	
	return <AutoComplete className={styles.autoComplete} {...rest}>{{...rest}.children}</AutoComplete>
}

export default Tj_AutoComplete
