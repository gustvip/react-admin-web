import PropTypes from 'prop-types';
import Chart from './index';
import _ from 'lodash';
import React from 'react';

export default class Bar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.chart = null;
	}
	
	get defaultOption() {
		const min = 100;
		const max = 500;
		const province = ['台湾', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '上海', '重庆', '香港', '澳门'];
		const data = province.map(() => _.random(min, max));
		const maxValue = _.max(data);
		return {
			color: [
				{
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [
						{
							offset: 0,
							color: '#f2f26d',
						}, {
							offset: 1,
							color: '#e68a2e',
						}],
					globalCoord: false,
				},
			],
			tooltip: {
				backgroundColor: '#485465',
				trigger: 'item',
				formatter(item) {
					return `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#f2f26d;"></span>${_.toFinite(item.value).toLocaleString()}条`;
				},
			},
			grid: {
				right: 0,
				left: 40,
			},
			xAxis: {
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				axisLabel: {
					show: true,
					inside: false,
					margin: 8,
					color: '#fff',
					fontStyle: 'normal',
					fontWeight: 'normal',
					fontSize: 8,
				},
				splitLine: {
					show: false,
				},
				type: 'category',
				data: province,
			},
			yAxis: {
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				axisLabel: {
					show: true,
					inside: false,
					rotate: 0,
					margin: 8,
					color: '#64a6e0',
					fontStyle: 'normal',
					fontWeight: 'normal',
					fontSize: 12,
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: ['#4978b9'],
						width: 1,
						type: 'dashed',
					},
				},
				name: '（万条）',
				nameLocation: 'end',
				nameTextStyle: {
					color: '#64a6e0',
					fontSize: 12,
				},
				show: true,
				scale: true,
				min: 0,
				max: maxValue,
			},
			legend: {
				show: false,
				selectedMode: false,
				textStyle: {
					color: '#64a6e0',
					fontSize: 12,
				},
				orient: 'horizontal',
				left: 'right',
			},
			series: [
				{
					type: 'bar',
					name: '分类1',
					data: data,
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
