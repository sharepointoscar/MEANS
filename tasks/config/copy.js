/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less files, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 * mods by jrt
 */
module.exports = function(grunt) {

	var filesToCopy = require('../pipeline').jsFilesToInjectNoPathChange;
	var fontsToCopy = require('../pipeline').fontFilesToInject;
    var imagesToCopy = require('../pipeline').imagesFilesToInject;
	grunt.config.set('copy', {
		dev: {
			files: [{
				expand: true,
				cwd: './assets',
				src: filesToCopy,
				dest: '.tmp/public'
			},
            {
                nonull: true,
                expand:true,
                flatten: true,
                cwd: './assets',
                src: [fontsToCopy],
                dest: '.tmp/public/fonts'
            }
               ,
            {
                nonull: true,
                expand:true,
                flatten: true,
                cwd: './assets',
                src: [imagesToCopy],
                dest: '.tmp/public/images/logos'

            }]
		},
		build: {
			files: [{
				expand: true,
				cwd: '.tmp/public',
				src: ['**/*'],
				dest: 'www'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
};
