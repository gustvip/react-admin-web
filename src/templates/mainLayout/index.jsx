/**
 * Created by joey on 18-2-7
 */

import T from "utils/t";
import PropTypes from "prop-types";
import {EnumIconTypes} from "constants/enumDefaultMenus";
import merge from "lodash/merge";
import isEqual from "lodash/isEqual";
import find from "lodash/find";
import flowRight from "lodash/flowRight";
import {Select, Menu, Icon, Layout} from "antd";
import style from "./index.scss";
import {getMenuData, getOpenKeys, EnumMenus, getCategoryRoute} from "./menuUtil";
import * as React from "react";
import {Link} from "react-router-dom";

/**
 * 获取图标字体
 * @param {Object} icon {{type: String, value: String}}
 */
const getIcon = (icon) => {
	if (icon) {
		if (icon.type === EnumIconTypes.custom) {
			return <i className={T.helper.classNames()(icon.value)}/>;
		}
		if (icon.type === EnumIconTypes.antd) {
			return <Icon type={icon.value}/>;
		}
	}
};

/**
 * 头部组件
 * @param {String} className
 * @param {String} title
 * @param {Object} style
 */
export const MainHeader = ({className = "", title = "", styles = {}}) => {
	const defaultClassName = style["content-header-container"];
	const defaultStyle = {};
	
	return (
		<header className={T.helper.classNames(defaultClassName)(className)} style={merge(defaultStyle, styles)}>
			{title}
		</header>
	);
};
MainHeader.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	children: PropTypes.node,
	leftRender: PropTypes.node,
	rightRender: PropTypes.node,
};

/**
 * 内容组件
 * @param {String} className
 * @param {Object} style
 * @param {Array} children
 */
export const MainContent = ({className = "", styles = {}, children = null}) => {
	const defaultClassName = style["content-body-container"];
	const defaultStyle = {};
	
	return (
		<section
			style={merge(defaultStyle, styles)}
			className={T.helper.classNames(defaultClassName)(className)}
		>
			{children}
		</section>
	);
};
MainContent.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	children: PropTypes.node,
};

