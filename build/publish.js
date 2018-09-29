const path = require("path");
const os = require("os");
const merge = require("webpack-merge");
const webpack = require("webpack");
const copyWebpackPlugin = require("copy-webpack-plugin");
const rm = require("rimraf");
const htmlWebpackPlugin = require("html-webpack-plugin");
const clc = require("./util").clc;

const conf = {
	indexHtmlName: "index_index.html",		// 生成的html的名字
	appName: "platform", // 项目名称
	proxyPath: process.argv[3] ? process.argv[3] : "/", // 代理的前缀 注意：后面必须带斜线
	webPath: process.argv[2], // Web目录
};

/**
 * 更新webpack配置
 */
const webpackConfigProd = merge(require("./webpack.config.prod"), {
	output: {
		filename: "[name].[contenthash].js",
		publicPath: path.join(conf.proxyPath, conf.appName, "/"),
		path: path.join(conf.webPath, conf.appName),
	},
	plugins: [
		/**
		 * 生成html文件
		 */
		new htmlWebpackPlugin({
			template: path.join(__dirname, "../public/template.html"),
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
			chunksSortMode: "dependency",
		}),
		
		/**
		 * 复制config
		 */
		new copyWebpackPlugin([
			{
				from: path.join(__dirname, "../public/config/env.js"),
				to: path.join(conf.webPath, "config"),
			},
		]),
		
		/**
		 * 复制asserts
		 */
		new copyWebpackPlugin([
			{
				from: path.join(__dirname, "../public/asserts/"),
				to: path.join(conf.webPath, "asserts"),
			},
		]),
		
		/**
		 * 复制favicon
		 */
		new copyWebpackPlugin([
			{
				from: path.join(__dirname, "../public/favicon.ico"),
				to: conf.webPath,
			},
		]),
	],
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
		rm(conf.webPath, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

/**
 * 编译结束后统计
 * @param {Date} startTime
 */
function toEnd(startTime) {
	const endTime = Date.now();
	clc.green("  ↓");
	clc.green("总计耗时:" + ((endTime - startTime) / 1000).toFixed(2) + "s");
	clc.green("  ↓");
	clc.green(`附属信息:
        PID: ${process.pid}
        CPU数量: ${os.cpus().length}
        CPU架构: ${os.arch()}
        计算机名称: ${os.hostname()}
        系统类型: ${os.type()}
        系统版本号: ${os.release()}
        系统总内存量: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(1) + "G"}
`);
}

/**
 * 错误处理方法
 * @param errorMsg
 */
function handleError(errorMsg) {
	console.log(clc.red(errorMsg));
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
	await deleteFile();
	
	// webpack编译
	await doCompilerPlatform();
	
	return startTime;
}

buildApp().then(info => toEnd(info)).catch(info => handleError(info));
