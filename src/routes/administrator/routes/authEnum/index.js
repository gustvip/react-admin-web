/**
 * Created by joey on 2018/2/18
 */

import {connect} from 'react-redux';
import AuthEnum from '../../components/authEnum/index';

const mapStateToProps = (state, ownProps) => ({...ownProps});

const mapDispatchToProps = dispatch => ({dispatch});

const AuthEnumComponent = connect(mapStateToProps, mapDispatchToProps)(AuthEnum);

export default props => <AuthEnumComponent {...props}/>;
