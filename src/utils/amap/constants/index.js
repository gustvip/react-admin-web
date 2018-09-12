/**
 * Created by joey on 2018/02/27
 */
import helper from 'utils/core/helper';

/**
 * 中心
 * @type {{normal: [number,number]}}
 */
export const CENTER = helper.immutable({
	normal: [116.397428, 39.90923], // 默认中心
});

/**
 * 缩放
 * @type {{normal: number, min: number, max: number}}
 */
export const ZOOM = helper.immutable({
	normal: 7,		// 默认缩放级别
	min: 3,		// 最小缩放级别
	max: 18,		// 最大缩放级别
});

/**
 * features
 * @type {{bg: string, point: string, road: string, building: string}}
 */
export const FEATURES = helper.immutable({
	bg: 'bg',		// 地图背景
	point: 'point',	// POI点
	road: 'road',		// 道路
	building: 'building',		// 建筑物
});

/**
 * 语言
 * @type {{zh_cn: string, en: string, zh_en: string}}
 */
export const LANG = helper.immutable({
	zh_cn: 'zh_cn',		// 中文简体
	en: 'en',		// 英文
	zh_en: 'zh_en',		// 中英文对照
});

/**
 * 地图样式
 * @type {{normal: {value: string, label: string}, whitesmoke: {value: string, label: string}, graffiti: {value: string, label: string}, darkblue: {value: string, label: string}, blue: {value: string, label: string}, fresh: {value: string, label: string}, dark: {value: string, label: string}, light: {value: string, label: string}, grey: {value: string, label: string}}}
 */
export const MAP_STYLE = helper.immutable({
	normal: { value: 'amap://styles/normal', label: '标准' },
	whitesmoke: { value: 'amap://styles/whitesmoke', label: '远山黛' },
	graffiti: { value: 'amap://styles/graffiti', label: '涂鸦' },
	darkblue: { value: 'amap://styles/darkblue', label: '极夜蓝' },
	blue: { value: 'amap://styles/blue', label: '靛青蓝' },
	fresh: { value: 'amap://styles/fresh', label: '草色青' },
	dark: { value: 'amap://styles/dark', label: '幻影黑' },
	light: { value: 'amap://styles/light', label: '月光银' },
	grey: { value: 'amap://styles/grey', label: '雅士灰' },
});

/**
 * 地图的纬度
 * @type {{two: string, three: string}}
 */
export const VIEW_MODE = helper.immutable({
	two: '2D',		// 二维
	three: '3D',		// 三维
});

/**
 * 地图显示的参考坐标系
 * @type {{EPSG3857: string, EPSG3395: string, EPSG4326: string}}
 */
export const CRS = helper.immutable({
	EPSG3857: 'EPSG3857',
	EPSG3395: 'EPSG3395',
	EPSG4326: 'EPSG4326',
});

/**
 * 请求的状态
 * @type {{no_data: string, complete: string, error: string, complete_info: string, no_data_info: string}}
 */
export const REQUEST_STATUS_INFO = helper.immutable({
	no_data: 'no_data',	// 请求成功---但没有数据
	complete: 'complete',		// 请求成功---并且有数据
	error: 'error',		// 请求失败
	no_data_info: '该地区没有数据',		// 请求成功---并且有数据的info
});

/**
 * 绘制图的多个选择
 * @type {{guage: Symbol, area: Symbol, circle: Symbol, rectangle: Symbol, polygon: Symbol, polyline: Symbol, marker: Symbol}}
 */
export const MORE_DRAW_TYPE = helper.immutable({
	rule: 'rule',
	area: 'area',
	circle: 'circle',
	rectangle: 'rectangle',
	polygon: 'polygon',
	polyline: 'polyline',
	marker: 'marker',
});

/**
 * 图层的样式
 * @type {{TileLayer: {value: string, label: string, isBasis: boolean}, TileLayer_Satellite: {value: string, label: string, isBasis: boolean}, TileLayer_RoadNet: {value: string, label: string, isBasis: boolean}, TileLayer_Traffic: {value: string, label: string, isBasis: boolean}, MassMarks: {value: string, label: string, isBasis: boolean}}}
 */
export const LAYER = helper.immutable({
	TileLayer: { value: 'AMap.TileLayer', label: '切片', isBasis: true },
	TileLayer_Satellite: { value: 'AMap.TileLayer.Satellite', label: '卫星', isBasis: true },
	TileLayer_RoadNet: { value: 'AMap.TileLayer.RoadNet', label: '路网', isBasis: true },
	TileLayer_Traffic: { value: 'AMap.TileLayer.Traffic', label: '实时交通', isBasis: true },
	MassMarks: { value: 'AMap.MassMarks', label: '海量麻点', isBasis: false },
});

