/**
 * Created by joey on 2018/2/27
 */

import merge from "lodash/merge";
import * as EnumMap from "./constants/index";

class mapBasisHelper {
	constructor() {
		this.map = null;
		this.AMap = window.AMap;
	}

	/**
	 * 获取map实例
	 * @return {Object}
	 */
	get mapInstance() {
		return this.map;
	}

	/**
	 * 获取map实例
	 * @return {Object}
	 */
	get AMapInstance() {
		return this.AMap;
	}

	/**
	 * 基础数学库
	 * @return {Object}
	 */
	get geometryUtil() {
		return this.AMapInstance.GeometryUtil;
	}

	/**
	 * 设置map容器
	 * @param {Object} map
	 */
	setMap(map) {
		if (this.mapInstance !== map) {
			this.map = map;
		}

		return this;
	}

	/**
	 * 默认的options
	 * @return {{zoom: number, center: (number|number)[], zooms: [null,null], mapStyle: string, features: [null,null,null], lang: string, viewMode: string, crs: string, dragEnable: boolean, zoomEnable: boolean, doubleClickZoom: boolean, keyboardEnable: boolean, jogEnable: boolean, scrollWheel: boolean, rotation: number, animateEnable: boolean, isHotspot: boolean, rotateEnable: boolean, resizeEnable: boolean, expandZoomRange: boolean, touchZoom: boolean, showBuildingBlock: boolean, showIndoorMap: boolean, buildingAnimation: boolean}}
	 */
	static setOptions() {
		return {
			zoom: EnumMap.ZOOM.normal,		// 缩放级别
			center: EnumMap.CENTER.normal,		// 地图中心
			zooms: [EnumMap.ZOOM.min, EnumMap.ZOOM.max],		// 缩放范围
			mapStyle: EnumMap.MAP_STYLE.dark.value,		// 地图的显示样式
			features: [EnumMap.FEATURES.point, EnumMap.FEATURES.bg, EnumMap.FEATURES.road],		// 地图上显示的元素种类---地图背景,道路，POI点
			lang: EnumMap.LANG.zh_cn,		// 中文简体语言
			viewMode: EnumMap.VIEW_MODE.two,		// 二维地图
			crs: EnumMap.CRS.EPSG3857,		// 地图显示的参考坐标系
		};
	}

	/**
	 * 创建地图实列
	 * @param {String} container
	 * @param {Object} [options]
	 * @return {mapBasisHelper}
	 */
	createMap(container, options = {}) {
		this.setMap(
			new this.AMapInstance.Map(
				container,
				merge(
					{},
					mapBasisHelper.setOptions(),
					options,
				),
			),
		);

		return this;
	}

	/**
	 * 像素坐标，确定地图上的一个像素点
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Object}
	 */
	pixel(x, y) {
		return new this.AMapInstance.Pixel(x, y);
	}

	/**
	 * 地物对象的像素尺寸
	 * @param {Number} w
	 * @param {Number} h
	 * @return {Object}
	 */
	size(w, h) {
		return new this.AMapInstance.Size(w, h);
	}

	/**
	 * 经纬度坐标，确定地图上的一个点
	 * @param {Number} lng
	 * @param {Number} lat
	 * @return {Object}
	 */
	lngLat(lng, lat) {
		return new this.AMapInstance.LngLat(lng, lat);
	}

	/**
	 * 地物对象的经纬度矩形范围
	 * @param {Number} southWest
	 * @param {Number} northEast
	 * @return {Object}
	 */
	bounds(southWest, northEast) {
		return new this.AMapInstance.Bounds(southWest, northEast);
	}

	/**
	 * 获取当前地图缩放级别
	 * @return {Number}
	 */
	getZoom() {
		return this.mapInstance.getZoom();
	}

	/**
	 * 获取地图图层数组
	 * @return {Array}
	 */
	getLayers() {
		return this.mapInstance.getLayers();
	}

	/**
	 * 获取地图中心点经纬度坐标值
	 * @return {Object} LngLat
	 */
	getCenter() {
		return this.mapInstance.getCenter();
	}

