/**
 * @description webpack 打包基本配置
 */
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const happyPack = require('happypack');
// 处理vtk规则
const vtkRules = require('vtk.js/Utilities/config/dependency.js').webpack.v2.rules;

/**
 * 页面入口文件,使用异步加载方式
 * @type {RegExp}
 */
const routesComponentsRegex = /src\/routes\/([\w-])+?\/((.*)\/)?routes\/((.*)\/)?(index.(jsx?|tsx?))$/ig;
const excludeRegex = /node_modules/;
const customAntdStyle = {
	'@text-color': '#333',                  // 修改字体基本颜色
	'@font-size-base': '12px',                      // 修改基础字体大小
};

const staticResource = [
	{
		test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
		use: `url-loader?name=${require('./util').resourceBaseName}/[name].[hash:8].[ext]&limit=10000&minetype=application/font-woff`,
	},
	{
		test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
		use: `url-loader?name=${require('./util').resourceBaseName}/[name].[hash:8].[ext]&limit=10&minetype=application/font-woff`,
	},
	{
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		use: `url-loader?name=${require('./util').resourceBaseName}/[name].[hash:8].[ext]&limit=10&minetype=application/octet-stream`,
	},
	{
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		use: `url-loader?name=${require('./util').resourceBaseName}/[name].[hash:8].[ext]`,
	},
	{
		test: /\.(txt|doc|docx|swf)$/,
		use: `url-loader?name=${require('./util').resourceBaseName}/[name].[hash:8].[ext]`,
	},
	{
		test: /\.(csv|tsv)$/,
		use: 'csv-loader',
	},
];

const formatStyleLoader = (otherLoader) => {
	const baseLoaders = [
		{
			loader: miniCssExtractPlugin.loader,
		},
		{
			loader: 'css-loader',
			options: {
				sourceMap: true,
			},
		},
		{loader: 'postcss-loader'},
	];
	
	if (otherLoader) {
		if (otherLoader.loader === 'sass-loader') {
			baseLoaders[1] = {
				loader: 'css-loader',
				options: {
					sourceMap: true,
					modules: true,
					localIdentName: '[name]__[local]__[hash:base64:5]',
				},
			};
		}
		
		baseLoaders.push(otherLoader);
	}
	
	return baseLoaders;
};

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
		
		runtimeChunk: {
			name: 'runtime',
		},
	},
	
	entry: {
		app: './src/index',
		commons: [
			'react',
			'react-dom',
			'react-redux',
			'redux',
			'redux-thunk',
			'prop-types',
			'classnames',
			'lodash',
			'immutability-helper',
			'query-string',
			'es6-promise',
			'url-search-params-polyfill',
			
			'utils/core/decorator.js',
			'utils/core/crypto.js',
			'utils/core/request.js',
			'utils/core/emitter/index.js',
			'utils/core/localStorage/index.js',
		],
	},
	
	/**
	 * 排除打包的内容---走cdn
	 */
	/*externals: {
    $: 'jQuery',
    jQuery: 'jQuery',
    lodash: '_',
    react: 'React',
    'react-dom': 'ReactDOM',
    leaflet: 'L',
  },*/
	
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
			{
				test: /\.css$/,
				use: formatStyleLoader(),
			},
			{
				test: /\.scss/,
				exclude: excludeRegex,
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
						javascriptEnabled: true,
						modifyVars: customAntdStyle,
					},
				}),
			},
			...staticResource,
			...vtkRules,
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
				use: 'happypack/loader?id=js',
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
		new happyPack({
			id: 'js',
			threads: 4,
			loaders: ['babel-loader'],
		}),
		new webpack.ProvidePlugin({
			React: 'react',
		}),
		new miniCssExtractPlugin({
			filename: '[name].css',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
};
