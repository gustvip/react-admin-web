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
import { Select, Menu, Icon, Layout, Dropdown } from 'antd'
import { Link } from 'react-router-dom'

/**
 * 获取图标字体
 * @param {Object} icon {{type: String, value: String}}
 */
const getIcon = icon => {
  if (icon) {
    if (icon.type === EnumIconTypes.custom) {
      return <i className={T.helper.classNames()(icon.value)}/>
    } else if (icon.type === EnumIconTypes.antd) {
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

@T.decorator.propTypes({
  clickLink: PropTypes.func.isRequired,
  locationPathname: PropTypes.string.isRequired,
  handleCollapsed: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
})
class SiderMenu extends React.PureComponent {
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
    
    if (!T.helper.checkArray(data)) {
      return null
    } else if (!T.helper.checkArray(item.children)) {
      /**
       * 判断children是为长度大于0的数组
       * 是则返回submenu
       * 不是返回menu.Item
       * 绑定Submenu的click事件---menu.Item不需要(已经跳转到对应的url---组件卸载---组件渲染)
       * 是否需要添加图标字体
       * @notice 不要改Menu.Item下面文字和图标的结构---否则后果自负
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
          <span>
            {getIcon(item.icon)}
            <span>
            {item.label}
            </span>
          </span>
        </Link>
      </Menu.Item>
    } else {
      /**
       * 设置可能的defaulOpenKeys
       * 绑定Submenu的onClick事件
       * 将子defaultOpenKeys传下去
       * @notice 不要改Menu.Submenu下面文字和图标的结构---否则后果自负
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
     * 判断defaultOpenKeys和原来的openKeys的每一项是否都相等
     * 如果相等则截取defaultOpenKeys的0到length-1
     * 否则就将defaultOpenKeys设置为新的openKeys
     */
    const _this = this
    const oldOpenKeys = _this.state.defaultOpenKeys
    const isEqual = defaultOpenKeys.every((item, index) => item === oldOpenKeys[index])
    _this.setState({
      defaultOpenKeys: isEqual
        ? defaultOpenKeys.slice(0, defaultOpenKeys.length - 1)
        : defaultOpenKeys,
    })
  }
  
  /**
   * 菜单收缩
   * @param {Boolean} collapsed
   */
  handleCollapsed = collapsed => {
    const _this = this
    
    /**
     * 将打开的菜单关闭---菜单宽度减少到80px，但是subMenu离左侧还是200px
     */
    if (collapsed) {
      _this.setState({defaultOpenKeys: []})
    } else {
      _this.setState({defaultOpenKeys: getOpenKeys(_this.props.locationPathname)})
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

@T.decorator.propTypes({
  clickLink: PropTypes.func.isRequired,
  locationPathname: PropTypes.string.isRequired,
})
@T.decorator.contextTypes('router')
class Header extends React.PureComponent {
  handleRedirect = value => {
    const _this = this
    if (value !== _this.props.locationPathname) {
      _this.context.router.history.push(value)
    }
  }
  
  loginOut = () => {
    const _this = this
    
    T.auth.loginOut({
      successCallback () {
        T.auth.removeLoginStorageValue()
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
  
  getTopRoute () {
    const _this = this
    
    return <div className={style['drop-down-menu-container']}>
      <Select
        onSelect={value => _this.handleRedirect(value)}
        value={T.lodash.find(EnumMenus, value => value.url.indexOf(_this.props.locationPathname) !== -1).url[0]}
      >
        {
          EnumMenus.map((item, index) => {
            return <Select.Option key={index} value={item.url[0]}>{item.label}</Select.Option>
          })
        }
      </Select>
    </div>
  }
  
  getCategoryRoute () {
    const _this = this
    
    return <div className={style['category-menu-container']}>
      {
        getCategoryRoute(_this.props.locationPathname).map((item, index) => {
          return <Link
            className={T.helper.classNames('')({[style['active']]: item.url.indexOf(_this.props.locationPathname) !== -1})}
            key={index}
            onClick={e => _this.props.clickLink(e, _this.props.locationPathname, item.url[0])}
            to={{pathname: item.url[0]}}
          >
            {getIcon(item.icon)}
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
            logo
          </div>
          
          {/*一级路由*/}
          {_this.getTopRoute()}
          
          {/*分类路由*/}
          {_this.getCategoryRoute()}
        
        </section>
        <section className={style['right-container']}>
          <Dropdown
            trigger={['click']}
            placement="bottomCenter"
            overlay={
              <Menu>
                <Menu.Item onClick={() => _this.loginOut()}>
                  退出登录
                </Menu.Item>
              </Menu>
            }
          >
            <Icon type='user' style={{fontSize: '18px'}}/>
          </Dropdown>
        </section>
      </Layout.Header>
    )
  }
}

export default class MainLayout extends React.PureComponent {
  constructor (props) {
    super(props)
    this.locationPathname = T.lodash.flowRight(T.helper.removeTrailingSlash, T.helper.removeBlank)(window.location.pathname)
    this.state = {
      isCollapsed: false,
    }
  }
  
  clickLink = (e, locationPathname, url) => {
    if (locationPathname === url) e.preventDefault()
  }
  
  handleCollapsed = () => {
    this.setState(previousState => ({isCollapsed: !previousState.isCollapsed}))
  }
  
  render () {
    const _this = this
    return <Layout
      id={style['main-container']}
      style={{paddingLeft: _this.state.isCollapsed ? 80 : 200}}
    >
      <SiderMenu
        clickLink={_this.clickLink.bind(_this)}
        locationPathname={_this.locationPathname}
        isCollapsed={_this.state.isCollapsed}
        handleCollapsed={_this.handleCollapsed.bind(_this)}
      />
      <Layout.Content
        className={style['content-container']}
      >
        <Header
          clickLink={_this.clickLink.bind(_this)}
          locationPathname={_this.locationPathname}
        />
        <Layout.Content className={style['main-content-container']}>
          {_this.props.children}
        </Layout.Content>
      </Layout.Content>
    </Layout>
  }
}

