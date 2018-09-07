/**
 * Created by joey on 2018/2/18
 */
import * as React from 'react';
import Demo from '../../components/demo/index';
import {connect} from 'react-redux';
import {ReactChild} from "react";

interface mapStateToPropsInterface {
	mapProps: object
}

interface mapDispatchToPropsInterface {
	dispatch: () => any
}

const mapStateToProps = (state, ownProps): mapStateToPropsInterface => {
	return {
		mapProps: state.userListReducer,
		...ownProps,
	};
};

const mapDispatchToProps = (dispatch): mapDispatchToPropsInterface => {
	return {
		dispatch,
	};
};

/**
 * 连接组件
 */
const DemoComponent: any = connect(mapStateToProps, mapDispatchToProps)(Demo);
export default (): ReactChild => <DemoComponent/>

