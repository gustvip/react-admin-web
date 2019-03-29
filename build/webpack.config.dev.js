/**
 * @description webpack 开发模式下的配置
 */
const merge = require('webpack-merge');
// const host = require('./util').getLocalIp();
const host = 'localhost';
const port = 11111; // 端口号
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./webpack.config.base');
const excludeRegex = require('./util').excludeRegex;
const customAntStyle = require('./util').customAntStyle;
const enumPath = require('./util').enumPath;

function getStyleConfig() {
	return [
		{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
			],
		},
		
		{
			test: /\.scss/,
			exclude: excludeRegex,
			use: [
				'style-loader',
				
				// scss开启css的命名空间
				{
					loader: 'css-loader',
					options: {
						sourceMap: true,
						modules: true,
						import: true,
						url: true,
						localIdentName: '[name][hash:base64]',
					},
				},
				
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true,
					},
				},
			],
		},
		
		{
			test: /\.less/,
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'less-loader',
					options: {
						sourceMap: true,
						javascriptEnabled: true,
						modifyVars: customAntStyle,
					},
				},
			],
		},
	];
}

module.exports = merge(baseConfig, {
	mode: 'development',
	
	module: {
		rules: [
			...getStyleConfig(),
			
			{
				test: /\.(png|jpg|gif|jpeg|svg)(\?.*)?$/,
				use: 'url-loader',
			},
		],
	},
	devServer: {
		host: process.env.host || host,
		port: parseInt(process.env.port, 10) || port,
		publicPath: enumPath.devPublicPath,
		contentBase: enumPath.entryPath,
		
		watchContentBase: true,
		watchOptions: {
			ignored: excludeRegex,
		},
		hot: true,
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
				target: 'http://47.75.209.119:8081',
				pathRewrite: {'^/proxyAPI': ''},
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
			analyzerHost: host,
			analyzerPort: port + 100,
		}),
	],
});