	/**
	 * 获取地图中心点所在区域，回调函数返回对象属性分别对应为{省，市，区/县}
	 * @param {Function} cb
	 * @return {Object}
	 */
	getCity(cb) {
		return this.mapInstance.getCity(cb);
	}

	/**
	 * 返回地图对象的容器
	 * @return {Object} HTMLDivElement
	 */
	getContainer() {
		return this.mapInstance.getContainer();
	}

	/**
	 * 获取当前地图视图范围，获取当前可视区域
	 * @return {Object} Bounds
	 */
	getBounds() {
		return this.mapInstance.getBounds();
	}

	/**
	 * 获取当前地图标注的显示顺序
	 * @return {Number}
	 */
	getLabelzIndex() {
		return this.mapInstance.getLabelzIndex();
	}

	/**
	 * 获取Map的限制区域
	 * @return {Object} Bounds
	 */
	getLimitBounds() {
		return this.mapInstance.getLimitBounds();
	}

	/**
	 * 获取底图语言类型
	 * @return {String}
	 */
	getLang() {
		return this.mapInstance.getLang();
	}

	/**
	 * 获取地图容器像素大小
	 * @return {Object} size
	 */
	getSize() {
		return this.mapInstance.getSize();
	}

	/**
	 * 获取地图顺时针旋转角度
	 * @return {Number}
	 */
	getRotation() {
		return this.mapInstance.getRotation();
	}

	/**
	 * 获取当前地图状态信息，包括是否可鼠标拖拽移动地图、地图是否可缩放、地图是否可旋转（rotateEnable）
	 * 是否可双击放大地图、是否可以通过键盘控制地图旋转（keyboardEnable）等
	 * @return {Object}
	 */
	getStatus() {
		return this.mapInstance.getStatus();
	}

	/**
	 * 获取地图默认鼠标指针样式
	 * @return {String}
	 */
	getDefaultCursor() {
		return this.mapInstance.getDefaultCursor();
	}

	/**
	 * 获取指定位置的地图分辨率，单位：米/像素
	 * @param {Object} LngLat
	 * @return {Number}
	 */
	getResolution(LngLat) {
		return this.mapInstance.getResolution(LngLat);
	}

	/**
	 * 获取当前地图比例尺。其值为当前地图中心点处比例尺值的倒数
	 * @return {Number}
	 */
	getScale() {
		return this.mapInstance.getScale();
	}

	/**
	 * 返回添加的覆盖物对象，可选类型包括marker、circle、polyline、polygon
	 * @param {*} type
	 * @return {Array}
	 */
	getAllOverlays(type) {
		return this.mapInstance.getAllOverlays(type);
	}

	/**
	 * 获取地图显示样式
	 * @return {String}
	 */
	getMapStyle() {
		return this.mapInstance.getMapStyle();
	}

	/**
	 * 获取地图显示元素种类
	 * @return {Array}
	 */
	getFeatures() {
		return this.mapInstance.getFeatures();
	}

	/**
	 * 获取俯仰角
	 * @return {Number}
	 */
	getPitch() {
		return this.mapInstance.getPitch();
	}

	/**
	 * 设置地图显示的缩放级别
	 * @param {Number} level
	 * @return {mapBasisHelper}
	 */
	setZoom(level) {
		this.mapInstance.setZoom(level);

		return this;
	}

	/**
	 * 设置地图显示的缩放级别
	 * @param {Number} index
	 * @return {mapBasisHelper}
	 */
	setLabelzIndex(index) {
		this.mapInstance.setLabelzIndex(index);

		return this;
	}

	/**
	 * 设置地图图层数组，数组为一个或多个图层
	 * @param {Array} layers
	 * @return {mapBasisHelper}
	 */
	setLayers(layers) {
		this.mapInstance.setLayers(layers);

		return this;
	}

	/**
	 * 添加地图覆盖物数组，数组为一个或多个覆盖物
	 * @param {Array} layers
	 * @return {mapBasisHelper}
	 */
	add(layers) {
		this.mapInstance.add(layers);

		return this;
	}

