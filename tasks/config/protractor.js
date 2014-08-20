module.exports = function(grunt) {

    grunt.config.set('protractor', {

            options: {
                configFile: "node_modules/protractor/referenceConf.js", // Default config file
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                debug: true,
                args: {
                    // Arguments passed to the command
                    verbose:true
                }
            },
            means_target: {
            options: {
                configFile: "config/protractor-conf.js", // Target-specific config file
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                //debug: true,
                debug: false,
                args: {verbose: true} // Target-specific arguments
            }

        }
    });

    grunt.loadNpmTasks('grunt-protractor-runner');
};
