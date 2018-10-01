/**
 * @description webpack 开发模式下的打包基本配置
 */
const webpack = require("webpack");
const merge = require("webpack-merge");
// const host = "localhost";
const host = require("./util").getLocalIp();
const port = 11111; // 端口号
const bundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const baseConfig = require("./webpack.config.base");
const resourceBaseName = require("./util").resourceBaseName;

module.exports = merge(baseConfig, {
	devtool: "cheap-module-source-map",	// Cheap-module-source-map,cheap-module-eval-source-map
	
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif|jpeg|svg)$/,
				use: `url-loader?name=${resourceBaseName}/[name].[ext]`, //  <= 8kb的图片base64内联
			},
		],
	},
	devServer: {
		host,
		port,
		publicPath: "/public/",
		contentBase: `${__dirname}/../public/`,
		
		watchContentBase: true,
		watchOptions: {
			ignored: /node_modules/,
		},
		hot: true,
		historyApiFallback: {
			index: "/",
			disableDotRule: true,
		},
		stats: {
			colors: true,
		},
		open: false,
	},
	
	output: {
		publicPath: "/public/",
		path: `${__dirname}/../public/`,
		filename: "[name].js",
	},
	
	plugins: [
		new bundleAnalyzerPlugin({
			openAnalyzer: false, // 禁止自动弹出浏览器窗口
			analyzerHost: host, // 主机ip
			analyzerPort: port + 100, // 端口
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
});