	/**
	 * 移除地图覆盖物数组，数组为一个或多个覆盖物
	 * @param {Array} layers
	 * @return {mapBasisHelper}
	 */
	remove(layers) {
		this.mapInstance.remove(layers);

		return this;
	}

	/**
	 * 设置地图显示的中心点
	 * @param {Object} LngLat
	 * @return {mapBasisHelper}
	 */
	setCenter(LngLat) {
		this.mapInstance.setCenter(LngLat);

		return this;
	}

	/**
	 * 设置地图显示的中心点
	 * @param {Number} zoomLevel
	 * @param {Object} LngLat
	 * @return {mapBasisHelper}
	 */
	setZoomAndCenter(zoomLevel, LngLat) {
		this.mapInstance.setZoomAndCenter(zoomLevel, LngLat);

		return this;
	}

	/**
	 * 按照行政区名称或adcode来设置地图显示的中心点
	 * @param {String} city
	 * @param {Function} cb 地图中心坐标为第一个回掉参数，地图缩放比列为第二个蚕食
	 * @return {mapBasisHelper}
	 */
	setCity(city, cb) {
		this.mapInstance.setCity(city, cb);

		return this;
	}

	/**
	 * 指定当前地图显示范围，参数bounds为指定的范围
	 * @param {Object} bounds
	 * @return {mapBasisHelper}
	 */
	setBounds(bounds) {
		this.mapInstance.setBounds(bounds);

		return this;
	}

	/**
	 * 设置Map的限制区域，设定区域限制后，传入参数为限制的Bounds
	 * @param {Object} bounds
	 * @return {mapBasisHelper}
	 */
	setLimitBounds(bounds) {
		this.mapInstance.setLimitBounds(bounds);

		return this;
	}

	/**
	 * 清除限制区域
	 * @return {mapBasisHelper}
	 */
	clearLimitBounds() {
		this.mapInstance.clearLimitBounds();

		return this;
	}

	/**
	 * 设置语言
	 * @param {String} lang
	 * @return {mapBasisHelper}
	 */
	setLang(lang) {
		this.mapInstance.setLang(lang);

		return this;
	}

	/**
	 * 设置地图顺时针旋转角度，旋转原点为地图容器中心点，取值范围 [0-360]
	 * @param {Number} rotation
	 * @return {mapBasisHelper}
	 */
	setRotation(rotation) {
		this.mapInstance.setRotation(rotation);

		return this;
	}

	/**
	 * 设置当前地图显示状态，包括是否可鼠标拖拽移动地图、地图是否可缩放、地图是否可旋转（rotateEnable）、是否可双击放大地图、是否可以通过键盘控制地图旋转（keyboardEnable）
	 * @param {Object} status
	 * @return {mapBasisHelper}
	 */
	setStatus(status) {
		this.mapInstance.setStatus(status);

		return this;
	}

	/**
	 * 设置当前地图显示状态，包括是否可鼠标拖拽移动地图、地图是否可缩放、地图是否可旋转（rotateEnable）、是否可双击放大地图、是否可以通过键盘控制地图旋转（keyboardEnable）
	 * @param {String} cursor
	 * @return {mapBasisHelper}
	 */
	setDefaultCursor(cursor) {
		this.mapInstance.setDefaultCursor(cursor);

		return this;
	}

	/**
	 * 地图放大一级显示
	 * @return {mapBasisHelper}
	 */
	zoomIn() {
		this.mapInstance.zoomIn();

		return this;
	}

	/**
	 * 地图放缩小级显示
	 * @return {mapBasisHelper}
	 */
	zoomOut() {
		this.mapInstance.zoomOut();

		return this;
	}

	/**
	 * 地图中心点平移至指定点位置
	 * @param {Object} position
	 * @return {mapBasisHelper}
	 */
	panTo(position) {
		this.mapInstance.panTo(position);

		return this;
	}

	/**
	 * 以像素为单位，沿x方向和y方向移动地图，x向右为正，y向下为正
	 * @param {Number} x
	 * @param {Number} y
	 * @return {mapBasisHelper}
	 */
	panBy(x, y) {
		this.mapInstance.panBy(x, y);

		return this;
	}

