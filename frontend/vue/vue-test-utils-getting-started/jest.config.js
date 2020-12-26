module.exports = {
  clearMocks: true,
  coverageDirectory: '.coverage',
  collectCoverageFrom: ['src/**/*.{js,jsx,vue}', '!**/node_modules/**'],
  setupTestFrameworkScriptFile: 'jasmine-expect',
  transform: {
    '^.+\\.(js)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  moduleNameMapper: {
    '^@/(.+)$': '<rootDir>/src/$1',
    '^@@/(.+)$': '<rootDir>/$1',
  },
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  testRegex: '(specs/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?)$',
  unmockedModulePathPatterns: ['<rootDir>/node_modules/jasmine-expect'],
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx'],
};