'use strict';

// Karma configuration
// Generated on Sat Oct 05 2013 22:00:14 GMT+0700 (ICT)

module.exports.karmaconfig = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../',


        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'assets/bower_components/angular/angular.js',
            'assets/bower_components/angular-mocks/angular-mocks.js',
            'assets/bower_components/angular-cookies/angular-cookies.js',
            'assets/bower_components/angular-resource/angular-resource.js',
            'assets/bower_components/angular-ui-router/release/angular-ui-router.js',
            'assets/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'assets/bower_components/angular-bootstrap/ui-bootstrap.js',
            'assets/src/app/app.js',
           // 'public/js/config.js',
            //'public/js/directives.js',

            'assets/src/common/services/config.js',
            'assets/src/common/services/index.js',
            'assets/src/common/services/lodash.js',
            'assets/src/common/services/title.js',
            'assets/src/common/services/utils.js',
            'tests/e2e/**/*.js'
        ],


        // list of files to exclude
        exclude: [

        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        //reporters: ['progress'],
        reporters: ['progress', 'coverage'],

        // coverage
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
          //  'public/js/controllers/*.js': ['coverage'],
          //  'public/js/services/*.js': ['coverage']
        },

        coverageReporter: {
            type: 'html',
            dir: 'tests/coverage/'
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};
