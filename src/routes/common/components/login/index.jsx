/**
 * Created by joey on 17-8-30.
 */
import enumRouter from 'constants/enumRouter';
import regExp from 'utils/core/regExp';
import auth from 'utils/core/auth';
import crypto from 'utils/core/crypto';
import prompt from 'utils/core/prompt';
import * as decorate from 'utils/core/decorate';
import styles from './login.scss';
import {Button, Input} from 'antd';
import bg from './img/bg.jpeg';

@decorate.contextTypes('router')
class Login extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			userName: '',
			userPassword: '',
			loading: false,
		};
	}
	
	checkParam = (userName, userPassword) => {
		if (!(regExp.name().test(userName) || regExp.email.test(userName) || regExp.telephone.test(userName))) {
			prompt.warn('账号格式不对');
			return false;
		}
		if (!regExp.password().test(userPassword)) {
			prompt.warn('密码格式不对');
			return false;
		}
		return true;
	};
	
	handleSubmit = () => {
		const self = this;
		const userName = self.state.userName.trim();
		let userPassword = self.state.userPassword.trim();
		
		if (self.checkParam(userName, userPassword)) {
			userPassword = crypto.hmacSHA512(userPassword, userPassword);
			self.setState({loading: true}, () => {
				auth.login(
					userName,
					userPassword,
					(info) => {
						prompt.success('登陆成功,正在跳转');
						auth.setLoginStorageValue();
						auth.setUserInfoStorageValue(info.data);
						auth.loginSuccessRedirect(self.context.router.history, self.context.router.route.location.state);
					},
					(info) => {
						self.setState({loading: false});
						prompt.error(info.msg);
					},
				);
			});
		}
	};
	
	render() {
		const self = this;
		
		return (
			<div id={styles['login-container']}>
				<img src={bg} alt="背景图片"/>
				<div className={styles['condition-container']}>
					<Input
						type="text"
						value={self.state.userName}
						onChange={e => self.setState({userName: e.target.value.trim()})}
						placeholder="账号"
						onKeyDown={event => event.keyCode === 13 && self.handleSubmit()}
					/>
					<Input
						type="password"
						value={self.state.userPassword}
						onChange={e => self.setState({userPassword: e.target.value.trim()})}
						placeholder="密码"
						onKeyDown={event => event.keyCode === 13 && self.handleSubmit()}
					/>
					
					<Button
						type="primary"
						disabled={self.state.loading}
						loading={self.state.loading}
						onClick={() => self.handleSubmit()}
					>
						登&nbsp;&nbsp;录
					</Button>
				</div>
			</div>
		);
	}
}

export default Login;
