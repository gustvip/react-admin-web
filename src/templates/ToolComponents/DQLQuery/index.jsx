import styles from './index.scss'
import ModelEditor from 'tj-model-editor'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'
import { Component } from 'react'
import T from 'utils/T'

@T.decorator.propTypes({
	original_config: PropTypes.string.isRequired,
	dataStores: PropTypes.array.isRequired,
})
export default class ModelConf extends Component {
	static defautProps = {
		original_config: '',
	}
	
	constructor () {
		super()
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.senseApp = null
	}
	
	componentDidMount () {
		this.initEditor()
	}
	
	componentWillUnmount () {
		this.senseApp && this.senseApp.destroy()
	}
	
	componentWillReceiveProps (props) {
		this.senseApp.setContent(props.original_config)
	}
	
	/**
	 * 格式化请求组
	 * @param {Array}requests
	 * @returns {*}
	 */
	formatRequests (requests) {
		let currentGroupName = ''
		// 自动补齐outputTableName
		for (var i = 0; i < requests.length; i++) {
			
			if (!requests[i].hasOwnProperty('groupName')) {
				if (!requests[i].outputTable) {
					requests[i].outputTable = 'step' + (i + 1)
				}
			}
			//兼容模型分组
			else if (requests[i].hasOwnProperty('groupName') && requests[i].hasOwnProperty('options')) {
				//获取请求的groupName
				if (step == i + 1) {
					currentGroupName = requests[i]['groupName']
				}
				
				for (var j = 0; j < requests[i]['options'].length; j++) {
					if (!requests[i]['options'][j].outputTable) {
						requests[i]['options'][j].outputTable = 'step' + i + j
					}
				}
			}
		}
		
		return requests
	}
	
	/**
	 * 初始化编辑器
	 */
	initEditor () {
		const {doQueryDataModel, dataStores, id} = this.props
		
		const senseApp = new ModelEditor(document.querySelector('#' + id), {
			worker: window.ENV.publicPath + '/worker-sense.js',
			query: (requests, step, callback) => {
				requests = this.formatRequests(requests)
				
				// 将响应内容显示在右侧框中
				doQueryDataModel(requests, step).then((resp) => {
					this.senseApp.mapping.setMappings(this.getMappingKeys(resp.data))
					callback(JSON.stringify(resp.data, null, 4))
				}, (resp) => {
					this.senseApp.mapping.setMappings([])
					callback(JSON.stringify({error: resp.msg}, null, 4))
				})
			},
			dataSources: dataStores,
		})
		this.senseApp = senseApp
		
		// 添加查询按钮
		senseApp.addActionButton('Send', $('<i class="fa fa-play"></i>').click(function () {
			senseApp.send()
		}))
		
		// 添加自动格式化代码
		senseApp.addActionButton('Indent', $('<i class="fa fa-align-justify"></i>').click(function () {
			senseApp.autoIndent()
		}))
		
		// 设置编辑器内容
		senseApp.setContent(this.props.original_config)
	}
	
	/**
	 * 获取内容
	 */
	getContent (callback) {
		this.senseApp.getAllRequests((requests) => {
			callback({
				config: this.formatRequests(requests),
				original_config: this.senseApp.getContent(),
			})
		})
	}
	
	/**
	 * 获取查询结果的mapping key
	 * @param data
	 * @return {Array}
	 */
	getMappingKeys (data) {
		let keys = []
		
		const getPaths = (cObj, parent) => {
			for (let k in cObj) {
				if (cObj.hasOwnProperty(k)) {
					var key = (parent || '') + k
					
					if (typeof cObj[k] == 'object') {
						if (cObj[k] instanceof Array) {
							if (cObj[k][0]) {
								getPaths(cObj[k][0], key + '[].')
							}
							
						} else {
							getPaths(cObj[k], key + '.')
						}
					} else {
						keys.push(key)
					}
				}
			}
		}
		
		if (data instanceof Array) {
			getPaths(data[0], '[].')
		} else {
			getPaths(data)
		}
		
		return keys
	};
	
	render () {
		const {id} = this.props
		return (
			<div id={id} className={styles['model-create-container']}
					 style={{width: '100%', height: '600px', position: 'relative'}}></div>
		)
	}
}
