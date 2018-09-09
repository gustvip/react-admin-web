import PropTypes from 'prop-types';
import mapUtils from 'utils/amap';
import noop from 'lodash/noop';
import merge from 'lodash/merge';
import isFunction from 'lodash/isFunction';
import classNames from 'utils/core/classNames';

export default class AMap extends React.PureComponent {
	static defaultProps = {
		className: '',
		style: {},
	};
	
	static propTypes = {
		className: PropTypes.string,
		mapLoadCallback: PropTypes.func,
		style: PropTypes.object,
	};
	
	constructor() {
		super();
		this._mapContainer = null;
		this.mapUtils = new mapUtils();
	}
	
	componentDidMount() {
		this.mapUtils.createMap(this._mapContainer, {});
		const { mapLoadCallback } = this.props;
		this.mapUtils.mapInstance.on('complete', isFunction(mapLoadCallback) ? mapLoadCallback : noop);
	}
	
	componentWillUnmount() {
		if (this.mapUtils.mapInstance) {
			this.mapUtils.destroy();
		}
	}
	
	render() {
		const baseStyle = {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
		};
		const { className, style = {} } = this.props;
		return (
			<div
				ref={_mapContainer => this._mapContainer = _mapContainer}
				className={classNames(className)}
				style={merge(baseStyle, style)}
			/>
		);
	}
}
