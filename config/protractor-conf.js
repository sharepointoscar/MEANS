exports.config = {
  allScriptsTimeout: 300000,

  specs: [
    '../tests/e2e/**/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:1337/',

  chromeDriver: '../node_modules/protractor/selenium/chromedriver',
  seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.40.0.jar',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    includeStackTrace : true,
    isVerbose : true
  }
};
