/**
 * @description webpack 开发模式下的配置
 */
const enumHostAndPortAndProtocol = require('./util').enumHostAndPortAndProtocol;
const merge = require('webpack-merge');
const getLocalIp = require('./util').getLocalIp;
const webProtocol = enumHostAndPortAndProtocol.defaultWebProtocol;
const webHost = process.env.GET_LOCAL_IP === '1' ? getLocalIp() : enumHostAndPortAndProtocol.defaultWebHost;
const webPort = enumHostAndPortAndProtocol.defaultWebPort;
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./webpack.config.base');
const excludeRegex = require('./util').excludeRegex;
const enumPath = require('./util').enumPath;
const serverNodeUrl = buildUrl(enumHostAndPortAndProtocol.defaultServerNodeProtocol, enumHostAndPortAndProtocol.defaultServerNodeHost, enumHostAndPortAndProtocol.defaultServerNodePort);

/**
 * @param {string} protocol
 * @param {string} hostName
 * @param {string} port
 * @return {string}
 */
function buildUrl(protocol, hostName, port) {
	return `${protocol}://${hostName}:${port}`;
}

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
		host: webHost,
		port: webPort,
		publicPath: enumPath.devPublicPath,
		contentBase: enumPath.entryPath,
		
		watchContentBase: true,
		watchOptions: {
			ignored: excludeRegex,
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
			'/proxyNodeAPI': {
				target: serverNodeUrl,
				pathRewrite: {'^/proxyNodeAPI': ''},
			},
		},
	},
	output: {
		publicPath: enumPath.devPublicPath,
		path: enumPath.entryPath,
		filename: '[name].js',
	},
	
	plugins: [
		new bundleAnalyzerPlugin({
			openAnalyzer: false,
			analyzerHost: webHost,
			analyzerPort: webPort + 100,
		}),
	],
});
