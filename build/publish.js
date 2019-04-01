process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';

const path = require('path');
const os = require('os');
const merge = require('webpack-merge');
const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');
const rm = require('rimraf');
const htmlWebpackPlugin = require('html-webpack-plugin');
const clc = require('cli-color');
const prodConfig = require('./webpack.config.prod');
const enumPath = require('./util').enumPath;

const conf = {
	indexHtmlName: 'demo_project.html',
	appName: 'platform',
	proxyPath: process.argv[3] ? path.resolve(process.argv[3]) : '/',
	webPath: process.argv[2],
};

// 解决antd-design 字体本地化问题
prodConfig.module.rules.forEach(item => {
	if (item.use && Array.isArray(item.use)) {
		item.use.forEach(item2 => {
			if (item2.loader === 'less-loader') {
				const oldIconUrl = item2.options.modifyVars ? item2.options.modifyVars['@icon-url'] : null;
				if (oldIconUrl) {
					item2.options.modifyVars['@icon-url'] = path.join(conf.proxyPath, oldIconUrl);
				}
			}
		});
	}
});

// 更新webpack配置
const webpackConfigProd = merge(prodConfig, {
	output: {
		filename: '[name].[contenthash].js',
		publicPath: path.join(conf.proxyPath, conf.appName, '/'),
		path: path.join(conf.webPath, conf.appName),
	},
	plugins: [
		// 生成html文件
		new htmlWebpackPlugin({
			template: path.join(enumPath.entryPath, 'template.html'),
			filename: path.join(conf.webPath, conf.indexHtmlName),
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
			chunksSortMode: 'dependency',
		}),
		new copyWebpackPlugin([
			// 复制config
			{
				from: path.join(enumPath.entryPath, 'config/env.js'),
				to: path.join(conf.webPath, 'config/env.js'),
			},
			{
				from: path.join(enumPath.entryPath, 'config/env.js'),
				to: path.join(conf.webPath, 'config/env.production.js'),
			},
			// 复制assets
			{
				from: path.join(enumPath.entryPath, 'assets/'),
				to: path.join(conf.webPath, 'assets'),
			},
			// 复制favicon
			{
				from: path.join(enumPath.entryPath, 'favicon.ico'),
				to: conf.webPath,
			},
		])],
});

function doCompilerPlatform() {
	return new Promise((resolve, reject) => {
		webpack(webpackConfigProd, (err, stats) => {
			const jsonStats = stats.toJson();
			jsonStats.warnings.length && handleWarn(jsonStats.warnings);
			if (jsonStats.errors.length) {
				reject(jsonStats.errors);
			} else {
				resolve();
			}
		});
	});
}

function deleteFile() {
	return new Promise((resolve, reject) => {
		if (conf.webPath.startsWith(path.join(os.homedir(), 'Desktop'))) {
			rm(conf.webPath, err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		} else {
			reject('webPath not permit');
		}
	});
}

/**
 * 编译结束后统计
 * @param {number} startTime
 */
function toEnd(startTime) {
	const endTime = Date.now();
	console.log(clc.green('  ↓'));
	console.log(clc.green(`总计耗时:${((endTime - startTime) / 1000).toFixed(2) }s`));
	console.log(clc.green('  ↓'));
	console.log(clc.green(`附属信息:
	        PID: ${process.pid}
	        CPU数量: ${os.cpus().length}
	        CPU架构: ${os.arch()}
	        计算机名称: ${os.hostname()}
	        系统类型: ${os.type()}
	        系统版本号: ${os.release()}
	        系统总内存量: ${`${(os.totalmem() / 1024 / 1024 / 1024).toFixed(1) }G`}
	`));
}

/**
 * 错误处理方法
 * @param errorMsg
 */
function handleError(errorMsg) {
	console.log(clc.red.bold(errorMsg));
	process.exit();
}

/**
 * 告警处理方法
 * @param warnMsg
 */
function handleWarn(warnMsg) {
	console.log(clc.yellow(warnMsg));
}

async function buildApp() {
	const startTime = Date.now();
	
	// 删除文件
	await deleteFile().catch(err => {
		throw err;
	});
	
	// webpack编译
	await doCompilerPlatform().catch(err => {
		throw err;
	});
	
	return startTime;
}

buildApp().then(info => toEnd(info)).catch(info => handleError(info));
