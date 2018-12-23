/**
 * @description webpack 打包基本配置
 */
const webpack = require('webpack');
const webpackBar = require('webpackbar');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

// 页面入口文件,使用异步加载方式---bundle-loader
const routesComponentsRegex = /src\/routes\/([\w-])+?\/((.*)\/)?routes\/((.*)\/)?(index.([jt]sx?))$/ig;
const excludeRegex = require('./util').excludeRegex;
const resourceBaseName = require('./util').resourceBaseName;
const customAntStyle = require('./util').customAntStyle;

const staticResource = [
	{
		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		use: `url-loader?name=${resourceBaseName}/[name].[hash].[ext]&limit=10000`,
	},
	{
		test: /\.(txt|doc|docx|swf)(\?.*)?$/,
		use: `url-loader?name=${resourceBaseName}/[name].[hash].[ext]&limit=10000`,
	},
	{
		test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
		use: `url-loader?name=${resourceBaseName}/[name].[hash].[ext]&limit=10000`,
	},
	{
		test: /\.(csv|tsv)(\?.*)?$/,
		use: 'csv-loader',
	},
];

module.exports = {
	devtool: 'cheap-module-source-map',	// cheap-module-source-map,cheap-module-eval-source-map
	
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
					chunks: 'all',
					minChunks: 1,
					reuseExistingChunk: true,
					enforce: true,
					priority: 0,
				},
				
				commons: {
					chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
					name: 'commons',
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
		app: ['@babel/polyfill', 'url-search-params-polyfill', './src/index'],
		commons: [
			'qs',
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
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss'],
		modules: ['node_modules', 'src/'],
		mainFields: ['browser', 'main', 'module'],
	},
	
	node: {
		fs: 'empty',
	},
	
	module: {
		rules: [
			...staticResource,
			
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
							import: true,
							url: true,
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
							modifyVars: customAntStyle,
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
				test: /\.[jt]sx?$/,
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
