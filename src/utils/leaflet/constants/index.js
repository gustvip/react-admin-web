/**
 * Created by joey on 2018/02/27
 */

/**
 * 中心
 * @type {{normal: [number,number]}}
 */
export const CENTER = {
	normal: [39.90923, 116.397428],		// 默认中心
};

/**
 * 缩放
 * @type {{normal: number, min: number, max: number}}
 */
export const ZOOM = {
	normal: 7,		// 默认缩放级别
	min: 3,		// 最小缩放级别
	max: 18,		// 最大缩放级别
};

/**
 * 覆盖物Polyline样式
 */
export const COVER_POLYLINE_STYLE = {
	stroke: true,
	color: '#f00',	// 描边颜色
	weight: 3,   // 描边宽度，
	lineJoin: 'round', // 折线拐点的绘制样式
	lineCap: 'round', // 折线两端线帽的绘制样式
};

/**
 * 覆盖物Polygon样式
 */
export const COVER_POLYGON_STYLE = {
	stroke: true,
	color: '#0f0',	// 描边颜色
	weight: 3,   // 描边宽度，
	lineJoin: 'round', // 折线拐点的绘制样式
	lineCap: 'round', // 折线两端线帽的绘制样式
	fillColor: '#0f0', // 填充颜色
};

/**
 * 覆盖物rectangle样式
 */
export const COVER_RECTANGLE_STYLE = {
	stroke: true,
	color: '#00f',	// 描边颜色
	weight: 3,   // 描边宽度，
	lineJoin: 'round', // 折线拐点的绘制样式
	lineCap: 'round', // 折线两端线帽的绘制样式
	fillColor: '#00f', // 填充颜色
};

/**
 * 覆盖物Circle样式
 */
export const COVER_CIRCLE_STYLE = {
	stroke: true,
	color: '#ff0',	// 描边颜色
	weight: 3,   // 描边宽度，
	lineJoin: 'round', // 折线拐点的绘制样式
	lineCap: 'round', // 折线两端线帽的绘制样式
	radius: 100, // 圆半径
	fillColor: '#ff0', // 填充颜色
};

/**
 * 覆盖物CircleMarker样式
 */
export const COVER_CIRCLE_MARKER_STYLE = {
	stroke: true,
	color: '#fd56ff',	// 描边颜色
	weight: 3,   // 描边宽度，
	lineJoin: 'round', // 折线拐点的绘制样式
	lineCap: 'round', // 折线两端线帽的绘制样式
	radius: 100, // 圆半径
	fillColor: '#fd56ff', // 填充颜色
};

/**
 * 枚举切片url
 * @type {{GaoDe: {Normal: {Map: {tile: string}}, Satellite: {Map: {tile: string}, Annotion: {tile: string}}}, TianDiTu: {Normal: {Map: {tile: string}, Annotion: {tile: string}}, Satellite: {Map: {tile: string}, Annotion: {tile: string}}, Terrain: {Map: {tile: string}, Annotion: {tile: string}}}, Google: {Normal: {Map: {sourceID: string, tile: string}}, Satellite: {Map: {sourceID: string, tile: string}}, Terrain: {Map: {sourceID: string, tile: string}}}}}
 */
export const EnumTile = {
	GaoDe: {
		Normal: {
			Map: {
				tile: 'http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
			},
		},
		Satellite: {
			Map: {
				tile: 'http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
			},
			Annotion: {
				tile: 'http://webst01.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
			},
		},
	},
	
	TianDiTu: {
		Normal: {
			Map: {
				tile: 'http://t0.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}',
			},
			Annotion: {
				tile: 'http://t0.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}',
			},
		},
		Satellite: {
			Map: {
				tile: 'http://t0.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}',
			},
			Annotion: {
				tile: 'http://t0.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}',
			},
		},
		Terrain: {
			Map: {
				tile: 'http://t0.tianditu.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}',
			},
			Annotion: {
				tile: 'http://t0.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}',
			},
		},
	},
	
	Google: {
		Normal: {
			Map: {
				sourceID: 'Google.Normal.Map',
				tile: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}',
			},
		},
		Satellite: {
			Map: {
				sourceID: 'Google.Satellite.Map',
				tile: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
			},
		},
		Terrain: {
			Map: {
				sourceID: 'Google.Terrain.Map',
				tile: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}&s=Galil',
			},
		},
	},
};

