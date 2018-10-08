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
						accept=".xlsx"
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
						accept=".csv"
						type="file"
						onChange={(e) => e.target.files && this.handleParseCsv(e.target.files[0])}
					/>
				</div>
			</div>
		);
	}
}
