/**
 * Created by joey on 2018/2/27
 */
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import merge from 'lodash/merge';
import * as EnumMap from './constants/index';

class mapBasisHelper {
	constructor() {
		this.map = null;
		this.L = L;
		this.EnumMap = EnumMap;
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
	get LInstance() {
		return this.L;
	}

	/**
	 * 设置map容器
	 * @param {Object} map
	 */
	setMap(map) {
		this.map = map;

		return this;
	}

	/*
   |----------------------------------------------------------------
   | 改变地图状态方法
  |----------------------------------------------------------------
   */

	/**
	 * 使用给定的动画选项设置地图视图（地理中心和缩放）
	 * @param {Number} center
	 * @param {Number} zoom
	 * @param {Object} options
	 * @return {mapBasisHelper}
	 */
	setView(center, zoom, options) {
		this.mapInstance.setView(center, zoom, options);

		return this;
	}

	/**
	 * 设置地图的缩放
	 * @param {Number} zoom
	 * @param {Object} options
	 * @return {mapBasisHelper}
	 */
	setZoom(zoom, options) {
		this.mapInstance.setZoom(zoom, options);

		return this;
	}

	/**
	 * delta（zoomDelta默认）增加地图的缩放比例
	 * @param {Number} delta
	 * @param {Object} options
	 * @return {mapBasisHelper}
	 */
	zoomIn(delta, options) {
		this.mapInstance.zoomIn(delta, options);

		return this;
	}

	/**
	 * delta（zoomDelta默认）减小地图的缩放比例
	 * @param {Number} delta
	 * @param {Object} options
	 * @return {mapBasisHelper}
	 */
	zoomOut(delta, options) {
		this.mapInstance.zoomOut(delta, options);

		return this;
	}

	/**
	 * 放大地图，同时保持地图上的指定地理位置静止（例如，在内部用于滚动缩放和双击缩放）
	 * 放大地图，同时保持地图上的指定像素（相对于左上角）静止不动
	 * @param {Object} latLng LatLng || Point
	 * @param {Number} zoom
	 * @return {mapBasisHelper}
	 */
	setZoomAround(latLng, zoom) {
		this.mapInstance.setZoomAround(latLng, zoom);

		return this;
	}

	/**
	 * 设置包含具有最大缩放级别的给定地理范围的地图视图
	 * @param {Object} latLngBounds LatLngBounds
	 * @param {Object} options
	 * @return {mapBasisHelper}
	 */
	fitBounds(latLngBounds, options) {
		this.mapInstance.fitBounds(latLngBounds, options);

		return this;
	}

	/**
	 * 将地图拖到指定的中心
	 * @param {Object} latLng LatLng
	 * @param {Object} options
	 * @return {mapBasisHelper}
	 */
	panTo(latLng, options) {
		this.mapInstance.panTo(latLng, options);

		return this;
	}

	/**
	 * 按给定数量的像素（动画）平铺地图
	 * @param {Object} point Point
	 * @param {Object} options
	 * @return {mapBasisHelper}
	 */
	panBy(point, options) {
		this.mapInstance.panBy(point, options);

		return this;
	}

	/**
	 * 设置地图视图（地理中心和缩放）执行平滑的平移缩放动画
	 * @param {Object} latLng LatLng
	 * @param {Object} options
	 * @return {mapBasisHelper}
	 */
	flyTo(latLng, options) {
		this.mapInstance.flyTo(latLng, options);

		return this;
	}

	/**
	 * 用一个平滑的动画来设置地图的视图flyTo，但是像一个边界参数fitBounds
	 * @param {Object} latLngBounds LatLngBounds
	 * @param {Object} options
	 * @return {mapBasisHelper}
	 */
	flyToBounds(latLngBounds, options) {
		this.mapInstance.flyToBounds(latLngBounds, options);

		return this;
	}

	/**
	 * 将地图视图限制为给定范围
	 * @param {Object} bounds Bounds
	 * @param {Object} options
	 * @return {mapBasisHelper}
	 */
	setMaxBounds(bounds, options) {
		this.mapInstance.setMaxBounds(bounds, options);

		return this;
	}

	/**
	 * 设置可用缩放级别的下限
	 * @param {Number} zoom
	 * @param {Object} options
	 * @return {mapBasisHelper}
	 */
	setMinZoom(zoom, options) {
		this.mapInstance.setMinZoom(zoom, options);

		return this;
	}

	/**
	 * 设置可用缩放级别的上限
	 * @param {Number} zoom
	 * @param {Object} options
	 * @return {mapBasisHelper}
	 */
	setMaxZoom(zoom, options) {
		this.mapInstance.setMaxZoom(zoom, options);

		return this;
	}

	/**
	 * 将地图移动到位于给定范围内（如果尚未）的最近视图，使用特定选项（如果有）控制动画
	 * @param {Object} latLngBounds LatLngBounds
	 * @param {Object} options
	 * @return {mapBasisHelper}
	 */
	panInsideBounds(latLngBounds, options) {
		this.mapInstance.panInsideBounds(latLngBounds, options);

		return this;
	}

	/**
	 * 检查地图容器大小是否更改，如果是则更新地图 - 在动态更改地图大小后调用它，默认情况下也动画平移。如果options.pan是false，平移不会发生。如果options.debounceMoveend是true，它会延迟moveend事件，以致它不会经常发生，即使连续多次调用该方法
	 * @return {mapBasisHelper}
	 */
	invalidateSize(...rest) {
		this.mapInstance.invalidateSize(...rest);

		return this;
	}

	/**
	 * 如果有的话，停止当前运行panTo或flyTo动画
	 * @return {mapBasisHelper}
	 */
	stop() {
		this.mapInstance.stop();

		return this;
	}

	/*
   |----------------------------------------------------------------
   | 地理地位方法
  |----------------------------------------------------------------
   */

	/**
	 * 尝试找到使用Geolocation API的用户
	 * @param {Object} options
	 * @return {mapBasisHelper}
	 */
	locate(options) {
		this.mapInstance.locate(options);

		return this;
	}

	/**
	 * 尝试找到使用Geolocation API的用户
	 * @return {mapBasisHelper}
	 */
	stopLocate() {
		this.mapInstance.stopLocate();

		return this;
	}

	/*
   |----------------------------------------------------------------
   | 其他方法
  |----------------------------------------------------------------
   */

	/**
	 * Handler给它添加一个新的名字和构造函数
	 * @param {String} name
	 * @param {Function} handlerClass
	 * @return {mapBasisHelper}
	 */
	addHandler(name, handlerClass) {
		this.mapInstance.addHandler(name, handlerClass);

		return this;
	}

	/**
	 * 销毁地图并清除所有相关的事件侦听器
	 * @return {mapBasisHelper}
	 */
	remove() {
		this.mapInstance.remove();

		return this;
	}

	/**
	 * fn使用视图（中心和缩放）和至少一个图层初始化映射时运行给定的函数，或者在已经初始化的情况下立即运行给定函数（可选地传递函数上下文）
	 * @param {Function} fn
	 * @param {*} context
	 * @return {mapBasisHelper}
	 */
	whenReady(fn, context) {
		this.mapInstance.whenReady(fn, context);

		return this;
	}

	/*
   |----------------------------------------------------------------
   | layer和control
  |----------------------------------------------------------------
   */

	/**
	 * 添加控件
	 * @param {Object} control Control
	 * @return {mapBasisHelper}
	 */
	addControl(control) {
		this.mapInstance.addControl(control);

		return this;
	}

	/**
	 * 移除控件
	 * @param {Object} control Control
	 * @return {mapBasisHelper}
	 */
	removeControl(control) {
		this.mapInstance.removeControl(control);

		return this;
	}

	/**
	 * 添加图层
	 * @param {Object} layer Layer
	 * @return {mapBasisHelper}
	 */
	addLayer(layer) {
		this.mapInstance.addLayer(layer);

		return this;
	}

	/**
	 * 移除图层
	 * @param {Object} layer Layer
	 * @return {mapBasisHelper}
	 */
	removeLayer(layer) {
		this.mapInstance.removeLayer(layer);

		return this;
	}

	/**
	 * 判读是否有此图层
	 * @param {Object} layer Layer
	 * @return {Boolean}
	 */
	hasLayer(layer) {
		return this.mapInstance.hasLayer(layer);
	}

	/**
	 * 遍历图层
	 * @param {Function} fn
	 * @param {Object} context
	 * @return {mapBasisHelper}
	 */
	eachLayer(fn, context) {
		this.mapInstance.eachLayer(fn, context);

		return this;
	}

	/*
   |----------------------------------------------------------------
   | 覆盖物
  |----------------------------------------------------------------
   */

	/**
	 * 创建标注
	 * @param {Object} latLng LatLng
	 * @param {Object} options
	 * @return {Object}
	 */
	marker(latLng, options) {
		return this.LInstance.marker(latLng, options);
	}

	/**
	 * 创建弹出框
	 * @param {Object} options
	 * @param {Object} sources
	 * @return {Object}
	 */
	popup(options, sources) {
		return this.LInstance.popup(options, sources);
	}

	/**
	 * 创建tooltip
	 * @param {Object} options
	 * @param {Object} sources
	 * @return {Object}
	 */
	tooltip(options, sources) {
		return this.LInstance.tooltip(options, sources);
	}

	/**
	 * 创建path
	 * @param {Object} options
	 * @param {Object} sources
	 * @return {Object}
	 */
	path(options, sources) {
		return this.LInstance.path(options, sources);
	}

	/**
	 * 创建polyline
	 * @param {Object} latLngs LatLng
	 * @param {Object} options
	 * @return {Object}
	 */
	polyline(latLngs, options) {
		return this.LInstance.polyline(
			latLngs,
			merge({}, EnumMap.COVER_POLYLINE_STYLE, options),
		);
	}

	/**
	 * 创建polylgon
	 * @param {Object} latLngs LatLng
	 * @param {Object} options
	 * @return {Object}
	 */
	polygon(latLngs, options) {
		return this.LInstance.polygon(
			latLngs,
			merge({}, EnumMap.COVER_POLYGON_STYLE, options),
		);
	}

	/**
	 * 创建rectangle
	 * @param {Object} latLngs LatLng
	 * @param {Object} options
	 * @return {Object}
	 */
	rectangle(latLngs, options) {
		return this.LInstance.rectangle(
			latLngs,
			merge({}, EnumMap.COVER_RECTANGLE_STYLE, options),
		);
	}

	/**
	 * 创建circle
	 * @param {Object} latLngs LatLng
	 * @param {Object} options
	 * @return {Object}
	 */
	circle(latLngs, options) {
		return this.LInstance.circle(
			latLngs,
			merge({}, EnumMap.COVER_CIRCLE_STYLE, options),
		);
	}

	/**
	 * 创建circleMarker
	 * @param {Object} latLngs LatLng
	 * @param {Object} options
	 * @return {Object}
	 */
	circleMarker(latLngs, options) {
		return this.LInstance.circleMarker(
			latLngs,
			merge({}, EnumMap.COVER_CIRCLE_MARKER_STYLE, options));
	}

	/**
	 * 创建svg
	 * @param {Object} options
	 * @return {Object}
	 */
	svg(options) {
		return this.LInstance.svg(options);
	}

	/**
	 * 创建canvas
	 * @param {Object} options
	 * @return {Object}
	 */
	canvas(options) {
		return this.LInstance.canvas(options);
	}
}

export default mapBasisHelper;
