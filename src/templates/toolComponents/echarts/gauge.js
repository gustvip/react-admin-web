import PropTypes from 'prop-types';
import Chart from './index';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import React from 'react';

import random from 'lodash/random';
import round from 'lodash/round';

export default class Gauge extends React.PureComponent {
	constructor(props) {
		super(props);
		this.chart = null;
	}
	
	get defaultOption() {
		return {
			series: [
				{
					name: '参与度',
					center: ['25%', '50%'],
					type: 'gauge',
					min: 0,
					max: 100,
					radius: '90%',
					splitNumber: 10,
					axisLine: { // 坐标轴线
						lineStyle: { // 属性lineStyle控制线条样式
							color: [
								[0, '#3023ae'],
								[0.15, '#3023ae'],
								[0.30, '#53a0fd'],
								[0.70, '#b4ec51'],
								[0.85, '#53a0fd'],
								[1, '#3023ae'],
							],
							width: 5,
						},
					},
					axisLabel: { // 坐标轴小标记
						textStyle: { // 属性lineStyle控制线条样式
							fontWeight: 'normal',
							color: '#fff',
							fontSize: 10,
						},
					},
					axisTick: { // 坐标轴小标记
						length: 12, // 属性length控制线长
						lineStyle: { // 属性lineStyle控制线条样式
							color: 'auto',
						},
					},
					splitLine: { // 分隔线
						length: 16, // 属性length控制线长
						lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
							width: 3,
							color: 'auto',
						},
					},
					pointer: {
						length: '60%',
						width: 8,
					},
					title: {
						textStyle: {
							fontWeight: 'normal',
							fontSize: 18,
							fontStyle: 'normal',
							color: '#fff',
						},
						offsetCenter: [0, '70%'],
						bottom: 0,
					},
					detail: {
						show: true,
						formatter(value) {
							return `${round(value, 2) }%`;
						},
						fontSize: 24,
					},
					data: [
						{
							value: random(10, 100, 0.1),
							name: '参与度',
						}],
				},
			],
		};
	}
	
	render() {
		return <Chart
			ref={chart => this.chart = chart}
			option={this.defaultOption}
		/>;
	}
}
