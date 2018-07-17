import 'cesium/Build/Cesium/Widgets/widgets.css'

export default class Component extends React.PureComponent {
	constructor () {
		super()
		this.viewer = null
	}
	
	componentDidMount () {
		this.viewer = new Cesium.Viewer('cesiumContainer', {
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
		})
	}
	
	render () {
		return (
			<div
				className="fullSize"
				id="cesiumContainer"
				style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
			/>
		)
	}
}
