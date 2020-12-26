module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.spec\\.js$',
  setupFilesAfterEnv: ['./setupTests.js']
};
