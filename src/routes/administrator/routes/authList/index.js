/**
 * Created by joey on 2018/2/18
 */

import {connect} from 'react-redux';
import AuthList from '../../components/authList/index';

const mapStateToProps = (state, ownProps) => ({...ownProps});

const mapDispatchToProps = dispatch => ({dispatch});

const AuthListComponent = connect(mapStateToProps, mapDispatchToProps)(AuthList);

export default props => <AuthListComponent {...props}/>;
