/* eslint-disable camelcase */
/**
 * @description webpack 生产环境的打包基本配置
 */

const merge = require('webpack-merge');
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const compressionPlugin = require('compression-webpack-plugin');
const resourceBaseName = require('./util').resourceBaseName;
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const excludeRegex = require('./util').excludeRegex;
const customAntStyle = require('./util').customAntStyle;

function getStyleConfig () {
	return [
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
	];
}

module.exports = merge(baseConfig, {
	mode: 'production',
	
	optimization: {
		minimizer: [
			new uglifyJsPlugin({
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
						
						// 注意开启这---可能会导致打包出错---典型错误:Refference Error t is not defined
						comparisons: true,
					},
				},
			}),
			new optimizeCssAssetsPlugin(),
		],
	},
	
	module: {
		rules: [
			...getStyleConfig(),
			
			{
				test: /\.(png|jpg|gif|jpeg|svg)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: `${resourceBaseName}/[name].[hash].[ext]`,
							limit: 8192,	 // <= 8kb的图片base64内联
						},
					},
					// 压缩图片
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								// 品质
								quality: 70,
								speed: 4,
							},
							optipng: {
								progressive: true,
								quality: 70,
								speed: 4,
							},
							pngquant: {
								progressive: true,
								quality: 70,
								speed: 4,
							},
							gifsicle: {
								progressive: true,
								quality: 70,
								speed: 4,
							},
							/*
                            webp: {
                              progressive: true,
                              quality: 70,
                              speed: 4,
                            },
              */
						},
					},
				],
			},
		],
	},
	
	plugins: [
		new miniCssExtractPlugin({filename: '[name].[contenthash].css'}),
		
		new compressionPlugin({
			test: /\.(js|css)$/,
			cache: true,
			algorithm: 'gzip',
			compressionOptions: {
				level: 9,
				threshold: 0,
				minRatio: .8,
			},
		}),
	],
});
