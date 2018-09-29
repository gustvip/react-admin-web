import * as React from "react";

export default class TestComponent extends React.PureComponent {
	constructor() {
		super();
		this.container = null;
	}
	
	render() {
		return (
			<div
				ref={container => this.container = container}
			>
				33333333
			</div>
		);
	}
}