	/**
	 * 以像素为单位，沿x方向和y方向移动地图，x向右为正，y向下为正
	 * @param {Array || Undefined} overlayList
	 * @return {mapBasisHelper}
	 */
	setFitView(overlayList) {
		this.mapInstance.setFitView(overlayList);

		return this;
	}

	/**
	 * 删除地图上所有的覆盖物
	 * @return {mapBasisHelper}
	 */
	clearMap() {
		this.mapInstance.clearMap();

		return this;
	}

	/**
	 * 注销地图对象，并清空地图容器
	 * @return {mapBasisHelper}
	 */
	destroy() {
		this.mapInstance.destroy();

		return this;
	}

	/**
	 * 插件加载方法
	 * @return {mapBasisHelper}
	 */
	plugin(name, cb) {
		this.mapInstance.plugin(name, cb);

		return this;
	}

	/**
	 * 添加控件
	 * @return {mapBasisHelper}
	 */
	addControl(obj) {
		this.mapInstance.addControl(obj);

		return this;
	}

	/**
	 * 移除地图上的指定控件
	 * @return {mapBasisHelper}
	 */
	removeControl(obj) {
		this.mapInstance.removeControl(obj);

		return this;
	}

	/**
	 * 清除地图上的信息窗体
	 * @return {mapBasisHelper}
	 */
	clearInfoWindow() {
		this.mapInstance.clearInfoWindow();

		return this;
	}

	/**
	 * 平面地图像素坐标转换为地图经纬度坐标
	 * @param {Object} pixel
	 * @param {Number || Undefined} level
	 * @return {Object}
	 */
	pixelToLngLat(pixel, level) {
		return this.mapInstance.pixelToLngLat(pixel, level);
	}

	/**
	 * 地图经纬度坐标转换为平面地图像素坐标
	 * @param {Object} lngLat
	 * @param {Number || Undefined} level
	 * @return {Object}
	 */
	lnglatToPixel(lngLat, level) {
		return this.mapInstance.lnglatToPixel(lngLat, level);
	}

	/**
	 * 地图容器像素坐标转为地图经纬度坐标
	 * @param {Object} pixel
	 * @return {Object}
	 */
	containerToLngLat(pixel) {
		return this.mapInstance.containerToLngLat(pixel);
	}

	/**
	 * 地图经纬度坐标转为地图容器像素坐标
	 * @param {Object} LngLat
	 * @return {Object}
	 */
	lngLatToContainer(LngLat) {
		return this.mapInstance.lngLatToContainer(LngLat);
	}

	/**
	 * 设置地图的显示样式
	 * @param {String} style
	 * @return {mapBasisHelper}
	 */
	setMapStyle(style) {
		this.mapInstance.setMapStyle(style);

		return this;
	}

	/**
	 * 设置地图上显示的元素种类，支持bg（地图背景）、point（兴趣点）、road（道路）、building（建筑物）
	 * @param {String} features
	 * @return {mapBasisHelper}
	 */
	setFeatures(features) {
		this.mapInstance.setFeatures(features);

		return this;
	}

	/**
	 * 设置俯仰角,3D视图有效
	 * @param {Number} pitch
	 * @return {mapBasisHelper}
	 */
	setPitch(pitch) {
		this.mapInstance.setPitch(pitch);

		return this;
	}

	/**
	 * 注册事件，给Map或者覆盖物对象注册事件
	 * 注意：多次绑定时，当eventName、handler函数对象、context对象有任意一个不一样就会再次绑定
	 * @param {String} eventName 事件名称---必填
	 * @param {Function} handler 事件回掉---必填
	 * @param {Object} context 事件回调中的上下文（可选，缺省时，handler中this为调用on方法的对象本身，否则this指向context引用的对象）
	 * @return {mapBasisHelper}
	 */
	on(eventName, handler, context) {
		this.mapInstance.on(eventName, handler, context);

		return this;
	}

