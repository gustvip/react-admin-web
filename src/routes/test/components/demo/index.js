//import CesiumComponent from 'templates/toolComponents/cesium';
import T from 'utils/t';
// import * as  THREE from 'three'
import { Hello } from './ts';
import ChartComponent from 'templates/toolComponents/chart';

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
				<ChartComponent options={{}}/>
				<Hello first="first1" last="last1"/>
			</div>
		);
	}
}
