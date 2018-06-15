const fs = require('fs')
const {promisify} = require('util')
const path = require('path')
const merge = require('webpack-merge')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const clc = require('cli-color')
const webpack = require('webpack')
const copyWebpackPlugin = require('copy-webpack-plugin')
let {indexHtmlInfo} = require('./util')

console.log(clc.green('webpack打包开始'))

const conf = {
	vendorCss: 'vendor.css',
	appJs: 'app.js',
	commonsJs: 'commons.js',
	vendorJs: 'vendor.js',
	configEnvPath: 'config/env.js',
	indexHtmlName: 'index_index.html',		// 生成的html的名字
	appName: 'platform',                                 // 项目名称
	proxyPath: process.argv[3] ? process.argv[3] : '/',  // 代理的前缀 注意：后面必须带斜线
	webPath: process.argv[2],    // web目录
}

/**
 * 1 更新webpack配置
 */
const webpackConfigProd = merge(require('./webpack.config.prod'), {
	output: {
		publicPath: path.join(conf.proxyPath, conf.appName, '/'),
		path: path.join(conf.webPath, conf.appName),
		filename: '[name].js',
	},
	plugins: [
		new cleanWebpackPlugin([
			path.join(conf.webPath, '/*.html'),
			path.join(conf.webPath, conf.appName, '/*.js'),
			path.join(conf.webPath, conf.appName, '/*.map'),
			path.join(conf.webPath, conf.appName, '/*.css'),
			path.join(conf.webPath, conf.appName, '/resources/*'),
		]),
		new copyWebpackPlugin([
			{
				from: path.join(__dirname, '../dist/config/env.js'),
				to: path.join(conf.webPath, 'config'),
			},
		]),
	],
})

/**
 * 2 配置index.html
 */
indexHtmlInfo = indexHtmlInfo.replace('{$publicVendorCSS}', path.join(webpackConfigProd.output.publicPath, conf.vendorCss)).
	replace('{$EnvConfJS}', path.join(conf.proxyPath, conf.configEnvPath)).
	replace('{$publicVendorJS}', path.join(webpackConfigProd.output.publicPath, conf.vendorJs)).
	replace('{$publicAppJS}', path.join(webpackConfigProd.output.publicPath, conf.appJs)).
	replace('{$publicCommonsJS}', path.join(webpackConfigProd.output.publicPath, conf.commonsJs))

/**
 * 3 开始打包
 */
doCompilerPlatform()

function doCompilerPlatform () {
	webpack(webpackConfigProd, (err, stats) => {
		let jsonStats = stats.toJson()
		jsonStats.errors.length && handleError(jsonStats.errors)
		jsonStats.warnings.length && handleWarn(jsonStats.warnings)
		
		console.log(clc.green('webpack打包结束'))
		
		/**
		 * 4 生成html文件
		 */
		createHtmlFile().then(() => console.log(clc.green(`生成${conf.indexHtmlName}成功`))).catch(() => console.log(clc.green(`生成${conf.indexHtmlName}错误`)))
	})
}

/**
 * 错误处理方法
 * @param errorMsg
 */
function handleError (errorMsg) {
	promisify(fs.rmdir)(webpackConfigProd.output.path).then(() => console.log(clc.red('webpack打包出错,已删除相关文件'))).catch(() => console.log(clc.red('webpack打包出错,请手动删除文件')))
	
	console.log(clc.yellow('webpack打包出错:'))
	console.log(clc.red(errorMsg))
	
	process.exit()
}

/**
 * 告警处理方法
 * @param warnMsg
 */
function handleWarn (warnMsg) {
	console.log(clc.yellow('webpack打包警告:'))
	console.log(clc.yellow(warnMsg))
}

/**
 * 生成html文件
 */
async function createHtmlFile () {
	const indexHtmlInfoBuffer = new Buffer(indexHtmlInfo)
	const fd = await promisify(fs.open)(path.join(conf.webPath, conf.indexHtmlName), 'w')
	promisify(fs.write)(fd, indexHtmlInfoBuffer)
}