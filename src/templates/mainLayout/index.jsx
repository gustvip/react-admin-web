/**
 * Created by joey on 18-2-7
 */
import T from 'utils/t';
import PropTypes from 'prop-types';
import enumRouter from 'constants/enumRouter';
import * as enumCommon from 'constants/app/common';
import {Select, Menu, Icon, Layout, Dropdown} from 'antd';
import styles from './mainLayout.scss';
import {getMenuData, getOpenKeys, getCategoryRoute} from './menuUtil';
import * as React from 'react';
import Link from 'react-router-dom/Link';
import UpdatePasswordModal from 'templates/toolComponents/updatePasswordModal';
import UpdateUserInfoModal from 'templates/toolComponents/updateUserInfoModal';
import LookUpUserInfoModal from 'templates/toolComponents/lookUpUserInfoModal';
import {isEqual, flowRight, get, uniqueId} from 'lodash';
import enumMenus from 'constants/enumMenus';
import * as webAPI from 'constants/webAPI';
import * as msg from 'constants/app/msg';

class SiderMenu extends React.PureComponent {
	static propTypes = {
		handleCollapsed: PropTypes.func.isRequired,
		isCollapsed: PropTypes.bool.isRequired,
	};
	
	constructor() {
		super();
		const locationPathname = flowRight(T.helper.removeTrailingSlash, T.helper.removeBlank)(window.location.pathname);
		this.locationPathname = locationPathname;
		this.menuData = getMenuData(locationPathname);
		this.state = {
			defaultOpenKeys: getOpenKeys(locationPathname),
		};
	}
	
	/**
	 * 获取菜单
	 * @param {Array} data
	 * @param {String} locationPathname
	 * @param {Array} openKeys ---一般不填，递归时需要
	 */
	getMenu = (data, locationPathname, openKeys = []) => {
		openKeys = Array.isArray(openKeys) ? openKeys : [];
		return data.filter(value => {
			if (Object.prototype.hasOwnProperty.call(value, 'auth')) {
				return T.auth.hasAuth(value.auth);
			}
			return true;
		}).map(item => {
			const defaultOpenKeys = [].concat(openKeys);
			if (!T.helper.checkArray(item.children)) {
				return (
					<Menu.Item key={item.id} className={T.classNames({active: get(item, 'url[0]') === locationPathname})}>
						<Link to={get(item, 'url[0]')}>
							<span>{item.icon && <Icon type={item.icon}/>}<span>{item.label}</span></span>
						</Link>
					</Menu.Item>
				);
			}
			defaultOpenKeys.push(item.id);
			return (
				<Menu.SubMenu
					key={item.id}
					title={<span>{item.icon && <Icon type={item.icon}/>}<span>{item.label}</span></span>}
					onTitleClick={() => this.handleDefaultOpenKeys(defaultOpenKeys.slice(), item.url)}
				>
					{this.getMenu(item.children, locationPathname, defaultOpenKeys.slice())}
				</Menu.SubMenu>
			);
		});
	};
	
	handleDefaultOpenKeys = (defaultOpenKeys, url) => {
		if (isEqual(defaultOpenKeys, this.state.defaultOpenKeys)) {
			defaultOpenKeys = defaultOpenKeys.slice(0, defaultOpenKeys.length - 1);
		} else if (url.indexOf(this.locationPathname) !== -1 && defaultOpenKeys.length < this.state.defaultOpenKeys.length) {
			defaultOpenKeys = defaultOpenKeys.slice(0, defaultOpenKeys.length - 1);
		}
		this.setState({defaultOpenKeys});
	};
	
	handleCollapsed = collapsed => {
		this.setState({defaultOpenKeys: collapsed ? [] : getOpenKeys(this.locationPathname)});
		this.props.handleCollapsed();
	};
	
	render() {
		const locationPathname = this.locationPathname;
		const defaultOpenKeys = this.state.defaultOpenKeys;
		
		return (
			<Layout.Sider
				collapsible
				collapsed={this.props.isCollapsed}
				onCollapse={this.handleCollapsed}
				className={styles['sider-container']}
			>
				<Menu
					mode="inline"
					className={styles['sider-menu']}
					theme="dark"
					selectedKeys={[locationPathname]}
					openKeys={defaultOpenKeys}
				>
					{this.getMenu(this.menuData, locationPathname, [])}
				</Menu>
			</Layout.Sider>
		);
	}
}

export class HeaderLayout extends React.PureComponent {
	static contextTypes = {
		router: PropTypes.object.isRequired,
	};
	
	locationPathname = flowRight(T.helper.removeTrailingSlash, T.helper.removeBlank)(window.location.pathname);
	
