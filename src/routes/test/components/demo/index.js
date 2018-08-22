import CesiumComponent from 'templates/toolComponents/cesium';
import T from 'utils/t';
// import * as  THREE from 'three'
import { Hello } from './ts';

export default class Component extends React.PureComponent {
	constructor () {
		super();
		this.container = null;
	}
	
	componentDidMount () {
		T.request.get('http://localhost:8081/a/b').then(info => {
			console.log(info);
		}).catch(info => console.log(info));
	}
	
	render () {
		return (
			<div
				style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
				ref={container => this.container = container}
			>
				<Hello first="first1" last="last"/>
			</div>
		);
	}
}
