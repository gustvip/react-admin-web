import React from 'react';
import T from 'utils/t';
import enumAPI from 'constants/enumAPI';
import { Button, Input, Select } from 'antd';
import mime from 'mime';
import styles from './parseFile.scss';
import enumAuth from 'constants/enumAuth';
import { fileExtendName } from 'constants/app/common';
import { camelCase } from 'lodash';
import MainHeader from 'templates/toolComponents/mainHeader';

const {AuthComponent} = T;
const Option = Select.Option;

function getExtendNameData (extendName) {
	return Object.values(fileExtendName).filter(value => value.value !== extendName);
}

export default class TestComponent extends React.PureComponent {
	constructor () {
		super();
		this.jsonContainer = null;
		this.xlsxContainer = null;
		this.xmlContainer = null;
		this.csvContainer = null;
		this.state = {
			mime: '',
			camelCase: '',
			
			jsonExtendName: fileExtendName.xlsx.value,
			jsonExtendNameData: getExtendNameData(fileExtendName.json.value),
			
			xlsxExtendName: fileExtendName.json.value,
			xlsxExtendNameData: getExtendNameData(fileExtendName.xlsx.value),
			
			csvExtendName: fileExtendName.json.value,
			csvExtendNameData: getExtendNameData(fileExtendName.csv.value),
			
			xmlExtendName: fileExtendName.json.value,
			xmlExtendNameData: getExtendNameData(),
		};
	}
	
	// 解析json文件
	handleParseJson = (file) => {
		T.request.upload(enumAPI.fileParseJson, {file}).then(info => {
			T.request.form(enumAPI.fileDownload, {method: 'GET'}, {id: info.data.id, extendName: fileExtendName.json.value});
		}).catch(info => T.prompt.error(info.msg));
	};
	
	// 解析xlsx文件
	handleParseXlsx = (file) => {
		T.request.upload(enumAPI.fileParseXlsx, {file, exchange: this.state.xlsxExtendName}).then(info => {
			T.request.form(enumAPI.fileDownload, {method: 'GET'}, {id: info.data.id, extendName: this.state.xlsxExtendName});
		}).catch(info => T.prompt.error(info.msg));
	};
	
	// 解析xml文件
	handleParseXml = (file) => {
		T.request.upload(enumAPI.fileParseXml, {file}).then(info => {
			T.request.form(enumAPI.fileDownload, {method: 'GET'}, {id: info.data.id, extendName: fileExtendName.json.value});
		}).catch(info => T.prompt.error(info.msg));
	};
	
	// 解析scv文件
	handleParseCsv = (file) => {
		T.request.upload(enumAPI.fileParseCsv, {file}).then(info => {
			T.request.form(enumAPI.fileDownload, {method: 'GET'}, {id: info.data.id, extendName: fileExtendName.json.value});
		}).catch(info => T.prompt.error(info.msg));
	};
	
	render () {
		return (
			<div
				className={T.classNames(styles['main-container'], 'flex-column-grow')}
			>
				<AuthComponent auth={enumAuth.sFileParseXlsx.value}>
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
									this.state.jsonExtendNameData.map((value => {
										return <Option key={value.value}>{value.label}</Option>;
									}))
								}
							</Select>
							<input
								style={{display: 'none'}}
								ref={jsonContainer => this.jsonContainer = jsonContainer}
								multiple={false}
								accept="application/json"
								type="file"
								onChange={(e) => e.target.files && this.handleParseJson(e.target.files[0])}
							/>
						</div>
					</MainHeader>
				</AuthComponent>
				<AuthComponent auth={enumAuth.sFileParseXlsx.value}>
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
									this.state.xlsxExtendNameData.map((value => {
										return <Option key={value.value}>{value.label}</Option>;
									}))
								}
							</Select>
							<input
								style={{display: 'none'}}
								ref={xlsxContainer => this.xlsxContainer = xlsxContainer}
								multiple={false}
								accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
								type="file"
								onChange={(e) => e.target.files && this.handleParseXlsx(e.target.files[0])}
							/>
						</div>
					</MainHeader>
				</AuthComponent>
				<AuthComponent auth={enumAuth.sFileParseCsv.value}>
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
									this.state.csvExtendNameData.map((value => {
										return <Option key={value.value}>{value.label}</Option>;
									}))
								}
							</Select>
							<input
								style={{display: 'none'}}
								ref={csvContainer => this.csvContainer = csvContainer}
								multiple={false}
								accept="text/csv"
								type="file"
								onChange={(e) => e.target.files && this.handleParseCsv(e.target.files[0])}
							/>
						</div>
					</MainHeader>
				</AuthComponent>
				<AuthComponent auth={enumAuth.sFileParseXml.value}>
					<MainHeader>
						<div className={styles['parse-file-container']}>
							<Button
								onClick={() => this.xmlContainer.click()}
								type="primary"
							>
								解析xml
							</Button>
							<Select
								value={this.state.xmlExtendName}
								onChange={xmlExtendName => this.setState({xmlExtendName})}
							>
								{
									this.state.xmlExtendNameData.map((value => {
										return <Option key={value.value}>{value.label}</Option>;
									}))
								}
							</Select>
							<input
								style={{display: 'none'}}
								ref={xmlContainer => this.xmlContainer = xmlContainer}
								multiple={false}
								accept="text/xml"
								type="file"
								onChange={(e) => e.target.files && this.handleParseXml(e.target.files[0])}
							/>
						</div>
					</MainHeader>
				</AuthComponent>
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
