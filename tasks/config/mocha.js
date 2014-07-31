module.exports = function(grunt) {

    grunt.config.set('mochaTest', {
        unit: {
            options: {
                reporter: 'spec'
            },
            src: ['tests/unit/**/*.unit.js']
        }

    });

    grunt.loadNpmTasks('grunt-mocha-test');
};
