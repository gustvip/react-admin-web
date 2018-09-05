/**
 * Created by joey on 17-8-30.
 */

import styles from './index.scss';
import T from 'utils/t';
import { Button, Input, Checkbox } from 'antd';
import enumRouter from 'constants/enumRouter';

const bg = require('./img/bg.png');

@T.decorator.contextTypes('router')
export default class Login extends React.PureComponent {
	
	static userNameStorageValue = T.auth.getUserNameStorageValue();
	static userPasswordStorageValue = T.auth.getUserPasswordStorageValue();
	
	constructor () {
		super();
		this.state = {
			isRemember: true,
			user_name: Login.userNameStorageValue ? Login.userNameStorageValue : '',
			user_password: Login.userPasswordStorageValue ? Login.userPasswordStorageValue : '',
			loading: false,
		};
	}
	
	handleEnterDown = (e) => e.keyCode === 13 ? this.handleSubmit() : null;
	
	checkParam = (user_name, user_password) => {
		if (!(T.regExp.name.test(user_name) || T.regExp.email.test(user_name) || T.regExp.telephone.test(user_name))) {
			T.prompt.warn('账号格式不对');
			return false;
		}
		
		if (!(user_password === Login.userPasswordStorageValue || T.regExp.password.test(user_password))) {
			T.prompt.warn('密码格式不对');
			return false;
		}
		return true;
	};
	
	handleSubmit = () => {
		const _this = this;
		const user_name = _this.state.user_name.trim();
		let user_password = _this.state.user_password.trim();
		
		if (_this.checkParam(user_name, user_password)) {
			_this.setState({loading: true}, () => {
				
				user_password = user_password === Login.userPasswordStorageValue
					? Login.userPasswordStorageValue
					: T.crypto.hmacSHA512(user_password, user_password);
				
				T.auth.login({
					user_name: user_name,
					user_password: user_password,
					successCallback () {
						T.prompt.success('登陆成功,正在跳转');
						
						if (_this.state.isRemember) {
							T.auth.setUserNameStorageValue(user_name);
							T.auth.setUserPasswordStorageValue(user_password);
						} else {
							T.auth.removeUserNameStorageValue();
							T.auth.removeUserPasswordStorageValue();
						}
						
						T.auth.setLoginStorageValue();
						T.auth.loginSuccessRedirect(_this.context.router.history, _this.context.router.route.location.state);
					},
					failCallback (info) {
						_this.setState({loading: false});
						T.prompt.error(info.msg);
					},
				});
			});
		}
	};
	
	render () {
		const _this = this;
		
		return (
			<div id={styles['login-container']}>
				<img src={bg} alt="背景图片"/>
				<div className={styles['condition-container']}>
					<Input
						type="text"
						value={_this.state.user_name}
						className={styles['login_email']}
						onChange={e => _this.setState({user_name: e.target.value.trim()})}
						placeholder="邮箱"
						onKeyDown={e => _this.handleEnterDown(e)}
					/>
					<Input
						type="password"
						value={_this.state.user_password}
						className={styles['login_password']}
						onChange={e => _this.setState({user_password: e.target.value.trim()})}
						placeholder="密码"
						onKeyDown={e => _this.handleEnterDown(e)}
					/>
					
					<Button
						type="primary"
						disabled={_this.state.loading}
						loading={_this.state.loading}
						onClick={() => _this.handleSubmit()}
					>
						登&nbsp;&nbsp;录
					</Button>
					<footer>
						<Checkbox
							onChange={event => _this.setState({isRemember: event.target.checked})}
							checked={_this.state.isRemember}
						>
							记住我
						</Checkbox>
						<a href={enumRouter.register}>注册</a>
					</footer>
				
				</div>
			</div>
		);
	}
}
