/**
 * Created by joey on 2018/2/18
 */

import {connect} from 'react-redux';
import List from '../../components/list/index';

const mapStateToProps = (state, ownProps) => {
	return {...ownProps};
};

const mapDispatchToProps = (dispatch) => {
	return {dispatch};
};

const ListComponent = connect(mapStateToProps, mapDispatchToProps)(List);

export default (props) => <ListComponent {...props}/>;
