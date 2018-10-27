process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

/**
 * @description webpack 开发模式下的配置
 */
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const merge = require('webpack-merge');
const host = 'localhost';
// const host = require("./util").getLocalIp();
const port = 11111; // 端口号
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./webpack.config.base');
const resourceBaseName = require('./util').resourceBaseName;

const server = new webpackDevServer(webpack(merge(baseConfig, {
	mode: 'development',
	devtool: 'cheap-module-source-map',	// cheap-module-source-map,cheap-module-eval-source-map
	
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif|jpeg|svg)$/,
				use: `url-loader?name=${resourceBaseName}/[name].[ext]`, //  <= 8kb的图片base64内联
			},
		],
	},
	
	output: {
		publicPath: '/public/',
		path: `${__dirname}/../public/`,
		filename: '[name].js',
	},
	
	plugins: [
		new bundleAnalyzerPlugin({
			openAnalyzer: false, // 禁止自动弹出浏览器窗口
			analyzerHost: host, // 主机ip
			analyzerPort: port + 100, // 端口
		}),
	],
})), {
	host,
	port,
	publicPath: '/public/',
	contentBase: `${__dirname}/../public/`,
	
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
	open: false,
	
	proxy: {
		'/proxyAPI': {
			target: 'http://10.0.3.179:9090',
			pathRewrite: {'^/proxyAPI': ''},
		},
	},
});

server.app.get('*', (req, res) => {
	res.sendFile(`${__dirname}/public/index.html`);
});

console.log('http://' + host + ':' + port);

server.listen(port, host);
