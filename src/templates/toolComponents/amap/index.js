import PropTypes from 'prop-types';
import * as EnumMap from './constants';

export default class AMapComponent extends React.PureComponent {
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
	
	constructor () {
		super();
		this._mapContainer = null;
		this.map = null;
		this.AMap = window.AMap;
		this.EnumMap = EnumMap;
	}
	
	componentDidMount () {
		const baseOption = {
			zoom: EnumMap.ZOOM.normal,		// 缩放级别
			center: EnumMap.CENTER.normal,		// 地图中心
			zooms: [EnumMap.ZOOM.min, EnumMap.ZOOM.max],		// 缩放范围
			mapStyle: EnumMap.MAP_STYLE.dark.value,		// 地图的显示样式
			features: [EnumMap.FEATURES.point, EnumMap.FEATURES.bg, EnumMap.FEATURES.road],		// 地图上显示的元素种类---地图背景,道路，POI点
			lang: EnumMap.LANG.zh_cn,		// 中文简体语言
			viewMode: EnumMap.VIEW_MODE.two,		// 二维地图
			crs: EnumMap.CRS.EPSG3857,		// 地图显示的参考坐标系
		};
		const option = Object.assign(baseOption, this.props.option);
		
		const map = new this.AMap.Map(this._mapContainer, option);
		this.map = map;
		if (typeof this.props.completeCallback === 'function') {
			this.map.on('complete', this.props.completeCallback);
		}
	}
	
	componentWillUnmount () {
		if (this.map) {
			this.map.destroy();
			this.map = null;
		}
	}
	
	render () {
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
