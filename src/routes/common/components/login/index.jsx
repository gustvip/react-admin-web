/**
 * Created by joey on 17-8-30.
 */

import styles from './index.scss';
import T from 'utils/t';

const bg = require('./img/bg.png');

import { Button, Input } from 'antd';

@T.decorator.contextTypes('router')
export default class Login extends React.PureComponent {
	
	static userNameStorageValue = T.auth.getUserNameStorageValue();
	static userPasswordStorageValue = T.auth.getUserPasswordStorageValue();
	
	constructor () {
		super();
		this.state = {
			user_name: Login.userNameStorageValue ? Login.userNameStorageValue : '',
			user_password: Login.userPasswordStorageValue ? Login.userPasswordStorageValue : '',
			loading: false,
		};
	}
	
	handleEnterDown = (e) => e.keyCode === 13 ? this.handleSubmit() : null;
	
	handleSubmit = () => {
		const _this = this;
		const {user_name, user_password} = _this.state;
		/**
		 * 验证账号密码是否符合格式
		 * @type {*|boolean}
		 */
		const canSubmit = (
			T.regExp.name.test(user_name.trim())
			|| T.regExp.email.test(user_name.trim())
			|| T.regExp.telephone.test(user_name.trim())
		) && (
			user_password.trim() === Login.userPasswordStorageValue ||
			T.regExp.password.test(user_password.trim())
		);
		
		if (!canSubmit) {
			T.prompt.warn('请填写相关信息');
		} else {
			_this.setState({loading: true}, () => {
				const username = user_name.trim();
				const password = user_password.trim() === Login.userPasswordStorageValue
					? Login.userPasswordStorageValue
					: T.crypto.hmacSHA512(user_password.trim(), user_password.trim());
				T.auth.login({
					user_name: username,
					user_password: password,
					successCallback () {
						T.prompt.success('登陆成功,正在跳转');
						/**
						 * 储存用户名
						 * 储存用户密码
						 * 储存登陆成功标志
						 * 跳转到首页
						 */
						T.auth.setUserNameStorageValue(username);
						T.auth.setUserPasswordStorageValue(password);
						T.auth.setLoginStorageValue();
						T.auth.loginSuccessRedirect(
							_this.context.router.history,
							_this.context.router.route.location.state,
						);
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
			<div className={styles['login-container']}>
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
				</div>
			</div>
		);
	}
}
