/**
 * Created by joey on 2018/2/18
 */
import * as React from 'react';
import {connect} from 'react-redux';
import Demo from '../../components/parseFile/index';

const mapStateToProps = (state, ownProps) => ({
	...ownProps,
});

const mapDispatchToProps = dispatch => ({
	dispatch,
});

const DemoComponent = connect(mapStateToProps, mapDispatchToProps)(Demo);
export default props => <DemoComponent {...props}/>;
