const eslintrc = {
	extends: ["eslint:recommended"],
	env: {
		browser: true,
		node: true,
		jest: true
	},
	globals: {
		React: true,
		ReactDOM: true,
		mountNode: true,
		ENV: false
	},
	parser: "babel-eslint",
	plugins: [
		"react",
		"babel"
	],
	rules: {
		"no-mixed-spaces-and-tabs": 2,
		"no-prototype-builtins": 2,
		"camelcase": 1,
		"indent": [
			2,
			"tab",
			{
				"SwitchCase": 1
			}
		],
		
		"react/jsx-indent": [
			2,
			"tab"
		],
		"react/jsx-indent-props": [
			2,
			"tab"
		],
		
		"import/no-named-as-default": 0,
		"import/no-named-as-default-member": 0,
		"import/extensions": 0,
		"import/no-unresolved": 0,
		"import/no-extraneous-dependencies": 0,
		
		"spaced-comment": 2,
		"quotes": 2,
		"no-multiple-empty-lines": 2,
		"jsx-quotes": 2,
		"capitalized-comments": 2,
		"no-caller": 2,
		"no-useless-escape": 0,
		"default-case": 2,
		"getter-return": 2,
		"operator-assignment": 0,
		"no-unused-vars": 0,
		"no-unused-expressions": 0,
		"no-redeclare": 0,
		"no-undef": 0,
		"no-use-before-define": 0,
		"eqeqeq": 0,
		"no-console": 0,
		"arrow-body-style": 0,
		"max-len": 0,
		"function-paren-newline": 0,
		"object-curly-newline": 0,
		"eol-last": 0,
		"no-eval": 2,
		"no-extend-native": 2,
		"no-labels": 2,
		"no-new-wrappers": 2,
		"no-new-func": 2,
		"no-octal-escape": 2,
		"no-proto": 2,
		"no-script-url": 2,
		"no-sequences": 2,
		"no-with": 2,
		"radix": 2,
		"no-var": 0,
		
		"react/require-default-props": 0,
		"react/no-array-index-key": 0,
		"react/no-unused-state": 0,
		"react/no-unused-prop-types": 0,
		"react/sort-comp": 0,
		"react/prop-types": 0,
		"react/jsx-first-prop-new-line": 0,
		"react/jsx-one-expression-per-line": 0,
		"react/forbid-prop-types": 0,
		"react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".md"] }],
		"react/no-danger": 0,
		"react/no-access-state-in-setstate": 0,
		"react/destructuring-assignment": 0,
		"react/no-multi-comp": 0,
		"react/prefer-stateless-function": 0,
		
		"jsx-a11y/no-static-element-interactions": 0,
		"jsx-a11y/anchor-has-content": 0,
		"jsx-a11y/click-events-have-key-events": 0,
		"jsx-a11y/anchor-is-valid": 0
	}
};

module.exports = eslintrc;
