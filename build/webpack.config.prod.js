/**
 * @description webpack 生产环境的打包基本配置
 */
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const customAntdStyle = {
	'@text-color': '#333',                  // 修改字体基本颜色
	'@border-color-base': '#a3babf',				// 更改border颜色
	'@primary-color': '#00d9ca',		            // 更改antd的主题颜色;
	'@font-size-base': '12px',                      // 修改基础字体大小
}
const formatStyleLoader = (otherLoader) => {
	const baseLoaders = [
		{
			loader: MiniCssExtractPlugin.loader,
		},
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
					require('postcss-apply'),
					require('postcss-import'),
					require('postcss-flexbugs-fixes'),
					require('autoprefixer')(),
					require('cssnano')(),
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
	mode: 'production',
	
	/**
	 * 排除打包的内容---走cdn
	 */
	externals: {
		lodash: '_',
		react: 'React',
		'react-dom': 'ReactDOM',
		leaflet: 'L',
		echarts: 'echarts',
		d3: 'd3',
	},
	
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true, // set to true if you want JS source maps
			}),
			new OptimizeCssAssetsPlugin(),
		],
	},
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
	
	output: {
		publicPath: '/static/platform/',
		path: `${__dirname}/../dist/platform/`,
		filename: '[name].js',
	},
	
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new cleanWebpackPlugin(['dist/platform/*.js', 'dist/platform/*.map', 'dist/platform/*.css ', 'dist/platform/resources/*']),
	],
})
