/**
 * 基本
 */
import styles from './index.scss'
import T from 'utils/t'

/**
 * 组件
 */
import { Button } from 'antd'

const loginBack = require('./img/login_back.png')
const loginBox = require('./img/login_box.png')
const userImg = require('./img/user_name.png')
const passImg = require('./img/user_password.png')

@T.decorator.contextTypes('router')
export default class Login extends React.PureComponent {
  state = {
    user_name: '',
    user_password: '',
    loading: false,
  }
  
  /**
   * 键盘回车
   * @param e
   */
  handleEnterDown = (e) => e.keyCode === 13 ? this.handleSubmit() : null
  
  handleSubmit = () => {
    const _this = this
    const {user_name, user_password} = _this.state
    const canSubmit = (T.regExp.name.test(user_name.trim()) || T.regExp.email.test(user_name.trim()) || T.regExp.telephone.test(user_name.trim())) && T.regExp.password.test(user_password.trim())
    
    if (!canSubmit) {
      T.prompt.warn('请填写相关信息')
    } else {
      _this.setState({loading: true}, () => {
        T.auth.loginIn({
          user_name: user_name.trim(),
          user_password: user_password.trim(),
          successCallback () {
            T.auth.setLoginStorageValue()
            T.auth.loginSuccessRedirect(
              _this.context.router.history,
              _this.context.router.route.location.state,
            )
          },
          failCallback (info) {
            _this.setState({loading: false})
            T.prompt.error(info.msg)
          },
        })
      })
    }
  }
  
  render () {
    const _this = this
    
    return (
      <div className={styles.login}>
        <img src={loginBack} className={styles['img-top']} alt="login-back"/>
        <div className={styles['login_box']}>
          <div className={styles['login_box_left']}>
            <img className={styles['loginBoxImg']} src={loginBox} alt="loginBox"/>
            <img className={styles['userImg']} src={userImg} alt="userImg"/>
            <img className={styles['passImg']} src={passImg} alt="passImg"/>
            <input
              type="text"
              value={_this.state.user_name}
              className={styles['login_email']}
              onChange={e => _this.setState({user_name: e.target.value.trim()})}
              placeholder="邮箱"
              onKeyDown={e => _this.handleEnterDown(e)}
            />
            
            <input
              type="password"
              value={_this.state.user_password}
              className={styles['login_password']}
              onChange={e => _this.setState({user_password: e.target.value.trim()})}
              placeholder="密码"
              onKeyDown={e => _this.handleEnterDown(e)}
            />
            
            <Button
              disabled={_this.state.loading}
              loading={_this.state.loading}
              className={styles['btn_login']}
              onClick={() => _this.handleSubmit()}
            >
              登&nbsp;&nbsp;录
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
