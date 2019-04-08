module.exports = {

	// The bail config option can be used here to have Jest stop running tests after
	// The first failure.
	bail: false,
	
	// Indicates whether each individual test should be reported during the run.
	verbose: false,
	
	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: true,
	
	// The directory where Jest should output its coverage files.
	coverageDirectory: '<rootDir>/coverage/',
	
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	setupFiles: [
		'<rootDir>/tests/setup.js',
	],
	
	// If the test path matches any of the patterns, it will be skipped.
	testPathIgnorePatterns: [
		'/node_modules/',
	],
	
	transform: {
		'.*\\.js$': 'babel-jest',
		'.*\\.ts$': 'ts-jest',
	},
	
	snapshotSerializers: [
		'enzyme-to-json/serializer',
	],
	
	// If the file path matches any of the patterns, coverage information will be skipped.
	coveragePathIgnorePatterns: [
		'/node_modules/',
	],
	
	// The pattern Jest uses to detect test files.
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
	
	// This option sets the URL for the jsdom environment.
	// It is reflected in properties such as location.href.
	// @see: https://github.com/facebook/jest/issues/6769
	testURL: 'http://localhost:20000/',
};
