/**
 * Created by joey on 2018/2/18
 */

import {connect} from 'react-redux';
import UserList from '../../components/list/index';

const mapStateToProps = (state, ownProps) => {
	return {...ownProps};
};

const mapDispatchToProps = (dispatch) => {
	return {dispatch};
};

const UserListComponent = connect(mapStateToProps, mapDispatchToProps)(UserList);

export default (props) => <UserListComponent {...props}/>;