	/**
	 * 移除事件绑定
	 * 注意：只有当off与on的eventName、handler函数对象、context对象完全一致时才能有效移除监听
	 * @param {String} eventName 事件名称---必填
	 * @param {Function} handler 事件回掉---必填
	 * @param {Object} context 事件回调中的上下文（可选，缺省时，handler中this为调用on方法的对象本身，否则this指向context引用的对象）
	 * @return {mapBasisHelper}
	 */
	off(eventName, handler, context) {
		this.mapInstance.off(eventName, handler, context);

		return this;
	}

	/**
	 * 给DOM对象注册事件，并返回eventListener
	 * @param {DOMElement} instance 需注册事件的DOM对象---必填
	 * @param {String} eventName 事件名称---必填
	 * @param {Function} handler 事件回掉---必填
	 * @param {Object} context 事件回调中的上下文（可选，缺省时，handler中this为调用on方法的对象本身，否则this指向context引用的对象）
	 * @return {Object}
	 */
	addDomListener(instance, eventName, handler, context) {
		return this.AMapInstance.event.addDomListener(instance, eventName, handler, context);
	}

	/**
	 * 给对象注册事件，并返回eventListener
	 * @param {DOMElement} instance 需注册事件的对象---必填
	 * @param {String} eventName 事件名称---必填
	 * @param {Function} handler 事件回掉---必填
	 * @param {Object} context 事件回调中的上下文（可选，缺省时，handler中this为调用on方法的对象本身，否则this指向context引用的对象）
	 * @return {Object}
	 */
	addListener(instance, eventName, handler, context) {
		return this.AMapInstance.event.addListener(instance, eventName, handler, context);
	}

	/**
	 * 类似于addListener，但事件只会被触发一次，之后将自动移除
	 * @param {DOMElement} instance 需注册事件的DOM对象---必填
	 * @param {String} eventName 事件名称---必填
	 * @param {Function} handler 事件回掉---必填
	 * @param {Object} context 事件回调中的上下文（可选，缺省时，handler中this为调用on方法的对象本身，否则this指向context引用的对象）
	 * @return {Object}
	 */
	addListenerOnce(instance, eventName, handler, context) {
		return this.AMapInstance.event.addListenerOnce(instance, eventName, handler, context);
	}

	/**
	 * 删除由上述 event.addDomListener 和 event.addListener 传回的指定侦听器
	 * @param {Object} listener 需要移除的事件listener
	 * @return {mapBasisHelper}
	 */
	removeListener(listener) {
		this.AMapInstance.event.removeListener(listener);

		return this;
	}

	/**
	 * 触发非DOM事件触发非DOM事件eventName时，extArgs将扩展到事件监听函数（handler）接受到的event参数中
	 * @param {DOMElement} instance
	 * @param {String} eventName
	 * @param {*} extArgs
	 * @return {mapBasisHelper}
	 */
	trigger(instance, eventName, extArgs) {
		this.AMapInstance.event.trigger(instance, eventName, extArgs);

		return this;
	}

	/**
	 * 创建MouseTool实列
	 * @return {Object}
	 */
	mouseTool() {
		if (!this.AMapInstance.MouseTool) {
			this.mapInstance.plugin(["AMap.MouseTool"]);
		}

		return new this.AMapInstance.MouseTool(this.mapInstance);
	}

	/**
	 * 创建RangingTool实列
	 * @return {Object}
	 */
	rangingTool(options) {
		if (!this.AMapInstance.RangingTool) {
			this.mapInstance.plugin(["AMap.RangingTool"]);
		}

		return new this.AMapInstance.RangingTool(this.mapInstance, options);
	}

