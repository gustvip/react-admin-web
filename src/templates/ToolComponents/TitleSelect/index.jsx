/**
 * Created by john on 2018/3/14.
 */
import styles from './index.scss'
import { Select } from 'antd'

const Tj_Select = ({...rest}) => {
	
	let data = {...rest}.data
	let title = {...rest}.title
	
	return <div className={styles.Tj_Sel}>
		<span className={styles['title']}>{title}:</span>
		<Select {...rest} dropdownClassName="sel">
			{
				Object.values(data).
					map(item => <Select.Option key={item.value} value={item.value.toString()}>{item.label}</Select.Option>)
			}
		</Select>
	</div>
}

export default Tj_Select

