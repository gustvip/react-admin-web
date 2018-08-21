const eslintrc = {
	extends: ['eslint-config-airbnb'],
	env: {
		browser: true,
		node: true,
		jest: true,
		es6: true,
	},
	parser: 'babel-eslint',
	plugins: [
		'react',
	],
	rules: {
		'func-names': 0,
		'arrow-body-style': 0,
		'react/sort-comp': 0,
		'react/prop-types': 0,
		'react/jsx-first-prop-new-line': 0,
		'react/jsx-one-expression-per-line': 0,
		'react/forbid-prop-types': 0,
		'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx', '.md']}],
		'import/extensions': 0,
		'import/no-unresolved': 0,
		'import/no-extraneous-dependencies': 0,
		'prefer-destructuring': 0,
		'no-param-reassign': 0,
		'no-return-assign': 0,
		'max-len': 0,
		'consistent-return': 0,
		'no-redeclare': 0,
		'react/require-extension': 0,
		'jsx-a11y/no-static-element-interactions': 0,
		'jsx-a11y/anchor-has-content': 0,
		'jsx-a11y/click-events-have-key-events': 0,
		'jsx-a11y/anchor-is-valid': 0,
		'react/no-danger': 0,
		'comma-dangle': ['error', 'always-multiline'],
		'function-paren-newline': 0,
		'object-curly-newline': 0,
		'no-restricted-globals': 0,
		
		// 标准缩进,2个空格
		'indent': [
			'error',
			2,
			{
				'SwitchCase': 1,
			},
		],
		// 换行符,unix换行符
		'linebreak-style': [
			'error',
			'unix',
		],
		// 字符串引号,使用单引号
		'quotes': [
			'error',
			'single',
		],
		// 分号,必须
		'semi': [
			'error',
			'always',
		],
		// http://eslint.org/docs/rules/max-len
		'padded-blocks': 0,
		// (关闭)i++,++1
		'no-plusplus': 0,
		// (关闭)
		'default-case': 0,
		// jsdoc注释
		'require-jsdoc': [
			'error',
			{
				'require': {
					// 函数描述
					'FunctionDeclaration': true,
					// 方法定义
					'MethodDefinition': false,
					// 类描述
					'ClassDeclaration': false,
					// 闭包函数描述
					'ArrowFunctionExpression': true,
				},
			},
		],
		// jsx的缩进
		'react/jsx-indent': [
			'error',
			2,
		],
		// JSX 属性缩进
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
		'react/jsx-indent-props': [
			'error',
			2,
		],
		// (关闭)JSX组件在无使用声明周期方法,setState和ref时,必须声明成一个方法
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
		'react/prefer-stateless-function': 0,
		'jsx-a11y/label-has-for': 0,
		'jsx-a11y/href-no-hash': 0,
		
	},
};

module.exports = eslintrc;
