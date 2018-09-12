const eslintrc = {
	extends: ['eslint-config-airbnb'],
	env: {
		browser: true,
		node: true,
		jest: true,
	},
	globals: {
		React: true,
		ReactDOM: true,
		mountNode: true,
		ENV: false,
	},
	parser: 'babel-eslint',
	plugins: [
		'react',
		'babel',
	],
	rules: {
		'import/extensions': 0,
		'import/no-unresolved': 0,
		'import/no-extraneous-dependencies': 0,
		'import/newline-after-import': 0,
		
		'no-shadow': 0,
		'spaced-comment': 0,
		'func-names': 0,
		'arrow-body-style': 0,
		'react/sort-comp': 0,
		'react/prop-types': 0,
		'react/jsx-first-prop-new-line': 0,
		'react/jsx-one-expression-per-line': 0,
		'react/forbid-prop-types': 0,
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.md'] }],
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
		
		'no-console': 0,
		'no-plusplus': 0,
		'eol-last': 0,
		'no-script-url': 0,
		'prefer-rest-params': 0,
		'react/no-access-state-in-setstate': 0,
		'react/destructuring-assignment': 0,
		'react/no-multi-comp': 0,
		'react/prefer-stateless-function': 0,
		'jsx-a11y/href-no-hash': 0,
		
		// 标准缩进,2个空格
		'indent': [1, 2, { 'SwitchCase': 1 }],
		// 分号,必须
		'semi': [2, 'always'],
		// jsx的缩进
		'react/jsx-indent': [1, 2],
		// JSX 属性缩进
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
		'react/jsx-indent-props': [1, 2],
	},
};

module.exports = eslintrc;
