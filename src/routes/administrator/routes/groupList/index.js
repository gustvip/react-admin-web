/**
 * Created by joey on 2018/2/18
 */

import {connect} from 'react-redux';
import Index from '../../components/groupList/index';

/**
 * 映射props
 * @param state
 * @param ownProps
 */
const mapStateToProps = (state, ownProps) => {
	return {...ownProps};
};

/**
 * 映射所有的actions
 * @param dispatch
 */
const mapDispatchToProps = (dispatch) => {
	return {dispatch};
};

/**
 * 连接组件
 */
const ListComponent = connect(mapStateToProps, mapDispatchToProps)(Index);

export default () => <ListComponent/>;
