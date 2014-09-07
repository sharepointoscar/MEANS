exports.config = {

  allScriptsTimeout: 300000,

  specs: [
    '../tests/e2e/**/*.js'
  ],

  capabilities: {
    'browserName': 'chrome',
      version:'',
      platform:'ANY'

  },

  baseUrl: 'http://localhost:1337/',

    seleniumServerJar: '../node_modules/selenium/lib/runner/selenium-server-standalone-2.20.0.jar',
    chromeDriver: '../node_modules/chromedriver/bin/chromedriver',
   // seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    includeStackTrace : true,
    isVerbose : true,
    showColors:true
  }
};
