import React from 'react';
import Chart from './index';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

import toFinite from 'lodash/toFinite';
import random from 'lodash/random';

export default class Scatter extends React.PureComponent {
	constructor(props) {
		super(props);
		this.chart = null;
		this.state = {};
	}
	
	get defaultOption() {
		const min = 100;
		const max = 500;
		const province = ['台湾', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '上海', '重庆', '香港', '澳门'];
		const data = province.map((value) => [random(min, max), random(min, max), value]);
		return {
			color: ['#3891ff', '#1fdfe9'],
			tooltip: {
				backgroundColor: '#485465',
				trigger: 'item',
				textStyle: {
					fontSize: 16,
				},
				formatter(item) {
					return `
            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#3891ff;"></span>交易额:&nbsp;${toFinite(item.value[0]).toLocaleString()}亿
            <br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1fdfe9;"></span>交易量:&nbsp;${toFinite(item.value[1]).toLocaleString()}条
          `;
				},
			},
			grid: {
				right: 40,
				left: 80,
				top: 60,
				bottom: 20,
			},
			xAxis: {
				axisLine: {
					lineStyle: {
						color: '#485465',
					},
					show: true,
				},
				axisTick: {
					show: false,
				},
				axisLabel: {
					show: false,
				},
				splitLine: {
					show: false,
				},
			},
			yAxis: {
				axisLine: {
					lineStyle: {
						color: '#485465',
					},
					show: true,
				},
				axisTick: {
					show: true,
				},
				axisLabel: {
					show: true,
					inside: false,
					rotate: 0,
					margin: 12,
					color: '#fff',
					fontSize: 16,
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: ['#485465'],
						width: .5,
						type: 'dashed',
					},
				},
				name: '（万笔）',
				nameLocation: 'end',
				nameTextStyle: {
					color: '#fff',
					fontSize: 16,
					align: 'left',
					padding: [0, 0, 0, -30],
				},
				nameGap: 10,
				show: true,
				scale: true,
				min: 0,
			},
			series: [
				{
					symbolSize(value) {
						return value[2].length * 12;
					},
					label: {
						formatter: '{@[2]}',
						color: '#fff',
						fontSize: 10,
						show: true,
					},
					type: 'scatter',
					data: data,
				},
			],
		};
	}
	
	render() {
		return (
			<Chart
				ref={chart => this.chart = chart}
				option={this.defaultOption}
				extraOption={{height: 150}}
			/>
		);
	}
}
