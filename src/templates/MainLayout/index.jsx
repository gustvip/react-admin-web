/**
 * Created by joey on 18-2-7
 */

/**
 * 基本
 */
import T from 'utils/T'
import PropTypes from 'prop-types'
import { getMenuData, getOpenKeys, EnumMenus, getCategoryRoute } from './menuUtil'
import style from './index.scss'
import { EnumIconTypes } from 'constants/EnumDefaultMenus'
import ENV from 'ENV'

/**
 * 组件
 */
import { Select, Menu, Icon, Layout } from 'antd'
import { Link } from 'react-router-dom'

/**
 * 获取图标字体
 * @param icon
 */
const getIcon = icon => {
  if (icon) {
    /**
     * 自定义icon
     */
    if (icon.type === EnumIconTypes.custom) {
      return <i className={T.helper.classNames()(icon.value)}/>
    }
    
    /**
     * ant-design的icon
     */
    else if (icon.type === EnumIconTypes.antd) {
      return <Icon type={icon.value}/>
    }
  }
}

/**
 * 头部组件
 * @param {String} className
 * @param {String} title
 * @param {Object} style
 * @param {Function} leftRender
 * @param {Function} rightRender
 */
export const MainHeader = ({className = '', title = '', styles = {}, leftRender = null, rightRender = null}) => {
  const defaultClassName = style['content-header-container']
  const defaultStyle = {}
  
  return (
    <header className={T.helper.classNames(defaultClassName)(className)} style={T.lodash.assign(defaultStyle, styles)}>
      <section className={style['left-container']}>
        <section className={style['title-container']}>{title}</section>
        {leftRender}
      </section>
      <section className={style['right-container']}>
        {rightRender}
      </section>
    </header>
  )
}
MainHeader.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  leftRender: PropTypes.node,
  rightRender: PropTypes.node,
}

/**
 * 内容组件
 * @param {String} className
 * @param {Object} style
 * @param {Array} children
 */
export const MainContent = ({className = '', styles = {}, children = null}) => {
  const defaultClassName = style['content-body-container']
  const defaultStyle = {}
  
  return (
    <section
      style={T.lodash.assign(defaultStyle, styles)}
      className={T.helper.classNames(defaultClassName)(className)}
    >
      {children}
    </section>
  )
}
MainContent.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
}

/**
 * 菜单组件
 */
@T.decorator.propTypes({
  clickLink: PropTypes.func.isRequired,
  locationPathname: PropTypes.string.isRequired,
  handleCollapsed: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
})
class LeftMenu extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      defaultOpenKeys: getOpenKeys(props.locationPathname),
    }
  }
  
  /**
   * 获取菜单
   * @param {Array} data
   * @param {String} locationPathname
   * @param {Array} openKeys ---一般不填，递归时需要
   */
  getMenu = (data, locationPathname, openKeys = []) => data.map(item => {
    const _this = this
    openKeys = Array.isArray(openKeys) ? openKeys : []
    const defaultOpenKeys = [].concat(openKeys)
    
    /**
     * 数据不合格
     */
    if (!T.helper.checkArray(data)) {
      return null
    } else if (!T.helper.checkArray(item.children)) {
      /**
       * 判断children是为长度大于0的数组
       * 是则返回submenu
       * 不是返回menu.Item
       * 绑定Submenu的click事件---menu.Item不需要(已经跳转到对应的url---组件卸载---组件渲染)
       * 是否需要添加图标字体
       */
      return <Menu.Item
        key={item.url[0]}
      >
        <Link
          to={{
            pathname: item.url[0],
          }}
          onClick={e => _this.props.clickLink(e, locationPathname, item.url[0])}
        >
          {getIcon(item.icon)}
          {item.label}
        </Link>
      </Menu.Item>
    } else {
      /**
       * 设置可能的defaulOpenKeys
       * 绑定Submenu的onClick事件
       * 将子defaultOpenKeys传下去
       */
      defaultOpenKeys.push(item.url[0])
      
      return <Menu.SubMenu
        key={item.url[0]}
        title={
          <span>
					{getIcon(item.icon)}<span>{item.label}</span>
				</span>
        }
        onTitleClick={() => _this.handleDefaultOpenKeys(defaultOpenKeys.slice())}
      >
        {_this.getMenu(item.children, locationPathname, defaultOpenKeys.slice())}
      </Menu.SubMenu>
    }
  })
  
  /**
   * 设置openKeys
   * @param {Array} defaultOpenKeys
   */
  handleDefaultOpenKeys = (defaultOpenKeys) => {
    /**
     * defaultOpenKeys肯定为长度大于0的数组，在此不做判断
     * 只判断defaultOpenKeys和原来的openKeys的每一项是否都相等
     * 如果相等则截取defaultOpenKeys的0到length-1
     * 否则就将defaultOpenKeys设置为新的openKeys
     * 获取原来的openkeys
     */
    const _this = this
    const oldOpenKeys = _this.state.defaultOpenKeys
    
    /**
     * 是否每一项都相等
     */
    const isEqual = defaultOpenKeys.every((item, index) => item === oldOpenKeys[index])
    _this.setState({
      defaultOpenKeys: isEqual
        ? defaultOpenKeys.slice(0, defaultOpenKeys.length - 1)
        : defaultOpenKeys,
    })
  }
  
  /**
   * 菜单收缩
   * @param collapsed
   */
  handleCollapsed = collapsed => {
    const _this = this
    
    /**
     * 将打开的菜单关闭---菜单宽度减少到80px，但是submenu离左侧还是200px
     */
    if (collapsed) {
      _this.setState({defaultOpenKeys: []})
    }
    
    _this.props.handleCollapsed()
  }
  
  render () {
    const _this = this
    const locationPathname = _this.props.locationPathname
    const menuData = getMenuData(locationPathname)
    const defaultOpenKeys = _this.state.defaultOpenKeys
    
    return (
      <Layout.Sider
        collapsible
        collapsed={_this.props.isCollapsed}
        onCollapse={_this.handleCollapsed}
        className={style['sider-container']}
      >
        <Menu
          className={style['sider-menu']}
          mode="inline"
          theme="dark"
          selectedKeys={[locationPathname]}
          openKeys={defaultOpenKeys}
        >
          {_this.getMenu(menuData, locationPathname, [])}
        </Menu>
      </Layout.Sider>
    )
  }
}