	logout = () => {
		// 清除localStorage
		localStorage.clear();

		// 跳转至登录页面
		this.context.router.history.push(ENV.login.loginUrl);

		// 发送请求---清除cookie和服务端缓存
		webAPI.userLoginOut();
	};
	
	getTopRoute = () => {
		const initialValue = get(enumMenus.find(value => value.url.indexOf(this.locationPathname) !== -1), 'url[0]');
		return (
			<div className={styles['drop-down-menu-container']}>
				<Select
					onChange={value => this.context.router.history.push(value)}
					value={initialValue}
				>
					{
						enumMenus.map(value => (
							<Select.Option key={value.id} value={get(value, 'url[0]')}>
								<Link to={get(value, 'url[0]')}>{value.label}</Link>
							</Select.Option>
						))
					}
				</Select>
			</div>
		);
	};
	
	getCategoryRoute = () => (
		<div className={styles['category-menu-container']}>
			{
				getCategoryRoute(this.locationPathname).filter(value => {
					if (Object.prototype.hasOwnProperty.call(value, 'auth')) {
						return T.auth.hasAuth(value.auth);
					}
					return true;
				}).map(value => (
					<Link
						className={T.helper.classNames('')({[styles.active]: value.url.indexOf(this.locationPathname) !== -1})}
						key={value.id}
						to={get(value, 'url[0]')}
					>
						{value.label}
					</Link>
				))
			}
		</div>
	);
	
	handleResetPassword = userId => {
		T.prompt.confirm({
			onOk() {
				webAPI.userResetPassword({userId}).then(() => T.prompt.success(msg.successInfo.userResetPassword)).catch(info => T.prompt.error(info.msg));
			},
			title: '确认重置密码吗?',
			content: `密码将重置为${enumCommon.initialPassword}`,
		});
	};
	
	getUserManage = () => {
		const userInfo = T.auth.getUserDetailStorageValue();
		const menu = (
			<Menu>
				<Menu.Item
					onClick={() => this.context.router.history.push(enumRouter.login)}
					key={uniqueId()}
				>
					登陆
				</Menu.Item>
				<Menu.Divider/>
				<Menu.Item
					onClick={() => T.helper.renderModal(<LookUpUserInfoModal userId={get(userInfo, 'userId')}/>)}
					key={uniqueId()}
				>
					个人中心
				</Menu.Item>
				<Menu.Item
					onClick={() => T.helper.renderModal(<UpdateUserInfoModal userId={get(userInfo, 'userId')}/>)}
					key={uniqueId()}
				>
					编辑
				</Menu.Item>
				<Menu.Item
					onClick={() => T.helper.renderModal(<UpdatePasswordModal/>)}
					key={uniqueId()}
				>
					修改密码
				</Menu.Item>
				<Menu.Item
					onClick={() => this.handleResetPassword(get(userInfo, 'userId'))}
					key={uniqueId()}
				>
					重置密码
				</Menu.Item>
				<Menu.Divider/>
				<Menu.Item
					onClick={() => this.logout()}
					key={uniqueId()}
				>
					退出登陆
				</Menu.Item>
			</Menu>
		);
		return (
			<section
				className={styles['right-container']}
			>
				<Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
					<span>
						操作&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="down"/>
					</span>
				</Dropdown>
			</section>
		);
	};
	
	render() {
		return (
			<React.Fragment>
				<Layout.Header className={styles['main-header-container']}>
					<section className={styles['left-container']}>
						
						{/* <div className={styles["logo-container"]}>logo</div>*/}
						
						{/* 一级路由 */}
						
						{/* 分类路由 */}
						{this.getCategoryRoute()}
					
					</section>
					{
						this.getUserManage()
					}
				</Layout.Header>
				{
					<div className={T.classNames({[styles['header-children']]: this.props.children}, {'flex-column-grow': this.props.children})}>
						{this.props.children}
					</div>
				}
			</React.Fragment>
		);
	}
}

export class MenuAndHeaderLayout extends React.PureComponent {
	state = {
		isCollapsed: false,
	};
	
	handleCollapsed = () => {
		this.setState(previousState => ({isCollapsed: !previousState.isCollapsed}));
	};
	
	render() {
		return (
			<Layout
				id={styles['main-container']}
				className={T.classNames('flex-column-grow')}
				style={{paddingLeft: this.state.isCollapsed ? 80 : 200}}
			>
				<SiderMenu
					isCollapsed={this.state.isCollapsed}
					handleCollapsed={this.handleCollapsed}
				/>
				<Layout.Content
					className={T.classNames(styles['content-container'], 'flex-column-grow')}
				>
					<HeaderLayout/>
					<Layout.Content className={T.classNames(styles['main-content-container'], 'flex-column-grow')}>
						{this.props.children}
					</Layout.Content>
				</Layout.Content>
			</Layout>
		);
	}
}

export function DefaultLayout(props) {
	return props.children;
}
