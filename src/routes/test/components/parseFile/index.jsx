import * as React from "react";
import T from "utils/t";
import enumAPI from "constants/enumAPI";

export default class TestComponent extends React.PureComponent {
	constructor() {
		super();
		this.container = null;
	}
	
	handleParseXlsx = (file) => {
		T.request.upload(enumAPI.userParseXlsx, {file}).then(info => {
			window.open(`${enumAPI.userDownJson}?id=${info.data.id}`);
		}).catch(info => T.prompt(info.msg));
	};
	
	handleParseCsv = (file) => {
		T.request.upload(enumAPI.userParseCsv, {file}).then(info => {
			window.open(`${enumAPI.userDownJson}?id=${info.data.id}`);
		}).catch(info => T.prompt(info.msg));
	};
	
	render() {
		return (
			<div
				ref={container => this.container = container}
			>
				<h1>解析xlsx</h1>
				<input
					multiple={false}
					accept=".xlsx"
					type="file"
					onChange={(e) => e.target.files && this.handleParseXlsx(e.target.files[0])}
				/>
				<h1>解析csv</h1>
				<input
					multiple={false}
					accept=".csv"
					type="file"
					onChange={(e) => e.target.files && this.handleParseCsv(e.target.files[0])}
				/>
			</div>
		);
	}
}