	/**
	 * 创建地址解析
	 * @param {Object} options
	 * @return {Object}
	 */
	geocoder(options) {
		/**
		 * 判读地图实列是否添加了插件
		 */
		if (!this.AMapInstance.Geocoder) {
			this.mapInstance.plugin(["AMap.Geocoder"]);
		}

		/**
		 * 修改实列的getLocation方法
		 */
		const result = new this.AMapInstance.Geocoder(options);
		const getLocation = result.getLocation.bind(result);
		const getAddress = result.getAddress.bind(result);
		Object.defineProperties(result, {
			getLocation: {
				value(address) {
					return new Promise((resolve, reject) => {
						getLocation(address, (status, result) => {
							/**
							 * 没有查到数据---但是查询是成功的
							 */
							if (status === EnumMap.REQUEST_STATUS_INFO.no_data) {
								resolve({
									data: null,
									msg: EnumMap.REQUEST_STATUS_INFO.no_data_info,
								});
							}

							/**
							 * 查询成功
							 */
							if (status === EnumMap.REQUEST_STATUS_INFO.complete) {
								resolve({
									msg: result.info,
									data: result.geocodes,
								});
							}

							/**
							 * 查询错误
							 */
							if (status === EnumMap.REQUEST_STATUS_INFO.error) {
								reject({
									msg: result,
									data: null,
								});
							}
						});
					});
				},
				configurable: false,
			},

			getAddress: {
				value(LngLat) {
					return new Promise((resolve, reject) => {
						getAddress(LngLat, (status, result) => {
							/**
							 * 没有查到数据---但是查询是成功的
							 */
							if (status === EnumMap.REQUEST_STATUS_INFO.no_data) {
								resolve({
									data: null,
									msg: EnumMap.REQUEST_STATUS_INFO.no_data_info,
								});
							}

							/**
							 * 查询成功
							 */
							if (status === EnumMap.REQUEST_STATUS_INFO.complete) {
								resolve({
									msg: result.info,
									data: result.regeocode,
								});
							}

							/**
							 * 查询错误
							 */
							if (status === EnumMap.REQUEST_STATUS_INFO.error) {
								reject({
									msg: result,
									data: null,
								});
							}
						});
					});
				},
				configurable: false,
			},
		});

		return result;
	}

	/**
	 * 创建Autocomplete
	 * @param {Object} options
	 * @return {Object}
	 */
	autocomplete(options) {
		/**
		 * 判读地图实列是否添加了插件
		 */
		if (!this.AMapInstance.Autocomplete) {
			this.mapInstance.plugin(["AMap.Autocomplete"]);
		}

		/**
		 * 修改实列的search方法
		 */
		const result = new this.AMapInstance.Autocomplete(options);
		const search = result.search.bind(result);
		Object.defineProperty(result, "search", {
			value(address) {
				return new Promise((resolve, reject) => {
					search(address, (status, result) => {
						/**
						 * 没有查到数据---但是查询是成功的
						 */
						if (status === EnumMap.REQUEST_STATUS_INFO.no_data) {
							resolve({
								data: null,
								msg: EnumMap.REQUEST_STATUS_INFO.no_data_info,
							});
						}

						/**
						 * 查询成功
						 */
						if (status === EnumMap.REQUEST_STATUS_INFO.complete) {
							resolve({
								msg: result.info,
								data: result.tips,
							});
						}

						/**
						 * 查询错误
						 */
						if (status === EnumMap.REQUEST_STATUS_INFO.error) {
							reject({
								msg: result,
								data: null,
							});
						}
					});
				});
			},
			configurable: false,
		});

		return result;
	}

	/**
	 * 创建DistrictSearch
	 * @param {Object} options
	 * @return {Object}
	 */
	districtSearch(options) {
		/**
		 * 判读地图实列是否添加了插件
		 */
		if (!this.AMapInstance.DistrictSearch) {
			this.mapInstance.plugin(["AMap.DistrictSearch"]);
		}

		/**
		 * 修改实列的search方法
		 */
		const result = new this.AMapInstance.DistrictSearch(options);
		const search = result.search.bind(result);
		Object.defineProperty(result, "search", {
			value(address) {
				return new Promise((resolve, reject) => {
					search(address, (status, result) => {
						/**
						 * 没有查到数据---但是查询是成功的
						 */
						if (status === EnumMap.REQUEST_STATUS_INFO.no_data) {
							resolve({
								data: null,
								msg: EnumMap.REQUEST_STATUS_INFO.no_data_info,
							});
						}

						/**
						 * 查询成功
						 */
						if (status === EnumMap.REQUEST_STATUS_INFO.complete) {
							resolve({
								msg: result.info,
								data: result.districtList,
							});
						}

						/**
						 * 查询错误
						 */
						if (status === EnumMap.REQUEST_STATUS_INFO.error) {
							reject({
								msg: result,
								data: null,
							});
						}
					});
				});
			},
			configurable: false,
		});

		return result;
	}

