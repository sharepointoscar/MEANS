'use strict';

module.exports.karmae2e = function (config) {
    config.set({


        basePath: '../tests',

        files: [
            'e2e/**/*.spec.js'
        ],

        autoWatch: false,

        browsers: ['Chrome'],

        frameworks: ['ng-scenario'],

        singleRun: false,

        proxies: {
            '/': 'http://localhost:1337/app'
        },

        plugins: [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-ng-scenario'
        ],

        junitReporter: {
            outputFile: 'test_out/e2e.xml',
            suite: 'e2e'
        }

    });
};

