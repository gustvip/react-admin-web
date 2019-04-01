const package = require('./package.json');
const presets = [
	[
		'@babel/preset-env', {
		loose: true,
		targets: {
			// 根据browserslist来分析支持情况， 具体的配置参照： https://github.com/ai/browserslist
			browsers: package.browserslist,
		},
		modules: false,         // modules预先将es6模块转成"amd" | "umd" | "systemjs" | "commonjs", 值为false则不转换
		useBuiltIns: false,
		debug: false,
	}],
	'@babel/preset-react',  // 转换jsx语法
];

const plugins = [
	// lodash按需引入
	'lodash',
	// ant-design按需引入
	[
		'import',
		{
			'libraryName': 'antd',
			'libraryDirectory': 'es',
			'style': true,
		},
	],
	require('@babel/plugin-syntax-dynamic-import'),         // 支持动态import
	[require('@babel/plugin-proposal-decorators'), {'legacy': true}],         // 支持装饰器语法
	[require('@babel/plugin-proposal-class-properties'), {'loose': true}],    // 支持class属性初始化和static
	require('@babel/plugin-proposal-object-rest-spread'),       // 支持...rest
	require('@babel/plugin-proposal-export-default-from'),      // 支持 export v from 'mod'语法
	require('@babel/plugin-proposal-export-namespace-from'),    // 支持 export * as ns from 'mod'
	require('@babel/plugin-syntax-import-meta'),
	require('@babel/plugin-proposal-json-strings'),
	require('@babel/plugin-transform-runtime'),
];

module.exports = {
	'env': {
		'development': {
			presets,
			plugins,
		},
		'production': {
			presets,
			plugins: [...plugins, 'transform-react-remove-prop-types'],
		},
		'test': {
			presets: [
				'@babel/preset-env',
				'@babel/preset-react',
			],
			plugins: [
				require('@babel/plugin-transform-runtime'),
			],
		},
	},
};
