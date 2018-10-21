/**
 * @description webpack 打包基本配置
 */
const webpack = require('webpack');
const webpackBar = require('webpackbar');
// 处理vtk规则
const vtkRules = require('vtk.js/Utilities/config/dependency.js').webpack.v2.rules;
const miniCssExtractPlugin = require('mini-css-extract-plugin');

// 页面入口文件,使用异步加载方式
const routesComponentsRegex = /src\/routes\/([\w-])+?\/((.*)\/)?routes\/((.*)\/)?(index.([jt]sx?))$/ig;
const excludeRegex = require('./util').excludeRegex;
const resourceBaseName = require('./util').resourceBaseName;
const customAntdStyle = require('./util').customAntdStyle;

const staticResource = [
	{
		test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
		use: `url-loader?name=${resourceBaseName}/[name].[hash].[ext]&limit=10000&minetype=application/font-woff`,
	},
	{
		test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
		use: `url-loader?name=${resourceBaseName}/[name].[hash].[ext]&limit=10&minetype=application/font-woff`,
	},
	{
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		use: `url-loader?name=${resourceBaseName}/[name].[hash].[ext]&limit=10&minetype=application/octet-stream`,
	},
	{
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		use: `url-loader?name=${resourceBaseName}/[name].[hash].[ext]`,
	},
	{
		test: /\.(txt|doc|docx|swf)$/,
		use: `url-loader?name=${resourceBaseName}/[name].[hash].[ext]`,
	},
	{
		test: /\.(csv|tsv)$/,
		use: 'csv-loader',
	},
];

module.exports = {
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			cacheGroups: {
				vendor: {
					name: 'vendor',
					test: /\.scss|css|less$/,
					chunks: 'all', // Merge all the css chunk to one file
					minChunks: 1,
					reuseExistingChunk: true,
					enforce: true,
					priority: 0,
				},
				
				commons: { // Key 为entry中定义的 入口名称
					chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
					name: 'commons', // 要缓存的 分隔出来的 chunk 名称
					minChunks: 2,
					minSize: 0,
					priority: 2,
				},
			},
		},
		
		runtimeChunk: {
			name: 'runtime',
		},
	},
	
	entry: {
		app: ['babel-polyfill', 'url-search-params-polyfill', './src/index'],
		commons: [
			'axios',
			'immutability-helper',
			'prop-types',
			'react',
			'react-dom',
			'react-redux',
			'redux',
			'classnames',
			
			'utils/core/decorate.js',
			'utils/core/crypto.js',
			'utils/core/request.js',
			'utils/core/emitter/index.js',
			'utils/core/localStorage/index.js',
			'utils/core/queryString/index.js',
			'utils/core/helper.js',
		],
	},
	
	// 排除打包的内容---走cdn
	/* externals: {
    $: 'jQuery',
    jQuery: 'jQuery',
    lodash: '_',
    react: 'React',
    'react-dom': 'ReactDOM',
    leaflet: 'L',
  }, */
	
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
		modules: ['node_modules', 'src/'],
		mainFields: ['browser', 'main', 'module'],
	},
	
	node: {
		fs: 'empty',
	},
	
	module: {
		rules: [
			...staticResource,
			...vtkRules,
			
			{
				test: /\.css$/,
				use: [
					miniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
				],
			},
			
			{
				test: /\.scss/,
				exclude: excludeRegex,
				use: [
					miniCssExtractPlugin.loader,
					
					// scss开启css的命名空间
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							modules: true,
							localIdentName: '[name][hash:base64]',
						},
					},
					
					'postcss-loader',
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
					miniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					{
						loader: 'less-loader',
						options: {
							sourceMap: true,
							javascriptEnabled: true,
							modifyVars: customAntdStyle,
						},
					},
				],
			},
			
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
				use: ['babel-loader'],
				exclude: [excludeRegex, routesComponentsRegex],
			},
			
			{
				test: /\.tsx?$/,
				use: ['babel-loader', 'ts-loader'],
				exclude: [excludeRegex, routesComponentsRegex],
			},
		],
	},
	
	plugins: [
		new webpack.ProvidePlugin({
			React: 'react',
		}),
		new webpackBar({
			profile: true,
		}),
		new miniCssExtractPlugin({
			filename: process.env.NODE_ENV === 'development' ? '[name].css' : '[name].[contenthash].css',
		}),
	],
};
