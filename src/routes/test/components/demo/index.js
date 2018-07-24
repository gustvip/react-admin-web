import CesiumComponent from 'templates/tool_components/cesium'
export default class Component extends React.PureComponent {
	constructor () {
		super()
		this.viewer = null
	}
	
	
	render () {
		return (
			<CesiumComponent/>
		)
	}
}
