exports.config = {

  allScriptsTimeout: 300000,
  //  C:\Node\Apps\sails10\MEANS\tests\e2e\controllers\todo.spec.js
//    specs: ['../tests/e2e/controllers/todo-spec.js'],
  specs: [
    '../tests/e2e/**/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
    //  'browserName': 'firefox'
  },

  baseUrl: 'http://localhost:1337/',

//  chromeDriver: '../node_modules/protractor/selenium/chromedriver',
//  seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.40.0.jar',

    chromeDriver: '../node_modules/chromedriver',
    //  seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.40.0.jar',
    // seleniumPort: 4444,
    //  or
    //  webdriver-manager start
    //  and next line
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    includeStackTrace : true,
    isVerbose : true
  }
};
