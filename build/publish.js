const path = require("path");
const merge = require("webpack-merge");
const clc = require("cli-color");
const webpack = require("webpack");
const copyWebpackPlugin = require("copy-webpack-plugin");
const rm = require("rimraf");
const htmlWebpackPlugin = require("html-webpack-plugin");

console.log(clc.green("webpack打包开始"));

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

doCompilerPlatform();

function doCompilerPlatform() {
	/**
	 * Rm -rf
	 */
	rm(conf.webPath, (err) => {
		if (err) {
			handleError(err);
		} else {
			webpack(webpackConfigProd, (err, stats) => {
				const jsonStats = stats.toJson();
				jsonStats.errors.length && handleError(jsonStats.errors);
				jsonStats.warnings.length && handleWarn(jsonStats.warnings);
				console.log(clc.green("webpack打包结束"));
			});
		}
	});
}

/**
 * 错误处理方法
 * @param errorMsg
 */
function handleError(errorMsg) {
	console.log(clc.yellow("webpack打包出错:"));
	console.log(clc.red(errorMsg));

	process.exit();
}

/**
 * 告警处理方法
 * @param warnMsg
 */
function handleWarn(warnMsg) {
	console.log(clc.yellow("webpack打包警告:"));
	console.log(clc.yellow(warnMsg));
}
