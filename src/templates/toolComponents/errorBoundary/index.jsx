/**
 * Created by joey on 2018/02/19
 */

export default class ErrorBoundary extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			info: null,
		};
	}

	componentDidCatch(error, info) {
		this.setState({hasError: true, error, info});
	}

	render() {
		if (this.state.hasError) {
			return <h1 style={{textAlign: 'center'}}>页面产生错误: 请联系管理员!</h1>;
		}
		return this.props.children;
	}
}
