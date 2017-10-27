/*
 * grunt-pixelate
 * https://github.com/pixel-shock/grunt-pixelate
 *
 * Copyright (c) 2017 Wehe, Tino
 * Licensed under the MIT license.
 */

'use strict';

const path = require('path');
const fs = require('fs');
const jimp = require("jimp");
const chalk = require('chalk');

module.exports = (grunt) => {

	let pixelate = (inputFile, outputDirectory, options, cb) => {
		const baseFileName = path.basename(inputFile);
		const extension = path.extname(inputFile);
		const outputFile = path.normalize(outputDirectory + path.basename(inputFile, extension) + options.suffix + extension);
		const outputFileExists = fs.existsSync(outputFile);

		if (outputFileExists && options.skipExisting) {
			grunt.log.writeln(chalk.yellow('\t\tSkipping "' + inputFile + '" ... output file "' + outputFile + '" exists!'));
		} else {
			jimp.read(inputFile).then(function (image) {
				grunt.log.write('\tProcessing ' + chalk.bold(inputFile) + ' ... ');
				image.pixelate(options.size).quality(options.quality).write(outputFile);

				grunt.log.write(chalk.green('OK'));
				grunt.log.writeln(' => ' + outputFile);

				if (cb !== false) cb();
			}).catch(function (err) {
				grunt.log.writeln(chalk.red(err));
			});
		}
	}

	grunt.registerMultiTask('pixelate', 'A grunt plugin to pixelate images', function() {
		let options = this.options({
			suffix: '_pixelated',
			skipExisting: true,
			size: 10,
			quality: 100
		});

		let done = this.async();

		this.files.forEach(function(file, idx) {
			const files = file.src;

			let src = file.src.filter(function(filepath) {
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function(filepath, idx) {
				const cb = (idx === files.length - 1) ? done : false;
				pixelate(filepath, file.dest, options, cb);
			});
		});
	});

};
