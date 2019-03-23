import Chart from './index';
import PropTypes from 'prop-types';
import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

import random from 'lodash/random';

import china from './geoJson/china.json';
import anhui from './geoJson/anhui.json';
import aomen from './geoJson/aomen.json';
import beijing from './geoJson/beijing.json';
import chongqing from './geoJson/chongqing.json';
import fujian from './geoJson/fujian.json';
import gansu from './geoJson/gansu.json';
import guangdong from './geoJson/guangdong.json';
import guangxi from './geoJson/guangxi.json';
import guizhou from './geoJson/guizhou.json';
import hainan from './geoJson/hainan.json';
import hebei from './geoJson/hebei.json';
import heilongjiang from './geoJson/heilongjiang.json';
import henan from './geoJson/henan.json';
import hubei from './geoJson/hubei.json';
import hunan from './geoJson/hunan.json';
import jiangsu from './geoJson/jiangsu.json';
import jiangxi from './geoJson/jiangxi.json';
import jilin from './geoJson/jilin.json';
import liaoning from './geoJson/liaoning.json';
import neimenggu from './geoJson/neimenggu.json';
import ningxia from './geoJson/ningxia.json';
import qinghai from './geoJson/qinghai.json';
import shandong from './geoJson/shandong.json';
import shanghai from './geoJson/shanghai.json';
import shanxi from './geoJson/shanxi.json';
import shanxi1 from './geoJson/shanxi1.json';
import sichuan from './geoJson/sichuan.json';
import taiwan from './geoJson/taiwan.json';
import tianjin from './geoJson/tianjin.json';
import xianggang from './geoJson/xianggang.json';
import xinjiang from './geoJson/xinjiang.json';
import xizang from './geoJson/xizang.json';
import yunnan from './geoJson/yunnan.json';
import zhejiang from './geoJson/zhejiang.json';

const ENUM_PLACE = {
	china: {
		cName: '全国',
		eName: 'china',
	},
	anhui: {
		cName: '安徽',
		eName: 'anhui',
	},
	aomen: {
		cName: '澳门',
		eName: 'aomen',
	},
	beijing: {
		cName: '北京',
		eName: 'beijing',
	},
	chongqing: {
		cName: '重庆',
		eName: 'chongqing',
	},
	fujian: {
		cName: '福建',
		eName: 'fujian',
	},
	gansu: {
		cName: '甘肃',
		eName: 'gansu',
	},
	guangdong: {
		cName: '广东',
		eName: 'guangdong',
	},
	guangxi: {
		cName: '广西',
		eName: 'guangxi',
	},
	guizhou: {
		cName: '贵州',
		eName: 'guizhou',
	},
	hainan: {
		cName: '海南',
		eName: 'hainan',
	},
	hebei: {
		cName: '河北',
		eName: 'hebei',
	},
	heilongjiang: {
		cName: '黑龙江',
		eName: 'heilongjiang',
	},
	henan: {
		cName: '河南',
		eName: 'henan',
	},
	hubei: {
		cName: '湖北',
		eName: 'hubei',
	},
	hunan: {
		cName: '湖南',
		eName: 'hunan',
	},
	jiangsu: {
		cName: '江苏',
		eName: 'jiangsu',
	},
	jiangxi: {
		cName: '江西',
		eName: 'jiangxi',
	},
	jilin: {
		cName: '吉林',
		eName: 'jilin',
	},
	liaoning: {
		cName: '辽宁',
		eName: 'liaoning',
	},
	neimenggu: {
		cName: '内蒙古',
		eName: 'neimenggu',
	},
	ningxia: {
		cName: '宁夏',
		eName: 'ningxia',
	},
	qinghai: {
		cName: '青海',
		eName: 'qinghai',
	},
	shandong: {
		cName: '山东',
		eName: 'shandong',
	},
	shanghai: {
		cName: '上海',
		eName: 'shanghai',
	},
	shanxi: {
		cName: '山西',
		eName: 'shanxi',
	},
	shanxi1: {
		cName: '陕西',
		eName: 'shanxi1',
	},
	sichuan: {
		cName: '四川',
		eName: 'sichuan',
	},
	taiwan: {
		cName: '台湾',
		eName: 'taiwan',
	},
	tianjin: {
		cName: '天津',
		eName: 'tianjin',
	},
	xianggang: {
		cName: '香港',
		eName: 'xianggang',
	},
	xinjiang: {
		cName: '新疆',
		eName: 'xinjiang',
	},
	xizang: {
		cName: '西藏',
		eName: 'xizang',
	},
	yunnan: {
		cName: '云南',
		eName: 'yunnan',
	},
	zhejiang: {
		cName: '浙江',
		eName: 'zhejiang',
	},
};

