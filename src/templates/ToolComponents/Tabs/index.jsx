/**
 * Created by john on 2018/3/23.
 */
import styles from './index.scss'
import { Tabs } from 'antd'
import classNames from 'classnames'

const Tj_Tabs = (props) => (<Tabs
  {...props}
  className={classNames(styles.Tj_tabsBox, props.className)}
>{props.children}</Tabs>)

export default Tj_Tabs
