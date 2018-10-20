import React from "react";
import T from "utils/t";
import enumAPI from "constants/enumAPI";
import {Button} from "antd";
import styles from "../../scss/parseFile/index.scss";

export default class TestComponent extends React.PureComponent {
	constructor() {
		super();
		this.xlsxContainer = null;
		this.csvContainer = null;
		this.container = null;
	}
	
	handleParseXlsx = (file) => {
		T.request.upload(enumAPI.fileParseXlsx, {file}).then(info => {
			window.open(`${enumAPI.fileDownJson}?id=${info.data.id}`);
		}).catch(info => T.prompt(info.msg));
	};
	
	handleParseCsv = (file) => {
		T.request.upload(enumAPI.fileParseCsv, {file}).then(info => {
			window.open(`${enumAPI.fileDownJson}?id=${info.data.id}`);
		}).catch(info => T.prompt(info.msg));
	};
	
	render() {
		return (
			<div
				className={styles["main-container"]}
				ref={container => this.container = container}
			>
				<div className="xlsx-container">
					<Button
						onClick={() => this.xlsxContainer.click()}
						type="primary"
					>
						解析xlsx
					</Button>
					<input
						ref={xlsxContainer => this.xlsxContainer = xlsxContainer}
						multiple={false}
						accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
						type="file"
						onChange={(e) => e.target.files && this.handleParseXlsx(e.target.files[0])}
					/>
				</div>
				<div className="csv-container">
					<Button
						onClick={() => this.csvContainer.click()}
						type="primary"
					>
						解析csv
					</Button>
					<input
						ref={csvContainer => this.csvContainer = csvContainer}
						multiple={false}
						accept="text/csv"
						type="file"
						onChange={(e) => e.target.files && this.handleParseCsv(e.target.files[0])}
					/>
				</div>
			</div>
		);
	}
}
