/**
 * Created by joey on 2018/2/18
 */

import {connect} from 'react-redux';
import AuthEnumList from '../../components/authEnumList/index';

const mapStateToProps = (state, ownProps) => {
	return {...ownProps};
};

const mapDispatchToProps = (dispatch) => {
	return {dispatch};
};

const AuthEnumListComponent = connect(mapStateToProps, mapDispatchToProps)(AuthEnumList);

export default (props) => <AuthEnumListComponent {...props}/>;
