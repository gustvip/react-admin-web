const eslintrc = {
	extends: ['eslint:recommended'],
	env: {
		browser: true,
		node: true,
		jest: true,
	},
	globals: {
		AMap: false,
		ENV: false,
	},
	parser: 'babel-eslint',
	plugins: [
		'react',
		'babel',
	],
	rules: {
		'import/no-named-as-default': 0,
		'import/no-named-as-default-member': 0,
		'import/extensions': 0,
		'import/no-unresolved': 0,
		'import/no-extraneous-dependencies': 0,
		
		'react/jsx-indent': [
			2,
			'tab',
		],
		'react/jsx-indent-props': [
			2,
			'tab',
		],
		'react/sort-comp': 0,
		'react/require-default-props': 0,
		'react/no-array-index-key': 0,
		'react/no-unused-state': 0,
		'react/no-unused-prop-types': 0,
		'react/prop-types': 0,
		'react/forbid-prop-types': 0,
		'react/no-danger': 0,
		'react/no-access-state-in-setstate': 0,
		'react/destructuring-assignment': 0,
		'react/no-multi-comp': 0,
		'react/prefer-stateless-function': 0,
		'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx', '.md']}],
		'react/jsx-tag-spacing': [
			2,
			{
				'closingSlash': 'never',
				'beforeSelfClosing': 'never',
				'afterOpening': 'never',
				'beforeClosing': 'never',
			},
		],
		'react/jsx-closing-tag-location': 2,
		'react/jsx-first-prop-new-line': 0,
		'react/jsx-one-expression-per-line': 0,
		'jsx-a11y/no-static-element-interactions': 0,
		'jsx-a11y/anchor-has-content': 0,
		'jsx-a11y/click-events-have-key-events': 0,
		'jsx-a11y/anchor-is-valid': 0,
		'jsx-quotes': 2,
		
		'no-else-return': 2,
		'no-fallthrough': 2,
		'no-floating-decimal': 2,
		'no-implicit-coercion': 2,
		'one-var-declaration-per-line': 2,
		'padded-blocks': [2, 'never'],
		'space-infix-ops': 2,
		'space-unary-ops': [
			2, {
				words: true,
				nonwords: false,
			}],
		'template-tag-spacing': 2,
		'arrow-body-style': [2, 'as-needed'],
		'arrow-parens': [2, 'as-needed'],
		'arrow-spacing': 2,
		'no-confusing-arrow': 2,
		'prefer-arrow-callback': 2,
		'prefer-rest-params': 0,
		'prefer-spread': 2,
		'no-unneeded-ternary': 2,
		'no-useless-computed-key': 2,
		'no-useless-rename': 2,
		'object-shorthand': [2, 'properties'],
		'prefer-const': 2,
		'prefer-template': 2,
		'curly': 2,
		'no-mixed-spaces-and-tabs': 2,
		'no-prototype-builtins': 2,
		'camelcase': 2,
		'indent': [
			2,
			'tab',
			{
				'SwitchCase': 1,
			},
		],
		'space-in-parens': [2, 'never'],
		'space-before-blocks': 2,
		'semi-spacing': 2,
		'space-before-function-paren': [2, 'never'],
		'no-trailing-spaces': [
			2,
			{
				skipBlankLines: true,
				ignoreComments: false,
			}],
		'no-undef-init': 2,
		'operator-linebreak': 2,
		'nonblock-statement-body-position': 2,
		'no-whitespace-before-property': 2,
		'new-parens': 2,
		'linebreak-style': 2,
		'key-spacing': 2,
		'block-spacing': 2,
		'brace-style': 2,
		'no-useless-return': 2,
		'no-multi-spaces': 2,
		'no-extra-bind': 2,
		'no-alert': 2,
		'semi-style': [2, 'last'],
		'semi': 2,
		'spaced-comment': 2,
		'quotes': [2, 'single'],
		'no-multiple-empty-lines': [
			2,
			{
				max: 1,
				maxEOF: 1,
				maxBOF: 1,
			}],
		
		'wrap-iife': 2,
		'no-caller': 2,
		'no-useless-escape': 0,
		'default-case': 2,
		'getter-return': 2,
		'operator-assignment': 0,
		'no-unused-vars': 0,
		'no-unused-expressions': 0,
		'no-redeclare': 0,
		'no-undef': 0,
		'no-use-before-define': 0,
		'eqeqeq': 0,
		'no-console': 0,
		'max-len': 0,
		'function-paren-newline': 0,
		'object-curly-newline': 0,
		'eol-last': 0,
		'no-eval': 2,
		'no-extend-native': 2,
		'no-labels': 2,
		'no-new-wrappers': 2,
		'no-new-func': 2,
		'no-octal-escape': 2,
		'no-proto': 2,
		'no-script-url': 2,
		'no-sequences': 2,
		'no-with': 2,
		'radix': 2,
		'no-var': 2,
		'no-self-assign': 0,
	},
};

module.exports = eslintrc;
