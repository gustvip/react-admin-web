/**
 * Created by joey on 2018/2/18
 */
import ReactEcharts from 'echarts-for-react'
import _ from 'utils/core/lodash'
import PropTypes from 'prop-types'
import { BASIS_OPTION } from './constants/index'
import { contextTypes } from 'utils/core/decorator'

@contextTypes({
	option: PropTypes.object.isRequired,
	notMerge: PropTypes.bool,
	lazyUpdate: PropTypes.bool,
	theme: PropTypes.string,
	onChartReady: PropTypes.func,
	onEvents: PropTypes.func,
	opts: PropTypes.object,
})
export default class BasisChart extends React.PureComponent {
	constructor (props) {
		super(props)
		this.chart = null
	}
	
	get getEchartsInstance () {
		return this.chart.getEchartsInstance
	}
	
	render () {
		const _this = this
		const props = _this.props
		
		return <ReactEcharts
			option={Object.assign({}, BASIS_OPTION, props.option)}
			notMerge={_.isBoolean(props.notMerge) ? props.notMerge : false}
			lazyUpdate={_.isBoolean(props.lazyUpdate) ? props.lazyUpdate : false}
			theme={props.theme}
			onChartReady={props.onChartReady}
			onEvents={props.onEvents}
			opts={props.opts}
			ref={ref => _this.chart = ref}
		/>
	}
}
