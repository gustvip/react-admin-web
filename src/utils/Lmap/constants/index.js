/**
 * Created by joey on 2018/02/27
 */
import helper from 'utils/core/helper';

/**
 * 中心
 * @type {{normal: [number,number]}}
 */
export const CENTER = helper.immutable({
	normal: [39.90923, 116.397428],		// 默认中心
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
 * 覆盖物Polyline样式
 */
export const COVER_POLYLINE_STYLE = helper.immutable({
	stroke: true,
	color: '#f00',	// 描边颜色
	weight: 3,   // 描边宽度，
	lineJoin: 'round', // 折线拐点的绘制样式
	lineCap: 'round', // 折线两端线帽的绘制样式
});

/**
 * 覆盖物Polygon样式
 */
export const COVER_POLYGON_STYLE = helper.immutable({
	stroke: true,
	color: '#0f0',	// 描边颜色
	weight: 3,   // 描边宽度，
	lineJoin: 'round', // 折线拐点的绘制样式
	lineCap: 'round', // 折线两端线帽的绘制样式
	fillColor: '#0f0', // 填充颜色
});

/**
 * 覆盖物rectangle样式
 */
export const COVER_RECTANGLE_STYLE = helper.immutable({
	stroke: true,
	color: '#00f',	// 描边颜色
	weight: 3,   // 描边宽度，
	lineJoin: 'round', // 折线拐点的绘制样式
	lineCap: 'round', // 折线两端线帽的绘制样式
	fillColor: '#00f', // 填充颜色
});

/**
 * 覆盖物Circle样式
 */
export const COVER_CIRCLE_STYLE = helper.immutable({
	stroke: true,
	color: '#ff0',	// 描边颜色
	weight: 3,   // 描边宽度，
	lineJoin: 'round', // 折线拐点的绘制样式
	lineCap: 'round', // 折线两端线帽的绘制样式
	radius: 100, // 圆半径
	fillColor: '#ff0', // 填充颜色
});

/**
 * 覆盖物CircleMarker样式
 */
export const COVER_CIRCLE_MARKER_STYLE = helper.immutable({
	stroke: true,
	color: '#fd56ff',	// 描边颜色
	weight: 3,   // 描边宽度，
	lineJoin: 'round', // 折线拐点的绘制样式
	lineCap: 'round', // 折线两端线帽的绘制样式
	radius: 100, // 圆半径
	fillColor: '#fd56ff', // 填充颜色
});


