/**
 * Created by joey on 2018/2/18
 */
import * as React from 'react';
import { connect } from 'react-redux';
import Demo from '../../components/demo/index';


const mapStateToProps = (state, ownProps) => {
	return {
		mapProps: state.userListReducer,
		...ownProps,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch,
	};
};

/**
 * 连接组件
 */
const DemoComponent = connect(mapStateToProps, mapDispatchToProps)(Demo);
export default () => <DemoComponent />;