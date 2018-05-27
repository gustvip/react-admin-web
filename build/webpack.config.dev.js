/**
 * @description webpack 开发模式下的打包基本配置
 */
const excludeRegex = /node_modules/
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')

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
		/**
		 * 针对scss进行css-module处理---项目用scss
		 */
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
	
	output: {
		publicPath: '/dist/',
		path: `${__dirname}/../dist/`,
		filename: '[name].js',
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
						modifyVars: customAntdStyle,
					},
				}),
			},
		],
	},
})
