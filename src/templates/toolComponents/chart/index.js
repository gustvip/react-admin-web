/**
 * Created by joey on 2018/02/19
 */
import PropTypes from 'prop-types';
import classnames from 'utils/core/classNames';
import { assign, merge, debounce } from 'lodash';
import Chart from 'chart.js';

export default class ChartComponent extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		style: PropTypes.object,
		options: PropTypes.object.isRequired,
	};
	
	constructor (props) {
		super(props);
		this.chart = null;
		this.chartContainer = null;
	}
	
	get chartInstance () {
		return this.chart;
	}
	
	get defaultOptions () {
		return {};
	}
	
	componentDidMount () {
		const self = this;
		self.chart = new Chart(this.chartContainer, {
			type: 'bar',
			data: {
				labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [
					{
						label: '# of Votes',
						data: [12, 19, 3, 5, 2, 3],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)',
						],
						borderColor: [
							'rgba(255,99,132,1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
						],
						borderWidth: 1,
					}],
			},
			options: {
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
							},
						}],
				},
			},
		});
	}
	
	render () {
		return (
			<canvas
				style={assign({}, this.props.style)}
				className={classnames(this.props.className)}
				ref={chartContainer => this.chartContainer = chartContainer}
			/>
		);
	}
}