@T.decorate.propTypes({
	handleCollapsed: PropTypes.func.isRequired,
	isCollapsed: PropTypes.bool.isRequired,
})
class SiderMenu extends React.PureComponent {
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
		const self = this;
		openKeys = Array.isArray(openKeys) ? openKeys : [];
		if (T.helper.checkArray(data)) {
			return data.map((item) => {
				const defaultOpenKeys = [].concat(openKeys);
				if (!T.helper.checkArray(item.children)) {
					/**
					 * 判断children是为长度大于0的数组
					 * 是则返回submenu
					 * 不是返回menu.Item
					 * 绑定Submenu的click事件---menu.Item不需要(已经跳转到对应的url---组件卸载---组件渲染)
					 * 是否需要添加图标字体
					 * @notice 不要改Menu.Item下面文字和图标的结构---否则后果自负
					 */
					return (
						<Menu.Item key={item.id} className={T.classNames({active: item.url[0] === locationPathname})}>
							<Link to={item.url[0]}>
								<span>{getIcon(item.icon)}<span>{item.label}</span></span>
							</Link>
						</Menu.Item>
					);
				}
				/**
				 * 设置可能的defaulOpenKeys
				 * 绑定Submenu的onClick事件
				 * 将子defaultOpenKeys传下去
				 * @notice 不要改Menu.Submenu下面文字和图标的结构---否则后果自负
				 */
				defaultOpenKeys.push(item.id);
				return (
					<Menu.SubMenu
						key={item.id}
						title={<span>{getIcon(item.icon)}<span>{item.label}</span></span>}
						onTitleClick={() => self.handleDefaultOpenKeys(defaultOpenKeys.slice(), item.url)}
					>
						{self.getMenu(item.children, locationPathname, defaultOpenKeys.slice())}
					</Menu.SubMenu>
				);
			});
		}
	};
	
	/**
	 * 设置openKeys
	 * @param {Array} defaultOpenKeys
	 * @param {Array} url
	 */
	handleDefaultOpenKeys = (defaultOpenKeys, url) => {
		if (isEqual(defaultOpenKeys, this.state.defaultOpenKeys)) {
			defaultOpenKeys = defaultOpenKeys.slice(0, defaultOpenKeys.length - 1);
		} else {
			if (url.indexOf(this.locationPathname) !== -1 && defaultOpenKeys.length < this.state.defaultOpenKeys.length) {
				defaultOpenKeys = defaultOpenKeys.slice(0, defaultOpenKeys.length - 1);
			}
		}
		this.setState({defaultOpenKeys});
	};
	
	handleCollapsed = (collapsed) => {
		/**
		 * 将打开的菜单关闭---菜单宽度减少到80px，但是subMenu离左侧还是200px
		 */
		if (collapsed) {
			this.setState({defaultOpenKeys: []});
		} else {
			this.setState({defaultOpenKeys: getOpenKeys(this.locationPathname)});
		}
		
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
				className={style["sider-container"]}
			>
				<Menu
					mode="inline"
					className={style["sider-menu"]}
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
		T.auth.removeLoginStorageValue();
		this.context.router.history.push(
			`${ENV.login.loginUrl}?${ENV.defaultQuery}=${encodeURIComponent(window.location.pathname)}`,
			this.context.router.route.location.state,
		);
	};
	
	getTopRoute = () => {
		const self = this;
		return (
			<div className={style["drop-down-menu-container"]}>
				<Select
					onSelect={value => self.context.router.history.push(value)}
					value={find(EnumMenus, value => value.url.indexOf(self.locationPathname) !== -1).url[0]}
				>
					{
						EnumMenus.map((item, index) => {
							return (
								<Select.Option key={index} value={item.url[0]}>
									<Link to={item.url[0]}>{item.label}</Link>
								</Select.Option>
							);
						})
					}
				</Select>
			</div>
		);
	};
	
	getCategoryRoute = () => {
		const self = this;
		return (
			<div className={style["category-menu-container"]}>
				{
					getCategoryRoute(self.locationPathname).map((item, index) => {
						return (
							<Link
								className={T.helper.classNames("")({[style.active]: item.url.indexOf(self.locationPathname) !== -1})}
								key={index}
								to={item.url[0]}
							>
								{getIcon(item.icon)}
								{item.label}
							</Link>
						);
					})
				}
			</div>
		);
	};
	
	render() {
		return (
			<React.Fragment>
				<Layout.Header className={style["main-header-container"]}>
					<section className={style["left-container"]}>
						
						<div className={style["logo-container"]}>logo</div>
						
						{/* 一级路由 */}
						{this.getTopRoute()}
						
						{/* 分类路由 */}
						{this.getCategoryRoute()}
					
					</section>
					<section
						onClick={() => this.logout()}
						className={style["right-container"]}
					>
						退出登录
					</section>
				</Layout.Header>
				{
					<div className={T.classNames({[style["header-children"]]: this.props.children})}>
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
		const self = this;
		return (
			<Layout
				id={style["main-container"]}
				style={{paddingLeft: self.state.isCollapsed ? 80 : 200}}
			>
				<SiderMenu
					isCollapsed={self.state.isCollapsed}
					handleCollapsed={self.handleCollapsed.bind(self)}
				/>
				<Layout.Content
					className={style["content-container"]}
				>
					<HeaderLayout/>
					<Layout.Content className={style["main-content-container"]}>
						{self.props.children}
					</Layout.Content>
				</Layout.Content>
			</Layout>
		);
	}
}

export class DefaultLayout extends React.PureComponent {
	render() {
		return (
			<React.Fragment>{this.props.children}</React.Fragment>
		);
	}
}
