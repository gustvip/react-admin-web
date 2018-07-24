import PropTypes from 'prop-types'
import mapUtils from 'utils/amap'
import T from 'utils/T'

export default class AMap extends React.PureComponent {
	static defaultProps = {
		className: '',
		style: {},
	}
	
	static propTypes = {
		className: PropTypes.string,
		mapLoadCallback: PropTypes.func,
		style: PropTypes.object,
	}
	
	constructor () {
		super()
		this._mapContainer = null
		this.mapUtils = new mapUtils()
	}
	
	componentDidMount () {
		const _this = this
		this.mapUtils.createMap(this._mapContainer, {})
		this.mapUtils.mapInstance.on('complete', function () {
			(_this.props.mapLoadCallback || T.lodash.noop)()
		})
	}
	
	componentWillUnmount () {
		this.mapUtils.destroy()
	}
	
	render () {
		const baseStyle = {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
		}
		const {className = '', style = {}} = this.props
		return (
			<div
				ref={_mapContainer => this._mapContainer = _mapContainer}
				className={T.helper.classNames('')(className)}
				style={T.lodash.merge(baseStyle, style)}
			/>
		)
	}
}