echarts.registerMap(ENUM_PLACE.china.eName, china);
echarts.registerMap(ENUM_PLACE.anhui.cName, anhui);
echarts.registerMap(ENUM_PLACE.aomen.cName, aomen);
echarts.registerMap(ENUM_PLACE.beijing.cName, beijing);
echarts.registerMap(ENUM_PLACE.chongqing.cName, chongqing);
echarts.registerMap(ENUM_PLACE.fujian.cName, fujian);
echarts.registerMap(ENUM_PLACE.gansu.cName, gansu);
echarts.registerMap(ENUM_PLACE.guangdong.cName, guangdong);
echarts.registerMap(ENUM_PLACE.guangxi.cName, guangxi);
echarts.registerMap(ENUM_PLACE.guizhou.cName, guizhou);
echarts.registerMap(ENUM_PLACE.hainan.cName, hainan);
echarts.registerMap(ENUM_PLACE.hebei.cName, hebei);
echarts.registerMap(ENUM_PLACE.heilongjiang.cName, heilongjiang);
echarts.registerMap(ENUM_PLACE.henan.cName, henan);
echarts.registerMap(ENUM_PLACE.hubei.cName, hubei);
echarts.registerMap(ENUM_PLACE.hunan.cName, hunan);
echarts.registerMap(ENUM_PLACE.jiangsu.cName, jiangsu);
echarts.registerMap(ENUM_PLACE.jiangxi.cName, jiangxi);
echarts.registerMap(ENUM_PLACE.jilin.cName, jilin);
echarts.registerMap(ENUM_PLACE.liaoning.cName, liaoning);
echarts.registerMap(ENUM_PLACE.neimenggu.cName, neimenggu);
echarts.registerMap(ENUM_PLACE.ningxia.cName, ningxia);
echarts.registerMap(ENUM_PLACE.qinghai.cName, qinghai);
echarts.registerMap(ENUM_PLACE.shandong.cName, shandong);
echarts.registerMap(ENUM_PLACE.shanghai.cName, shanghai);
echarts.registerMap(ENUM_PLACE.shanxi.cName, shanxi);
echarts.registerMap(ENUM_PLACE.shanxi1.cName, shanxi1);
echarts.registerMap(ENUM_PLACE.sichuan.cName, sichuan);
echarts.registerMap(ENUM_PLACE.taiwan.cName, taiwan);
echarts.registerMap(ENUM_PLACE.tianjin.cName, tianjin);
echarts.registerMap(ENUM_PLACE.xianggang.cName, xianggang);
echarts.registerMap(ENUM_PLACE.xinjiang.cName, xinjiang);
echarts.registerMap(ENUM_PLACE.xizang.cName, xizang);
echarts.registerMap(ENUM_PLACE.yunnan.cName, yunnan);
echarts.registerMap(ENUM_PLACE.zhejiang.cName, zhejiang);

export default class Map extends React.PureComponent {
	constructor(props) {
		super(props);
		this.chart = null;
		this.state = {
			place: ENUM_PLACE.china.eName,
		};
	}
	
	componentDidMount() {
		this.handleRegionClick();
	}
	
	handlePlaceChange = place => {
		const self = this;
		const chart = self.chart;
		const oldPlace = self.state.place;
		this.setState({place}, () => {
			if (place !== oldPlace && chart) {
				chart.echartsInstance.clear();
				chart.echartsInstance.off('click');
				chart.echartsInstance.setOption(self.getOption({place}, {notMerge: true}));
				if (place === ENUM_PLACE.china.eName) {
					self.handleRegionClick();
				}
			}
		});
	};
	
	/**
	 * 中国地图点击
	 */
	handleRegionClick = () => {
		const self = this;
		const echartsInstance = self.chart.echartsInstance;
		echartsInstance.on('click', event => {
			self.handlePlaceChange(event.name);
		});
	};
	
	getOption = ({place} = {}) => {
		const mapData = Object.values(ENUM_PLACE).
			map(value => ({
				value: random(1000, 1000000),
				name: value.cName,
			}));
		const titleTop = 16;
		const mapTop = 64;
		return {
			backgroundColor: 'transparent',
			color: ['#FFE326 ', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
			title: {
				left: 'center',
				top: titleTop,
				textStyle: {
					color: '#71f4d8',
					fontStyle: 'normal',
					fontWeight: 'bold',
					fontSize: 34,
				},
				subtext: '',
			},
			series: [
				{
					type: 'map',
					mapType: place,
					data: mapData,
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
							fontSize: 7.3,
						},
					},
					roam: true, // 是否允许缩放
					layoutSize: '100%',
					left: 20,
					right: 20,
					top: mapTop,
					bottom: 40,
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
			],
		};
	};
	
	render() {
		return (
			<div>
				<div>
					<a
						onClick={() => this.handlePlaceChange(ENUM_PLACE.china.eName)}
						key={ENUM_PLACE.china.eName}
					>
						{ENUM_PLACE.china.cName}
					</a>
					{
						this.state.place !== ENUM_PLACE.china.eName && (
							<a
								key={this.state.place}
							>
								{this.state.place}
							</a>
						)
					}
				</div>
				<Chart
					ref={chart => this.chart = chart}
					option={this.getOption({place: this.state.place})}
					extraOption={{height: 500}}
				/>
			</div>
		);
	}
}
