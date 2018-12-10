import React from 'react';
import T from 'utils/t';
import enumAPI from 'constants/enumAPI';
import {Button, Input} from 'antd';
import mime from 'mime';
import styles from './parseFile.scss';
import enumAuth from 'constants/enumAuth';

import camelCase from 'lodash/camelCase';

const {AuthComponent} = T;

export default class TestComponent extends React.PureComponent {
	constructor() {
		super();
		this.xlsxContainer = null;
		this.xmlContainer = null;
		this.csvContainer = null;
		this.container = null;
		this.state = {
			mime: '',
			camelCase: '',
		};
	}
	
	handleParseXlsx = (file) => {
		T.request.upload(enumAPI.fileParseXlsx, {file}).then(info => {
			T.request.form(enumAPI.fileDownJson, {method: 'GET'}, {id: info.data.id});
		}).catch(info => T.prompt.error(info.msg));
	};
	
	handleParseXml = (file) => {
		T.request.upload(enumAPI.fileParseXml, {file}).then(info => {
			T.request.form(enumAPI.fileDownJson, {method: 'GET'}, {id: info.data.id});
		}).catch(info => T.prompt.error(info.msg));
	};
	
	handleParseCsv = (file) => {
		T.request.upload(enumAPI.fileParseCsv, {file}).then(info => {
			T.request.form(enumAPI.fileDownJson, {method: 'GET'}, {id: info.data.id});
		}).catch(info => T.prompt.error(info.msg));
	};
	
	render() {
		return (
			<div
				className={T.classNames(styles['main-container'], 'flex-column-grow')}
				ref={container => this.container = container}
			>
				<AuthComponent auth={enumAuth.sFileParseXml.value}>
					<div className="xml-container">
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
							onChange={(e) => e.target.files && this.handleParseXml(e.target.files[0])}
						/>
					</div>
				</AuthComponent>
				<AuthComponent auth={enumAuth.sFileParseXlsx.value}>
					<div className="xlsx-container">
						<Button
							onClick={() => this.xlsxContainer.click()}
							type="primary"
						>
							解析xlsx
						</Button>
						<input
							style={{display: 'none'}}
							ref={xlsxContainer => this.xlsxContainer = xlsxContainer}
							multiple={false}
							accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
							type="file"
							onChange={(e) => e.target.files && this.handleParseXlsx(e.target.files[0])}
						/>
					</div>
				</AuthComponent>
				<AuthComponent auth={enumAuth.sFileParseCsv.value}>
					<div className="csv-container">
						<Button
							onClick={() => this.csvContainer.click()}
							type="primary"
						>
							解析csv
						</Button>
						<input
							style={{display: 'none'}}
							ref={csvContainer => this.csvContainer = csvContainer}
							multiple={false}
							accept="text/csv"
							type="file"
							onChange={(e) => e.target.files && this.handleParseCsv(e.target.files[0])}
						/>
					</div>
				</AuthComponent>
				<div className="mime-container">
					<Input
						value={this.state.mime}
						onChange={event => this.setState({mime: event.target.value})}
						placeholder="mime-type"
					/>
					<div className="content">
						{mime.getType(this.state.mime)}
					</div>
				</div>
				<div className="mime-container">
					<Input
						value={this.state.camelCase}
						onBlur={event => this.setState({camelCase: camelCase(event.target.value)})}
						onChange={event => this.setState({camelCase: event.target.value})}
						placeholder="camelCase"
					/>
					<div className="content">
						{this.state.camelCase}
					</div>
				</div>
			</div>
		);
	}
}
