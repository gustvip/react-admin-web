import PropTypes from 'prop-types'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import helper from 'utils/core/helper'
import _ from 'lodash'

export default class Chart extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    theme: PropTypes.string,
    style: PropTypes.object,
    extraOptions: PropTypes.object,
    options: PropTypes.object.isRequired,
  }
  
  constructor () {
    super()
    this.chart = null
    this.chartContainer = null
  }
  
  get echartsInstance () {
    return this.chart
  }
  
  get defaultOptions () {
    return {
      toolbox: {
        show: false,
      },
      color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
    }
  }
  
  componentDidMount () {
    this.chart = echarts.init(this.chartContainer, this.props.theme || '', _.assign({
      height: 400,
    }, this.props.extraOptions))
    this.chart.setOption(_.merge(this.defaultOptions, this.props.options))
  }
  
  render () {
    return (
      <div
        style={_.assign({}, this.props.style)}
        className={helper.classNames('')(this.props.className)}
        ref={chartContainer => this.chartContainer = chartContainer}
      />
    )
  }
}