/* eslint-disable camelcase */
/**
 * @description webpack 生产环境的打包基本配置
 */

const merge = require('webpack-merge');
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const terserWebpackPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const compressionPlugin = require('compression-webpack-plugin');
const resourceName = require('./util').resourceName;

module.exports = merge(baseConfig, {
	mode: 'production',
	
	optimization: {
		minimizer: [
			new terserWebpackPlugin({
				terserOptions: {
					output: {
						comments: false,
					},
				},
				parallel: true,
				extractComments: false,
			}),
			new optimizeCssAssetsPlugin(),
		],
	},
	
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif|jpeg|svg)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: `${resourceName.image}/[name].[hash].[ext]`,
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
                              disable: false,
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
		new compressionPlugin({
			test: /\.(js|css)$/,
			cache: true,
			algorithm: 'gzip',
			compressionOptions: {
				level: 9,
				threshold: 0,
				minRatio: 0.8,
			},
		}),
	],
});
