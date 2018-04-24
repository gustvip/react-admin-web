/**
 * Created by willem on 2018/3/16.
 */
import styles from './index.scss'
import { Card } from 'antd'
import classNames from 'classnames'

const CardBox = (props) => (<Card
	{...props}
	className={classNames(styles.cardBox, props.className)}
>{props.children}</Card>)

export default CardBox
