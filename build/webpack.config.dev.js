/**
 * @description webpack 开发模式下的打包基本配置
 */
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const host = 'localhost'
const port = 8080        // 端口号
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const customAntdStyle = {
	'@text-color': '#333',                  // 修改字体基本颜色
	'@border-color-base': '#a3babf',				// 更改border颜色
	'@primary-color': '#00d9ca',		            // 更改antd的主题颜色;
	'@font-size-base': '12px',                      // 修改基础字体大小
}
const formatStyleLoader = (otherLoader) => {
	const baseLoaders = [
		{loader: 'style-loader'},
		{
			loader: 'css-loader',
			options: {
				sourceMap: true,
			},
		},
		{
			loader: 'postcss-loader',
			options: {
				sourceMap: true,
				ident: 'postcss',
				plugins: () => [
					require('postcss-flexbugs-fixes'),
				],
			},
		},
	]
	
	if (otherLoader) {
		if (otherLoader.loader === 'sass-loader') {
			baseLoaders[1] = {
				loader: 'css-loader',
				options: {
					sourceMap: true,
					modules: true,
					localIdentName: '[name]__[local]__[hash:base64:5]',
				},
			}
		}
		
		baseLoaders.push(otherLoader)
	}
	
	return baseLoaders
}

module.exports = merge(baseConfig, {
	/**
	 * 用于生成源代码的mapping
	 */
	devtool: 'cheap-module-source-map',	// cheap-module-source-map,cheap-source-map
	
	mode: 'development',
	
	module: {
		rules: [
			{
				test: /\.css$/,
				use: formatStyleLoader(),
			},
			{
				test: /\.scss/,
				exclude: /node_modules/,
				use: formatStyleLoader({
					loader: 'sass-loader',
					options: {
						sourceMap: true,
					},
				}),
			},
			{
				test: /\.less/,
				use: formatStyleLoader({
					loader: 'less-loader',
					options: {
						sourceMap: true,
						modifyVars: customAntdStyle,
					},
				}),
			},
		],
	},
	
	devServer: {
		host,
		port,
		inline: true,
		publicPath: '/dist/',
		contentBase: `${__dirname}/../dist/`,
		
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
	},
	
	output: {
		publicPath: '/dist/',
		path: `${__dirname}/../dist/`,
		filename: '[name].js',
	},
	
	plugins: [
		new BundleAnalyzerPlugin({
			openAnalyzer: false,            // 禁止自动弹出浏览器窗口
			analyzerHost: host,      // 主机ip
			analyzerPort: port + 100,             // 端口
		}),
	],
})
