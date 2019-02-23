import React from 'react';

export default class TestComponent extends React.PureComponent {
	constructor () {
		super();
		this.container = null;
	}
	
	componentDidMount () {}
	
	render () {
		return (
			<div
				ref={container => this.container = container}
			>
			
			</div>
		);
	}
}
