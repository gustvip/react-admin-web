/**
 * @description webpack 打包基本配置
 */
const webpack = require('webpack')

/**
 * 页面入口文件,使用异步加载方式
 * @type {RegExp}
 */
const routesComponentsRegex = /src\/routes\/([\w-])+?\/((.*)\/)?routes\/((.*)\/)?(index.jsx?)$/ig
const excludeRegex = /node_modules/

const staticResource = (function () {
	const resourceBaseName = 'resources'
	
	return [
		{
			test: /\.(png|jpg|gif|jpeg)$/,
			use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]&limit=8192`, //  <= 8kb的图片base64内联
		},
		{
			test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]&limit=10000&minetype=application/font-woff`,
		},
		{
			test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]&limit=10&minetype=application/font-woff`,
		},
		{
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]&limit=10&minetype=application/octet-stream`,
		},
		{
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]`,
		},
		{
			test: /\.(txt|doc|docx|swf)$/,
			use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]`,
		},
		{
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]&limit=10&minetype=image/svg+xml`,
		},
	]
})()

module.exports = {
	optimization: {
		splitChunks: {
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			cacheGroups: {
				styles: {
					name: 'vendor',
					test: /\.scss|css|less$/,
					chunks: 'all',    // merge all the css chunk to one file
					minChunks: 1,
					reuseExistingChunk: true,
					enforce: true,
					priority: 0,
				},
				
				commons: { // key 为entry中定义的 入口名称
					chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
					name: 'commons', // 要缓存的 分隔出来的 chunk 名称
					minChunks: 2,
					minSize: 0,
					priority: 2,
				},
			},
		},
	},
	
	entry: {
		app: ['./src/index'],
		commons: [
			'utils/core/decorator.js',
			'utils/core/local_storage.js',
			'utils/core/prompt.js',
			'utils/core/request.js',
			'utils/core/auth.js',
			'utils/core/reg_exp.js',
			'utils/core/helper.js',
			'classnames',
			'es6-promise',
			'immutability-helper',
			'prop-types',
			'query-string',
			'react-redux',
			'redux',
			'redux-thunk',
			'url-search-params-polyfill',
		],
	},
	
	resolve: {
		extensions: ['.js', '.jsx', '.scss'],
		modules: ['node_modules', 'src/'],
	},
	
	module: {
		rules: [
			...staticResource,
			
			{
				test: routesComponentsRegex,
				exclude: excludeRegex,
				use: [
					{
						loader: 'bundle-loader',
						options: {
							lazy: true,
						},
					},
				],
			},
			
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: [
					excludeRegex,
					routesComponentsRegex,
				],
			},
		
		],
	},
	
	plugins: [
		new webpack.ProvidePlugin({
			React: 'react',
		}),
	],
}
