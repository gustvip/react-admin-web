import * as React from "react";
import T from "../../../../utils/t";
// Import LeafletComponent from '../../../../templates/toolComponents/leaflet';

export default class TestComponent extends React.PureComponent {
	constructor() {
		super();
		this.container = null;
	}
	
	render() {
		return (
			<div
				ref={container => this.container = container}
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
				}}
			>
				hello
			</div>
		);
	}
}
