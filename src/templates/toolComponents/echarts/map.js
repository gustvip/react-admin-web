import Chart from './index';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

export default class Map extends React.PureComponent {
	constructor(props) {
		super(props);
		this.chart = null;
	}
	
	get defaultOption() {
		return {
			backgroundColor: 'transparent',
			color: ['#FFE326 ', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
			title: {
				left: 'center',
				top: 30,
				text: `${_.toFinite(_.random(1000, 1000000)).toLocaleString()}条`,
				textStyle: {
					color: '#71f4d8',
					fontStyle: 'normal',
					fontWeight: 'bold',
					fontSize: 16,
				},
				subtext: '',
				subtextStyle: {
					color: '#fff',
					fontStyle: 'normal',
					fontWeight: 'normal',
					fontSize: 12,
				},
			},
			geo: {
				map: 'china',
				regions: [
					{
						name: '南海诸岛',
						itemStyle: {
							normal: {
								opacity: 1,
								label: {
									show: true,
								},
							},
						},
					}],
				label: {
					normal: {
						show: true,
						position: 'bottom',
						offset: [0, 0],
						color: '#fff',
						fontStyle: 'normal',
						fontWeight: 'normal',
						fontSize: 8,
					},
					emphasis: {
						show: false,
						position: 'bottom',
						offset: [0, 0],
						color: '#fff',
						fontStyle: 'normal',
						fontWeight: 'normal',
						fontSize: 8,
					},
				},
				roam: false, // 是否允许缩放
				layoutSize: '100%',
				left: 30,
				right: 30,
				top: 30,
				bottom: 60,
				itemStyle: {
					normal: {
						areaColor: 'rgba(46, 105, 163, 0.8)', // 区域颜色
						borderColor: '#3fa4d7', // 省市边界线
					},
					emphasis: {
						areaColor: '#3fa4d7', // 区域颜色
						borderColor: '#3fa4d7', // 省市边界线
					},
				},
			},
		};
	}
	
	render() {
		return (
			<Chart
				ref={chart => this.chart = chart}
				option={this.defaultOption}
			/>
		);
	}
}