	/**
	 * 创建单个正常的layer
	 * @param {String} name layer的名称
	 * @param {Object} options 附加选项
	 * @return {Object}
	 */
	normalLayer(name, options) {
		options = merge({}, options, {map: this.mapInstance});
		switch (name) {
			/**
			 * 默认的切片图层
			 */
			case EnumMap.LAYER.TileLayer.value:
				return new this.AMapInstance.TileLayer(options);

			/**
			 * 卫星图层
			 */
			case EnumMap.LAYER.TileLayer_Satellite.value:
				return new this.AMapInstance.TileLayer.Satellite(options);

			/**
			 * 路网图层
			 */
			case EnumMap.LAYER.TileLayer_RoadNet.value:
				return new this.AMapInstance.TileLayer.RoadNet(options);

			/**
			 * 实时交通图层
			 */
			case EnumMap.LAYER.TileLayer_Traffic.value:
				return new this.AMapInstance.TileLayer.Traffic(options);
			default:
		}
	}

	/**
	 * 海量麻点图层
	 * @param {Array} data
	 * @param {Object} options
	 * @return {Object}
	 */
	massMarksLayer(data, options) {
		return new this.AMapInstance.MassMarks(
			data,
			merge(
				{},
				options,
				{map: this.mapInstance},
			),
		);
	}

	/**
	 * 灵活切片图层
	 * @param {Object} options
	 * @return {Object}
	 */
	flexibleLayer(options) {
		return new this.AMapInstance.TileLayer.Flexible(
			merge(
				{},
				options,
				{map: this.mapInstance},
			),
		);
	}

	/**
	 * 图片图层
	 * @param {Object} options
	 * @return {Object}
	 */
	imageLayer(options) {
		return new this.AMapInstance.ImageLayer(
			merge(
				{},
				options,
				{map: this.mapInstance},
			),
		);
	}

	/**
	 * Canvas图层
	 * @param {Object} options
	 * @return {Object}
	 */
	canvasLayer(options) {
		return new this.AMapInstance.CanvasLayer(
			merge(
				{},
				options,
				{map: this.mapInstance},
			),
		);
	}

	/**
	 * Video图层
	 * @param {Object} options
	 * @return {Object}
	 */
	videoLayer(options) {
		return new this.AMapInstance.VideoLayer(
			merge(
				{},
				options,
				{map: this.mapInstance},
			),
		);
	}

	/**
	 * 完全自定义图层
	 * @param {Object} options
	 * @return {Object}
	 */
	customLayer(options) {
		return new this.AMapInstance.CustomLayer(
			merge(
				{},
				options,
				{map: this.mapInstance},
			),
		);
	}

	/**
	 * WMS图层
	 * @param {Object} options
	 * @return {Object}
	 */
	WMSLayer(options) {
		return new this.AMapInstance.TileLayer.WMS(
			merge(
				{},
				options,
				{map: this.mapInstance},
			),
		);
	}

	/**
	 * WMTS图层
	 * @param {Object} options
	 * @return {Object}
	 */
	WMTSLayer(options) {
		return new this.AMapInstance.TileLayer.WMTS(
			merge(
				{},
				options,
				{map: this.mapInstance},
			),
		);
	}

	/**
	 * 创建layer集合
	 * @param layer
	 */
	layerGroup(layer) {
		return new this.AMapInstance.LayerGroup(
			Array.isArray(layer) ? layer : arguments.slice(),
		);
	}

	/**
	 * 创建Marker
	 * @param {Object} options
	 * @return {Object}
	 */
	marker(options) {
		return new this.AMapInstance.Marker(
			merge(
				{},
				EnumMap.COVER_COMMON_STYLE,
				options,
				{map: this.mapInstance},
			),
		);
	}

