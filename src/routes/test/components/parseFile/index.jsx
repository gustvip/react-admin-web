import React from 'react';
import T from 'utils/t';
import enumAPI from 'constants/enumAPI';
import {Button, Input, Select} from 'antd';
import mime from 'mime';
import styles from './parseFile.scss';
import {fileExtendName} from 'constants/app/common';
import {camelCase} from 'lodash';
import MainHeader from 'templates/toolComponents/mainHeader';

const Option = Select.Option;

export default class TestComponent extends React.PureComponent {
	constructor() {
		super();
		this.jsonContainer = null;
		this.xlsxContainer = null;
		this.xmlContainer = null;
		this.csvContainer = null;
		this.state = {
			mime: '',
			camelCase: '',
			
			jsonFile: null,
			jsonExtendName: fileExtendName.xlsx.value,
			jsonExtendNameData: [fileExtendName.xlsx, fileExtendName.csv],
			
			xlsxFile: null,
			xlsxExtendName: fileExtendName.json.value,
			xlsxExtendNameData: [fileExtendName.json, fileExtendName.csv],
			
			csvFile: null,
			csvExtendName: fileExtendName.json.value,
			csvExtendNameData: [fileExtendName.json, fileExtendName.xlsx],
			
			xmlFile: null,
		};
	}
	
	// 解析json文件
	handleParseJson = () => {
		if (this.state.jsonFile) {
			T.request.upload(enumAPI.fileParseJson, {file: this.state.jsonFile, exchange: this.state.jsonExtendName}).then(info => {
				T.request.form(enumAPI.fileDownload, {method: 'GET'}, {id: info.data.id, extendName: this.state.jsonExtendName});
			}).catch(info => T.prompt.error(info.msg));
		}
	};
	
	// 解析xlsx文件
	handleParseXlsx = () => {
		if (this.state.xlsxFile) {
			T.request.upload(enumAPI.fileParseXlsx, {file: this.state.xlsxFile, exchange: this.state.xlsxExtendName}).then(info => {
				T.request.form(enumAPI.fileDownload, {method: 'GET'}, {id: info.data.id, extendName: this.state.xlsxExtendName});
			}).catch(info => T.prompt.error(info.msg));
		}
	};
	
	// 解析xml文件
	handleParseXml = () => {
		if (this.state.xmlFile) {
			T.request.upload(enumAPI.fileParseXml, {file: this.state.xmlFile, exchange: fileExtendName.json.value}).then(info => {
				T.request.form(enumAPI.fileDownload, {method: 'GET'}, {id: info.data.id, extendName: fileExtendName.json.value});
			}).catch(info => T.prompt.error(info.msg));
		}
	};
	
	// 解析scv文件
	handleParseCsv = () => {
		if (this.state.csvFile) {
			T.request.upload(enumAPI.fileParseCsv, {file: this.state.csvFile, exchange: this.state.csvExtendName}).then(info => {
				T.request.form(enumAPI.fileDownload, {method: 'GET'}, {id: info.data.id, extendName: this.state.csvExtendName});
			}).catch(info => T.prompt.error(info.msg));
		}
	};
	
	render() {
		return (
			<div
				className={T.classNames(styles['main-container'], 'flex-column-grow')}
			>
				<MainHeader>
					<div className={styles['parse-file-container']}>
						<Button
							onClick={() => this.jsonContainer.click()}
							type="primary"
						>
							解析json
						</Button>
						<Select
							value={this.state.jsonExtendName}
							onChange={jsonExtendName => this.setState({jsonExtendName})}
						>
							{
								this.state.jsonExtendNameData.map((value => <Option key={value.value}>{value.label}</Option>))
							}
						</Select>
						<Button
							onClick={() => this.handleParseJson()}
							type="primary"
						>
							下载
						</Button>
						<input
							style={{display: 'none'}}
							ref={jsonContainer => this.jsonContainer = jsonContainer}
							multiple={false}
							accept="application/json"
							type="file"
							onChange={e => e.target.files && this.setState({jsonFile: e.target.files[0]})}
						/>
					</div>
				</MainHeader>
				<MainHeader>
					<div className={styles['parse-file-container']}>
						<Button
							onClick={() => this.xlsxContainer.click()}
							type="primary"
						>
							解析xlsx
						</Button>
						<Select
							value={this.state.xlsxExtendName}
							onChange={xlsxExtendName => this.setState({xlsxExtendName})}
						>
							{
								this.state.xlsxExtendNameData.map((value => <Option key={value.value}>{value.label}</Option>))
							}
						</Select>
						<Button
							onClick={() => this.handleParseXlsx()}
							type="primary"
						>
							下载
						</Button>
						<input
							style={{display: 'none'}}
							ref={xlsxContainer => this.xlsxContainer = xlsxContainer}
							multiple={false}
							accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
							type="file"
							onChange={e => e.target.files && this.setState({xlsxFile: e.target.files[0]})}
						/>
					</div>
				</MainHeader>
				<MainHeader>
					<div className={styles['parse-file-container']}>
						<Button
							onClick={() => this.csvContainer.click()}
							type="primary"
						>
							解析csv
						</Button>
						<Select
							value={this.state.csvExtendName}
							onChange={csvExtendName => this.setState({csvExtendName})}
						>
							{
								this.state.csvExtendNameData.map((value => <Option key={value.value}>{value.label}</Option>))
							}
						</Select>
						<Button
							onClick={() => this.handleParseCsv()}
							type="primary"
						>
							下载
						</Button>
						<input
							style={{display: 'none'}}
							ref={csvContainer => this.csvContainer = csvContainer}
							multiple={false}
							accept="text/csv"
							type="file"
							onChange={e => e.target.files && this.setState({csvFile: e.target.files[0]})}
						/>
					</div>
				</MainHeader>
				<MainHeader>
					<div className={styles['parse-file-container']}>
						<Button
							onClick={() => this.xmlContainer.click()}
							type="primary"
						>
							解析xml
						</Button>
						<input
							style={{display: 'none'}}
							ref={xmlContainer => this.xmlContainer = xmlContainer}
							multiple={false}
							accept="text/xml"
							type="file"
							onChange={e => e.target.files && this.setState({xmlFile: e.target.files[0]})}
						/>
						<Button
							onClick={() => this.handleParseXml()}
							type="primary"
						>
							下载
						</Button>
					</div>
				</MainHeader>
				<MainHeader>
					<div className={styles['mime-container']}>
						<Input
							value={this.state.mime}
							onChange={event => this.setState({mime: event.target.value})}
							placeholder="mime-type"
						/>
						<div>{mime.getType(this.state.mime)}</div>
					</div>
				</MainHeader>
				<MainHeader>
					<div className={styles['camel-case-container']}>
						<Input
							value={this.state.camelCase}
							onBlur={event => this.setState({camelCase: camelCase(event.target.value)})}
							onChange={event => this.setState({camelCase: event.target.value})}
							placeholder="camelCase"
						/>
						<div>{this.state.camelCase}</div>
					</div>
				</MainHeader>
			</div>
		);
	}
}
