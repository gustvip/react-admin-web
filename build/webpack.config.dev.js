/**
 * @description webpack 开发模式下的配置
 */

const merge = require('webpack-merge');
const host = require('./util').getLocalIp();
// const host = 'localhost';
const port = 11111; // 端口号
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./webpack.config.base');
module.exports = merge(baseConfig, {
	mode: 'development',
	
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif|jpeg|svg)(\?.*)?$/,
				use: 'url-loader',
			},
		],
	},
	devServer: {
		host: parseInt(process.env.host, 10) || host,
		port: parseInt(process.env.port, 10) || port,
		publicPath: '/public/',
		contentBase: `${__dirname}/../public/`,
		
		watchContentBase: true,
		watchOptions: {
			ignored: /node_modules/,
		},
		hot: false,
		historyApiFallback: {
			rewrites: [
				{from: /.*/, to: 'index.html'},
			],
		},
		stats: {
			colors: true,
		},
		open: false,
		
		proxy: {
			'/proxyAPI': {
				target: 'http://10.0.3.179:9090',
				pathRewrite: {'^/proxyAPI': ''},
			},
		},
	},
	output: {
		publicPath: '/public/',
		path: `${__dirname}/../public/`,
		filename: '[name].js',
	},
	
	plugins: [
		new bundleAnalyzerPlugin({
			openAnalyzer: false,
			analyzerHost: host,
			analyzerPort: port + 100,
		}),
	],
});
