const path = require('path')
const fs = require('fs')

module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  testRegex: '(.*|(\\.|/))(test|spec).(jsx?|tsx?)$',
  unmockedModulePathPatterns: ['<rootDir>/node_modules/jasmine-expect'],
  moduleFileExtensions: ['ts', 'vue', 'js', 'json']
}
