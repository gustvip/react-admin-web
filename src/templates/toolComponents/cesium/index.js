import "cesium/Build/Cesium/Widgets/widgets.css";

const AMAP_URL = "http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"; // 加载高德地图底图服务地址
const AMAP_CHINA_BORDER_URL = "http://wprd04.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8&ltype=11";
const AMAP_SATELITTE_URL = "http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}";

export default class Component extends React.PureComponent {
	constructor() {
		super();
		this.viewer = null;
		this.container = null;
		this.R = 6371000;
		this.center = [108.0, 40.0];
	}

	componentDidMount() {
		const self = this;
		const amapRoad = this.createAMapByUrl(Cesium, { url: AMAP_CHINA_BORDER_URL });
		const amapSatelitte = this.createAMapByUrl(Cesium, { url: AMAP_SATELITTE_URL });
		this.viewer = new Cesium.Viewer(this.container, {
			animation: false,
			baseLayerPicker: false,
			fullscreenButton: false,
			geocoder: false,
			homeButton: false,
			infoBox: false,
			sceneModePicker: false,
			selectionIndicator: true,
			timeline: false,
			navigationHelpButton: false,
			scene3DOnly: true,
			imageryProvider: amapSatelitte,		// 高德卫星图
		});
		this.drawHelper = new DrawHelper(this.viewer);
		this.drawHelper.startDrawingPolygon({
			callback(positions) {
				const polygon = new DrawHelper.PolygonPrimitive({
					positions,
					material: Cesium.Material.fromType("Checkerboard"),
				});
				self.viewer.scene.primitives.add(polygon);
			},
		});
		this.viewer.scene.fxaa = false;
		this.viewer.imageryLayers.addImageryProvider(amapRoad);// 高德地图中国边界
		this.viewer.camera.flyTo({
			destination: Cesium.Cartesian3.fromDegrees(...this.center, this.R * 2),
			duration: 0.5,
			scale: 0.2,
		});
	}

	createGoogleMapsByUrl(Cesium, options) {
		options = Cesium.defaultValue(options, {});

		const templateUrl = Cesium.defaultValue(options.url, "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}");

		const defaultCredit = new Cesium.Credit("Google Maps");

		const tilingScheme = new Cesium.WebMercatorTilingScheme({ ellipsoid: options.ellipsoid });

		const tileWidth = 256;
		const tileHeight = 256;

		const minimumLevel = Cesium.defaultValue(options.minimumLevel, 0);
		const maximumLevel = Cesium.defaultValue(options.minimumLevel, 17);

		const rectangle = Cesium.defaultValue(options.rectangle, tilingScheme.rectangle);

		// Check the number of tiles at the minimum level.  If it's more than four,
		// Throw an exception, because starting at the higher minimum
		// Level will cause too many tiles to be downloaded and rendered.
		const swTile = tilingScheme.positionToTileXY(Cesium.Rectangle.southwest(rectangle), minimumLevel);
		const neTile = tilingScheme.positionToTileXY(Cesium.Rectangle.northeast(rectangle), minimumLevel);
		const tileCount = (Math.abs(neTile.x - swTile.x) + 1) * (Math.abs(neTile.y - swTile.y) + 1);
		// >>includeStart('debug', pragmas.debug);
		if (tileCount > 4) {
			throw new Cesium.DeveloperError(`The rectangle and minimumLevel indicate that there are ${tileCount
			} tiles at the minimum level. Imagery providers with more than four tiles at the minimum level are not supported.`);
		}
		// >>includeEnd('debug');

		let credit = Cesium.defaultValue(options.credit, defaultCredit);
		if (typeof credit === "string") {
			credit = new Cesium.Credit(credit);
		}

		return new Cesium.UrlTemplateImageryProvider({
			url: templateUrl,
			proxy: options.proxy,
			credit,
			tilingScheme,
			tileWidth,
			tileHeight,
			minimumLevel,
			maximumLevel,
			rectangle,
		});
	}

	// 加载高德地图服务
	createAMapByUrl(Cesium, options) {
		options = Cesium.defaultValue(options, {});

		const templateUrl = Cesium.defaultValue(options.url, AMAP_URL);

		const defaultCredit = new Cesium.Credit("AMap");

		const tilingScheme = new Cesium.WebMercatorTilingScheme({ ellipsoid: options.ellipsoid });

		const tileWidth = 256;
		const tileHeight = 256;

		const minimumLevel = Cesium.defaultValue(options.minimumLevel, 0);
		const maximumLevel = Cesium.defaultValue(options.minimumLevel, 18);

		const rectangle = Cesium.defaultValue(options.rectangle, tilingScheme.rectangle);

		// Check the number of tiles at the minimum level.  If it's more than four,
		// Throw an exception, because starting at the higher minimum
		// Level will cause too many tiles to be downloaded and rendered.
		const swTile = tilingScheme.positionToTileXY(Cesium.Rectangle.southwest(rectangle), minimumLevel);
		const neTile = tilingScheme.positionToTileXY(Cesium.Rectangle.northeast(rectangle), minimumLevel);
		const tileCount = (Math.abs(neTile.x - swTile.x) + 1) * (Math.abs(neTile.y - swTile.y) + 1);
		// >>includeStart('debug', pragmas.debug);
		if (tileCount > 4) {
			throw new Cesium.DeveloperError(`The rectangle and minimumLevel indicate that there are ${tileCount
			} tiles at the minimum level. Imagery providers with more than four tiles at the minimum level are not supported.`);
		}
		// >>includeEnd('debug');

		let credit = Cesium.defaultValue(options.credit, defaultCredit);
		if (typeof credit === "string") {
			credit = new Cesium.Credit(credit);
		}

		return new Cesium.UrlTemplateImageryProvider({
			url: templateUrl,
			proxy: options.proxy,
			credit,
			tilingScheme,
			tileWidth,
			tileHeight,
			minimumLevel,
			maximumLevel,
			rectangle,
		});
	}

	render() {
		return (
			<div>
				<div
					ref={container => this.container = container}
					id="cesiumContainer"
					style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
				/>
				<div id="toolbar" style={{ position: "absolute", left: 0, right: 0, top: 0, height: "20px" }} />
			</div>
		);
	}
}
