/**
 * Created by joey on 17-8-30.
 */
import propTypes from 'prop-types';
import regExp from 'utils/core/regExp';
import auth from 'utils/core/auth';
import crypto from 'utils/core/crypto';
import prompt from 'utils/core/prompt';
import styles from './login.scss';
import { Button, Input } from 'antd';
import * as webAPI from 'constants/webAPI';
import classNames from 'classnames';
import * as msg from 'constants/app/msg';

export default class Login extends React.PureComponent {
	static contextTypes = {
		router: propTypes.object.isRequired,
	};
	
	constructor() {
		super();
		this.state = {
			userInputCodeText: '',
			originCodeText: '',
			codeImage: '',
			userName: '',
			userPassword: '',
			loading: false,
		};
	}
	
	componentDidMount() {
		this.getCheckCode();
	}
	
	/**
	 * 获取验证码
	 * @param {function} [callback]
	 */
	getCheckCode = callback => {
		if (ENV.login.isCheckCode) {
			webAPI.createRandomCode({size: 6}).then(info => {
				this.setState({originCodeText: info.data.text, codeImage: info.data.data}, () => callback && callback(info.data));
			}).catch(info => prompt.error(info.msg));
		}
	};
	
	checkCode = (userInputCodeText, originCodeText) => {
		if (ENV.login.isCheckCode) {
			if (!userInputCodeText || !originCodeText || userInputCodeText !== originCodeText) {
				prompt.warn(msg.failInfo.checkCode);
				return false;
			}
		}
		return true;
	};
	
	checkUserName = userName => {
		if (!(regExp.name().test(userName) || regExp.email.test(userName) || regExp.telephone.test(userName))) {
			prompt.warn(msg.failInfo.checkUserName);
			return false;
		}
		return true;
	};
	
	checkUserPassword = userPassword => {
		if (!regExp.password().test(userPassword)) {
			prompt.warn(msg.failInfo.checkUserPassword);
			return false;
		}
		return true;
	};
	
	handleSubmit = () => {
		const userName = this.state.userName.trim();
		const userInputCodeText = this.state.userInputCodeText.trim().toLowerCase();
		const originCodeText = this.state.originCodeText.trim().toLowerCase();
		let userPassword = this.state.userPassword.trim();
		
		if (this.checkCode(userInputCodeText, originCodeText) && this.checkUserName(userName) && this.checkUserPassword(userPassword)) {
			userPassword = crypto.md5(userPassword);
			this.setState({loading: true}, () => {
				webAPI.userLogin({userName, userPassword}).then(info => {
					prompt.success(msg.successInfo.login);
					auth.setLoginStorageValue();
					auth.setUserInfoStorageValue(info.data);
					auth.loginSuccessRedirect(this.context.router.history, this.context.router.route.location.state);
				}).catch(info => {
					prompt.error(info.msg);
					this.setState({loading: false});
				});
			});
		}
	};
	
	render() {
		return (
			<div className={styles['container']}>
				<div className={styles['condition-container']}>
					<div className={styles['item']}>
						<Input
							type="text"
							value={this.state.userName}
							onChange={e => this.setState({userName: e.target.value.trim()})}
							placeholder="账号"
							onKeyDown={event => event.keyCode === 13 && this.handleSubmit()}
						/>
					</div>
					<div className={styles['item']}>
						<Input
							type="password"
							value={this.state.userPassword}
							onChange={e => this.setState({userPassword: e.target.value.trim()})}
							placeholder="密码"
							onKeyDown={event => event.keyCode === 13 && this.handleSubmit()}
						/>
					</div>
					{
						ENV.login.isCheckCode && (
							<div className={classNames(styles['item'], styles['check-code'])}>
								<Input
									type="text"
									value={this.state.userInputCodeText}
									onChange={e => this.setState({userInputCodeText: e.target.value.trim()})}
									placeholder="验证码"
									onKeyDown={event => event.keyCode === 13 && this.handleSubmit()}
								/>
								<span
									onClick={() => this.getCheckCode()}
									dangerouslySetInnerHTML={{__html: this.state.codeImage}}
								/>
							</div>
						)
					}
					<div className={classNames(styles['item'])}>
						<Button
							type="primary"
							disabled={this.state.loading}
							loading={this.state.loading}
							onClick={() => this.handleSubmit()}
						>
							登&nbsp;&nbsp;录
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