	/**
	 * 创建Icon
	 * @param {Object} options
	 * @return {Object}
	 */
	icon(options) {
		return new this.AMapInstance.Icon(
			merge(
				{},
				options,
				{map: this.mapInstance},
			));
	}

	/**
	 * 创建Text
	 * @param {Object} options
	 * @param {Object} style
	 * @return {Object}
	 */
	text(options, style) {
		return new this.AMapInstance.Text(
			merge(
				{},
				EnumMap.COVER_COMMON_STYLE,
				options,
				{style: merge({}, EnumMap.COVER_TEXT_STYLE, style)},
				{map: this.mapInstance},
			),
		);
	}

	/**
	 * 创建Polyline
	 * @param {Object} options
	 * @return {Object}
	 */
	polyline(options) {
		return new this.AMapInstance.Polyline(
			merge(
				{},
				merge({}, EnumMap.COVER_COMMON_STYLE, EnumMap.COVER_POLYLINE_STYLE),
				options,
				{map: this.mapInstance},
			),
		);
	}

	/**
	 * 创建Polygon
	 * @param {Object} options
	 * @return {Object}
	 */
	polygon(options) {
		return new this.AMapInstance.Polygon(
			merge(
				{},
				merge({}, EnumMap.COVER_COMMON_STYLE, EnumMap.COVER_POLYGON_STYLE),
				options,
				{map: this.mapInstance},
			),
		);
	}

	/**
	 * 创建BezierCurve
	 * @param {Object} options
	 * @return {Object}
	 */
	bezirCure(options) {
		return new this.AMapInstance.BezierCurve(
			merge(
				{},
				merge({}, EnumMap.COVER_COMMON_STYLE, EnumMap.COVER_BEZIRCURE_STYLE),
				options,
				{map: this.mapInstance},
			),
		);
	}

	/**
	 * 创建Circle
	 * @param {Object} options
	 * @return {Object}
	 */
	circle(options) {
		return new this.AMapInstance.Circle(
			merge(
				{},
				merge({}, EnumMap.COVER_COMMON_STYLE, EnumMap.COVER_CIRCLE_STYLE),
				options,
				{map: this.mapInstance},
			),
		);
	}

	/**
	 * 创建CircleMarker---不随着地图级别变化发生大小改变
	 * @param {Object} options
	 * @return {Object}
	 */
	circleMarker(options) {
		return new this.AMapInstance.CircleMarker(
			merge(
				{},
				merge({}, EnumMap.COVER_COMMON_STYLE, EnumMap.COVER_CIRCLE_MARKER_STYLE),
				options,
				{map: this.mapInstance},
			),
		);
	}

	/**
	 * 创建Ellipse
	 * @param {Object} options
	 * @return {Object}
	 */
	ellipse(options) {
		return new this.AMapInstance.Ellipse(
			merge(
				{},
				merge({}, EnumMap.COVER_COMMON_STYLE, EnumMap.COVER_ELLIPSE_STYLE),
				options,
				{map: this.mapInstance},
			),
		);
	}

	/**
	 * 创建Rectangle
	 * @param {Object} options
	 * @return {Object}
	 */
	rectangle(options) {
		return new this.AMapInstance.Rectangle(
			merge(
				{},
				merge({}, EnumMap.COVER_COMMON_STYLE, EnumMap.COVER_RECTANGLE_STYLE),
				options,
				{map: this.mapInstance},
			),
		);
	}

	/**
	 * 创建OverlayGroup
	 * @param {Array} options
	 * @return {Object}
	 */
	overlayGroup(options) {
		return new this.AMapInstance.OverlayGroup(
			Array.isArray(options) ? options : arguments.slice(),
		);
	}

	/**
	 * 创建InfoWindow
	 * @param {Array} options
	 * @return {Object}
	 */
	infoWindow(options) {
		return new this.AMapInstance.InfoWindow(merge({}, options, {map: this.mapInstance}));
	}
}

export default mapBasisHelper;
