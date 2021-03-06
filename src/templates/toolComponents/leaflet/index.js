import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as EnumMap from './constants';
import * as React from 'react';

export default class LeafletComponent extends React.PureComponent {
	static defaultProps = {
		className: '',
		style: {},
		option: {},
	};
	
	static propTypes = {
		className: PropTypes.string,
		completeCallback: PropTypes.func,
		style: PropTypes.object,
		option: PropTypes.object,
	};
	
	constructor(props) {
		super(props);
		this._mapContainer = null;
		this.map = null;
		this.EnumMap = EnumMap;
	}
	
	componentDidMount() {
		const baseOption = {

			/**
			 * 交互选项
			 */
			preferCanvas: true, 	// 是否开启canvas渲染
			attributionControl: false, 	// 是否开启(右侧底部的地图的来源)
			zoomControl: false, 	// 是否开启(缩放按钮)
			closePopupOnClick: true, 	// 是否开启当点击地图时关闭popup
			trackResize: true, 	// 是否自动处理浏览器窗口大小以自行更新
			boxZoom: true, 	// 是否可以通过按住Shift键的同时拖动鼠标来缩放地图到指定的矩形区域
			boxZdoubleClickZoomoom: true, 	// 是否可以通过双击放大地图并在按住Shift键的同时双击缩小地图。如果通过  'center'，双击缩放将放大到视图的中心，而不管鼠标位于何处
			dragging: true, 	// 是否可以用鼠标/触摸拖动地图
			/**
			 * 地图状态
			 */
			center: EnumMap.CENTER.normal,		// 地图中心
			zoom: EnumMap.ZOOM.normal,		// 默认缩放
			minZoom: EnumMap.ZOOM.min,		// 最小默认缩放
			maxZoom: EnumMap.ZOOM.max,		// 最大默认缩放
		};
		
		const option = Object.assign(baseOption, this.props.option);
		const map = this.map = L.map(this._mapContainer, option);
		L.tileLayer(EnumMap.EnumTile.GaoDe.Normal.Map.tile, {}).addTo(map);
		if (typeof this.props.completeCallback === 'function') {
			this.props.completeCallback();
		}
	}
	
	render() {
		const baseStyle = {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
		};
		const {className, style} = this.props;
		return (
			<div
				ref={_mapContainer => this._mapContainer = _mapContainer}
				className={className}
				style={Object.assign(baseStyle, style)}
			/>
		);
	}
}
