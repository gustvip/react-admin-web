/**
 * Created by joey on 2018/02/19
 */
import PropTypes from 'prop-types'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
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
  
  constructor (props) {
    super(props)
    this.chart = null
    this.chartContainer = null
  }
  
  get echartsInstance () {
    return this.chart
  }
  
  get defaultOptions () {
    return {
      backgroundColor: '#efefef',
      color: ['#f00', '#ff0', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
      title: {
        left: 'auto',
        right: 'auto',
        top: 'auto',
        bottom: 'auto',
        text: '',
        textStyle: {
          color: '#333',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: 18,
        },
        subtext: '',
        subtextStyle: {
          color: '#333',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: 12,
        },
      },
      legend: {
        show: true,
        left: 'auto',
        right: 10,
        top: 'auto',
        bottom: 'auto',
        orient: 'horizontal', //vertical
        selectedMode: false,
        itemGap: 10,
        textStyle: {
          color: '#333',
          fontSize: 12,
          fontStyle: 'normal',
          fontWeight: 'normal',
        },
      },
      tooltip: {
        show: true,
        backgroundColor: 'rgba(50,50,50,.7)',
        padding: 5,
        trigger: 'item',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#555',
            width: 1,
            type: 'solid',
          },
          label: {
            show: true,
            margin: 10,
            color: '#fff',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 20,
            padding: 5,
            backgroundColor: 'rgba(50,50,50,.7)',
          },
        },
        textStyle: {
          color: '#fff',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: 14,
        },
      },
      
      xAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: '#333',
            width: 1,
            type: 'solid',
          },
        },
        axisTick: {
          show: true,
          inside: false,
          length: 5,
          lineStyle: {
            color: '#333',
            width: 1,
            type: 'solid',
          },
        },
        axisLabel: {
          show: true,
          inside: false,
          rotate: 0,
          margin: 8,
          color: '#333',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: 12,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#ccc'],
            width: 1,
            type: 'solid',
          },
        },
        show: true,
      },
      yAxis: [
        {
          axisLine: {
            show: true,
            lineStyle: {
              color: '#333',
              width: 1,
              type: 'solid',
            },
          },
          axisTick: {
            show: true,
            inside: false,
            length: 5,
            lineStyle: {
              color: '#333',
              width: 1,
              type: 'solid',
            },
          },
          axisLabel: {
            show: true,
            inside: false,
            rotate: 0,
            margin: 8,
            color: '#333',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 12,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#ccc'],
              width: 1,
              type: 'solid',
            },
          },
          show: true,
          scale: true,
        }],
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