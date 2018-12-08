import PropTypes from 'prop-types';
import Chart from './index';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import React from 'react';

import random from 'lodash/random';
import toFinite from 'lodash/toFinite';

export default class Pie extends React.PureComponent {
	constructor(props) {
		super(props);
		this.chart = null;
	}
	
	get defaultOption() {
		const min = 100;
		const max = 500;
		const dataSource = [
			{
				value: random(min, max),
				name: '工程招投标',
			},
			{
				value: random(min, max),
				name: '政府采购',
			},
			{
				value: random(min, max),
				name: '土地以使用权出让',
			},
			{
				value: random(min, max),
				name: '矿业权出让',
			},
			{
				value: random(min, max),
				name: '国有产权',
			},
		];
		const categoryData = dataSource.map(value => value.name);
		
		return {
			color: ['#3891ff', '#60b7ff', '#facf14', '#e36d6f', '#1fdfe9', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
			tooltip: {
				backgroundColor: '#485465',
				trigger: 'item',
				formatter(item) {
					return `${item.marker}${toFinite(item.value).toLocaleString()}条`;
				},
			},
			legend: {
				selectedMode: false,
				textStyle: {
					color: '#64a6e0',
				},
				orient: 'vertical',
				left: 'right',
				top: 20,
				data: categoryData,
			},
			series: [
				{
					name: '',
					type: 'pie',
					radius: '30%',
					center: ['30%', '50%'],
					label: {
						formatter: '{d}%',
						textStyle: {
							color: '#eff7ff',
						},
					},
					data: dataSource,
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
