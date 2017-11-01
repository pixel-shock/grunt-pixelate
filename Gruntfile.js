/*
 * grunt-pixelate
 * https://github.com/pixel-shock/grunt-pixelate
 *
 * Copyright (c) 2017 Wehe, Tino
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp'],
			output: ['assets/output/**/*.jpg']
		},

		// Configuration to be run (and then tested).
		pixelate: {
			bigPixels: {
				options: {
					suffix: '-pixelated-big-pixels',
					size: 100,
				},
				files: {
					'assets/output/': 'assets/input/**/*.jpg'
				}
			},
			relativePixels: {
				options: {
					suffix: '-pixelated-small-pixels',
					size: 10,
					relativeSize: true
				},
				files: {
					'assets/output/': 'assets/input/**/*.jpg'
				}
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'pixelate', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
