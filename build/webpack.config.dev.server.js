/**
 * Created by joey on 2018/4/24
 */
const merge = require('webpack-merge')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const BundleAnalyzerPlugin = require(
	'webpack-bundle-analyzer').BundleAnalyzerPlugin
const host = '0.0.0.0'
const port = 8080        // 端口号

const config = merge(require('./webpack.config.dev'), {
	plugins: [
		new BundleAnalyzerPlugin({
			openAnalyzer: false,            // 禁止自动弹出浏览器窗口
			analyzerHost: '127.0.0.1',      // 主机ip
			analyzerPort: port + 100,             // 端口
		}),
	],
	entry: {
		app: [`webpack-dev-server/client?http://${host}:${port}/`],
	},
})
const webpackConfigDevServer = new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	contentBase: config.output.path,
	
	watchContentBase: true,
	watchOptions: {
		ignored: /node_modules/,
	},
	hot: false,
	historyApiFallback: {
		index: '/',
		disableDotRule: true,
	},
	stats: {
		colors: true,
	},
	open: true,
})

webpackConfigDevServer.app.get('*', (req, res) => {
	res.sendFile(`${__dirname}/../dist/index.html`)
})

webpackConfigDevServer.listen(port, host)