/**
 * 右侧头部组件
 */
@T.decorator.propTypes({
  clickLink: PropTypes.func.isRequired,
  locationPathname: PropTypes.string.isRequired,
})
@T.decorator.contextTypes('router')
class Header extends React.PureComponent {
  
  /**
   * 退出登录
   */
  loginOut = () => {
    const _this = this
    
    T.auth.loginOut({
      successCallback () {
        /**
         * 移除登录的localStorage值
         */
        T.auth.removeLoginStorageValue()
        
        /**
         * 跳转到登录页
         */
        _this.context.router.history.push(
          `${ENV.login.loginUrl}?${ENV.defaultQuery}=${encodeURIComponent(window.location.pathname)}`,
          _this.context.router.route.location.state,
        )
      },
      failCallback (info) {
        T.prompt.error(info.msg)
      },
    })
  }
  
  /**
   * 获取一级路由
   */
  getTopRoute () {
    const _this = this
    
    return <div className={style['drop-down-menu-container']}>
      <Select
        onChange={value => _this.context.router.history.push(value)}
        defaultValue={T.lodash.find(EnumMenus, value => value.url.indexOf(_this.props.locationPathname) !== -1).url[0]}
      >
        {
          EnumMenus.map((item, index) => {
            return <Select.Option key={index} value={item.url[0]}>{item.label}</Select.Option>
          })
        }
      </Select>
    </div>
  }
  
  /**
   * 获取分类路由
   */
  getCategoryRoute () {
    const _this = this
    
    return <div className={style['category-menu-container']}>
      {
        getCategoryRoute(_this.props.locationPathname).map((item, index) => {
          return <Link
            className={T.helper.classNames('')({[style['active']]: item.url.indexOf(_this.props.locationPathname) !== -1})}
            key={index}
            onClick={e => _this.props.clickLink(e, _this.locationPathname, item.url[0])}
            to={{pathname: item.url[0]}}
          >
            {item.label}
          </Link>
        })
      }
    </div>
  }
  
  render () {
    const _this = this
    
    return (
      <Layout.Header className={style['main-header-container']}>
        <section className={style['left-container']}>
          
          <div className={style['logo-container']}>
            <Icon type="bars"/>
            <span>开发服务平台</span>
          </div>
          
          {/*一级路由*/}
          {_this.getTopRoute()}
          
          {/*分类路由*/}
          {_this.getCategoryRoute()}
        
        </section>
        <section className={style['right-container']}>
          <Icon
            type="bars"
            className={style['loginOut']}
            onClick={() => _this.loginOut()}
          />
        </section>
      </Layout.Header>
    )
  }
}

/**
 * 入口组件
 */
export default class MainLayout extends React.PureComponent {
  constructor (props) {
    super(props)
    this.locationPathname = T.lodash.flowRight(T.helper.removeTrailingSlash, T.helper.removeBlank)(window.location.pathname)
    this.state = {
      isCollapsed: false,
    }
  }
  
  /**
   * 超链接点击事件---判断是否需要阻止默认事件---（跳转本页面）
   * @param {Object} e
   * @param {String} locationPathname
   * @param {String} url
   */
  clickLink = (e, locationPathname, url) => {
    if (locationPathname === url) e.preventDefault()
  }
  
  /**
   * 更改侧边栏的收缩
   */
  handleCollapsed = () => {
    this.setState(previousState => ({
        isCollapsed: !previousState.isCollapsed,
      }),
    )
  }
  
  render () {
    const _this = this
    
    return <Layout id={style['main-container']}>
      <Header
        clickLink={_this.handleCollapsed.bind(_this)}
        locationPathname={_this.locationPathname}
      />
      <Layout
        className={style['content-container']}
        style={{marginLeft: _this.state.isCollapsed ? 80 : 200}}
      >
        <LeftMenu
          clickLink={_this.clickLink.bind(_this)}
          locationPathname={_this.locationPathname}
          isCollapsed={_this.state.isCollapsed}
          handleCollapsed={_this.handleCollapsed.bind(_this)}
        />
        <Layout className={style['main-content-container']}>
          {_this.props.children}
        </Layout>
      </Layout>
    </Layout>
  }
}

