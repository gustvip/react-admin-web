import CesiumComponent from 'templates/tool_components/cesium'
import T from 'utils/t';
// import * as  THREE from 'three'
import { Hello } from './ts';

export default class Component extends React.PureComponent {
	constructor () {
		super();
		this.container = null;
	}
	
	render () {
		return (
			<div
				style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
				ref={container => this.container = container}
			>
				{/*<Hello first="first1" last="last"/>*/}
				<CesiumComponent/>
			</div>
		);
	}
}
