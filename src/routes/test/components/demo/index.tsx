import T from '../../../../utils/t';
import * as React from 'react';
//import LeafletComponent from '../../../../templates/toolComponents/leaflet';

export default class TestComponent extends React.PureComponent<any, any> {
	public container: void | HTMLElement;
	
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div
				ref={container => this.container = container}
				style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
			>
				hello
			</div>
		);
	}
}
