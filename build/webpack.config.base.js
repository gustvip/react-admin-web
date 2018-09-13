/**
 * @description webpack 打包基本配置
 */
const webpack = require("webpack");
// 处理vtk规则
const vtkRules = require("vtk.js/Utilities/config/dependency.js").webpack.v2.rules;
const miniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * 页面入口文件,使用异步加载方式
 * @type {RegExp}
 */
const routesComponentsRegex = /src\/routes\/([\w-])+?\/((.*)\/)?routes\/((.*)\/)?(index.(jsx?|tsx?))$/ig;
const excludeRegex = require("./util").excludeRegex;
const resourceBaseName = require("./util").resourceBaseName;
const customAntdStyle = require("./util").customAntdStyle;

const staticResource = [
	{
		test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
		use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]&limit=10000&minetype=application/font-woff`,
	},
	{
		test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
		use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]&limit=10&minetype=application/font-woff`,
	},
	{
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]&limit=10&minetype=application/octet-stream`,
	},
	{
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]`,
	},
	{
		test: /\.(txt|doc|docx|swf)$/,
		use: `url-loader?name=${resourceBaseName}/[name].[hash:8].[ext]`,
	},
	{
		test: /\.(csv|tsv)$/,
		use: "csv-loader",
	},
];
const styleLoader = {loader: process.env.NODE_ENV === "development" ? "style-loader" : miniCssExtractPlugin.loader};

module.exports = {
	mode: "development",
	optimization: {
		splitChunks: {
			chunks: "all",
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			cacheGroups: {
				vendor: {
					name: "vendor",
					test: /\.scss|css|less$/,
					chunks: "all", // Merge all the css chunk to one file
					minChunks: 1,
					reuseExistingChunk: true,
					enforce: true,
					priority: 0,
				},
				
				commons: { // Key 为entry中定义的 入口名称
					chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步)
					name: "commons", // 要缓存的 分隔出来的 chunk 名称
					minChunks: 2,
					minSize: 0,
					priority: 2,
				},
			},
		},
		
		runtimeChunk: {
			name: "runtime",
		},
	},
	
	entry: {
		app: "./src/index",
		commons: [
			"react",
			"react-dom",
			"react-redux",
			"redux",
			"prop-types",
			"immutability-helper",
			"query-string",
			"es6-promise",
			"url-search-params-polyfill",
			
			"utils/core/decorate.js",
			"utils/core/crypto.js",
			"utils/core/request.js",
			"utils/core/classNames/index.js",
			"utils/core/emitter/index.js",
			"utils/core/localStorage/index.js",
		],
	},
	
	/**
	 * 排除打包的内容---走cdn
	 */
	/* Externals: {
    $: 'jQuery',
    jQuery: 'jQuery',
    lodash: '_',
    react: 'React',
    'react-dom': 'ReactDOM',
    leaflet: 'L',
  }, */
	
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
		modules: ["node_modules", "src/"],
		mainFields: ["browser", "main", "module"],
	},
	
	node: {
		fs: "empty",
	},
	
	module: {
		rules: [
			...staticResource,
			...vtkRules,
			
			{
				test: /\.css$/,
				use: [
					styleLoader,
					"css-loader",
					"postcss-loader",
				],
			},
			
			{
				test: /\.scss/,
				exclude: excludeRegex,
				use: [
					styleLoader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
							modules: true,
							localIdentName: "[name]__[local]__[hash:base64:5]",
						},
					},
					"postcss-loader",
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
			
			{
				test: /\.less/,
				use: [
					styleLoader,
					"css-loader",
					"postcss-loader",
					{
						loader: "less-loader",
						options: {
							sourceMap: true,
							javascriptEnabled: true,
							modifyVars: customAntdStyle,
						},
					},
				],
			},
			
			{
				test: routesComponentsRegex,
				exclude: excludeRegex,
				use: [
					{
						loader: "bundle-loader",
						options: {
							lazy: true,
						},
					},
				],
			},
			
			{
				test: /\.jsx?$/,
				use: ["babel-loader"],
				exclude: [excludeRegex, routesComponentsRegex],
			},
			
			{
				test: /\.tsx?$/,
				use: ["babel-loader", "ts-loader"],
				exclude: [excludeRegex, routesComponentsRegex],
			},
		],
	},
	
	plugins: [
		new webpack.ProvidePlugin({
			React: "react",
		}),
	],
};