/**
 * 覆盖物公共样式
 */
export const COVER_COMMON_STYLE = helper.immutable({
	topWhenClick: false,		// 鼠标点击时marker是否置顶
	bubble: false,		// 是否将覆盖物的鼠标或touch等事件冒泡到地图上
	draggable: false,		// 设置点标记是否可拖拽移动
	raiseOnDrag: false,		// 设置拖拽点标记时是否开启点标记离开地图的效果
	visible: true,		// 点标记是否可见
	angle: 0,		// 点标记的旋转角度
	autoRotation: false,		// 是否自动旋转
	animation: 'AMAP_ANIMATION_NONE',		// 点标记的动画效果
});

/**
 * 覆盖物text样式
 */
export const COVER_TEXT_STYLE = helper.immutable({
	'background-color': 'rgba(0,0,0,.5)',
	padding: '10px 20px',
	border: 'none',
	color: '#fff',
	'font-size': '12px',
});

/**
 * 覆盖物Polyline样式
 */
export const COVER_POLYLINE_STYLE = helper.immutable({
	geodesic: true, // 是否绘制大地线
	isOutline: false, // 线条是否带描边
	borderWeight: 1, // 描边的宽度
	strokeColor: '#006600', // 线条颜色，
	strokeOpacity: 0.9, // 线透明度
	strokeWeight: 2, // 线宽
	strokeStyle: 'solid', // 线样式
	lineJoin: 'round', // 折线拐点的绘制样式
	lineCap: 'round', // 折线两端线帽的绘制样式
});

/**
 * 覆盖物Polygon样式
 */
export const COVER_POLYGON_STYLE = helper.immutable({
	strokeColor: '#006600', 	// 线颜色
	strokeOpacity: 0.2, 	// 线透明度
	strokeWeight: 3, // 线宽
	fillColor: '#FFAA00', 	// 填充色
	fillOpacity: 0.35,		// 填充透明度
});

/**
 * 覆盖物Bezircure样式
 */
export const COVER_BEZIRCURE_STYLE = helper.immutable({
	strokeColor: '#006600', 	// 线颜色
	strokeOpacity: 0.2, 	// 线透明度
	strokeWeight: 3, // 线宽
	fillColor: '#FFAA00', 	// 填充色
	fillOpacity: 0.35,		// 填充透明度
});

/**
 * 覆盖物Circle样式
 */
export const COVER_CIRCLE_STYLE = helper.immutable({
	strokeColor: '#006600', 		// 线颜色
	strokeOpacity: 1, 	// 线透明度
	strokeWeight: 3, 	// 线粗细度
	fillColor: '#006600', // 填充颜色
	fillOpacity: 0.9,	// 填充透明度
	strokeStyle: 'solid',	// 填充透明度
});

/**
 * 覆盖物CircleMarker样式
 */
export const COVER_CIRCLE_MARKER_STYLE = helper.immutable({
	strokeColor: '#006600', 		// 线颜色
	strokeOpacity: 1, 	// 线透明度
	strokeWeight: 3, 	// 线粗细度
	fillColor: '#006600', // 填充颜色
	fillOpacity: 0.9,	// 填充透明度
	strokeStyle: 'solid',	// 填充透明度
});

/**
 * 覆盖物Ellipse样式
 */
export const COVER_ELLIPSE_STYLE = helper.immutable({
	strokeColor: '#006600',	// 线条颜色
	strokeWeight: 0,		// 轮廓线宽度
	strokeOpacity: 0.5,	// 轮廓线透明度
	strokeStyle: 'solid',		// 轮廓线样式
	fillColor: '#006600',		// 椭圆填充颜色
	fillOpacity: 0.9,	// 椭圆填充透明度
});

/**
 * 覆盖物Rectangle样式
 */
export const COVER_RECTANGLE_STYLE = helper.immutable({
	strokeColor: '#006600',	// 线条颜色
	strokeWeight: 0,		// 轮廓线宽度
	strokeOpacity: 0.5,	// 轮廓线透明度
	strokeStyle: 'solid',		// 轮廓线样式
	fillColor: '#006600',		// 椭圆填充颜色
	fillOpacity: 0.9,	// 椭圆填充透明度
});
