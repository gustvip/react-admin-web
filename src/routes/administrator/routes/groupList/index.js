/**
 * Created by joey on 2018/2/18
 */

import {connect} from 'react-redux';
import GroupList from '../../components/groupList/index';

const mapStateToProps = (state, ownProps) => ({...ownProps});

const mapDispatchToProps = dispatch => ({dispatch});

const GroupListComponent = connect(mapStateToProps, mapDispatchToProps)(GroupList);

export default props => <GroupListComponent {...props}/>;
