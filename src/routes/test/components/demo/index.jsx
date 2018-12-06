import * as React from 'react';

export default class TestComponent extends React.PureComponent {
	constructor() {
		super();
		this.container = null;
	}
	
	componentDidMount() {
	}
	
	xhrDemo = () => {
		const xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		xhr.open('POST', 'http://localhost:8081/user/add');
		xhr.onreadystatechange = function(event) {
			if ((xhr.readyState === 4) && (xhr.status >= 200 && xhr.status <= 300) || xhr.status === 304) {
				const responseText = xhr.responseText;
				const allResponseHeaders = xhr.getAllResponseHeaders();
				const header = xhr.getResponseHeader('Content-Type');
				// console.log(JSON.parse(responseText));
			}
		};
		xhr.timeout = 999999999;
		xhr.ontimeout = function(event) {
		
		};
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
		xhr.send(
			`userName=abcdefgha22
			&userPassword=4899f48b7873797086fc392ed8074b34306f79145cf0f9d1757e806da2d43f3876b3c762f38015f2d3593a595ae607a6e0aa103a2a5fe502cf95051c9cd62ee1
			&userEmail=${encodeURIComponent('421576615@qq.com')}
			&userPhone=18628905530
			`,
		);
	};
	
	render() {
		return (
			<div
				ref={container => this.container = container}
			>
				API 练习
			</div>
		);
	}
}
