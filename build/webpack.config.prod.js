/**
 * @description webpack 生产环境的打包基本配置
 */
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
baseConfig.module.rules[0].use[2].options.plugins
	= baseConfig.module.rules[1].use[2].options.plugins
	= baseConfig.module.rules[2].use[2].options.plugins = () => [
	require('postcss-apply'),
	require('postcss-import'),
	require('postcss-flexbugs-fixes'),
	require('autoprefixer')(),
	require('cssnano')(),
]
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
				sourceMap: false,
				uglifyOptions: {
					output: {
						// 最紧凑的输出
						beautify: false,
						// 删除所有的注释
						comments: false,
					},
					compress: {
						// 在UglifyJs删除没有用到的代码时不输出警告
						warnings: false,
						
						drop_console: false,
						
						// 内嵌定义了但是只用到一次的变量
						collapse_vars: true,
						
						// 提取出出现多次但是没有定义成变量去引用的静态值
						reduce_vars: true,
						
						comparisons: false,
					},
				},
			}),
			new OptimizeCssAssetsPlugin(),
		],
	},
})
