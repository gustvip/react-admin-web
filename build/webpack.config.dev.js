/**
 * @description webpack 开发模式下的打包基本配置
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const host = 'localhost'
// const host = require('./util').getLocalIp()
const port = 8080        // 端口号
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const resourceBaseName = require('./util').resourceBaseName

module.exports = merge(baseConfig, {
	/**
	 * 用于生成源代码的mapping
	 */
	devtool: 'cheap-module-source-map',	// cheap-module-source-map,cheap-source-map
	
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif|jpeg|svg)$/,
				use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]`, //  <= 8kb的图片base64内联
			},
		],
	},
	devServer: {
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
		open: true,
	},
	
	output: {
		publicPath: '/public/',
		path: `${__dirname}/../public/`,
		filename: '[name].js',
	},
	
	plugins: [
		new BundleAnalyzerPlugin({
			openAnalyzer: false,            // 禁止自动弹出浏览器窗口
			analyzerHost: host,      // 主机ip
			analyzerPort: port + 100,             // 端口
		}),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
	],
})
