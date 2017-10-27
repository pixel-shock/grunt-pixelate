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

	grunt.registerMultiTask('pixelate', 'A grunt plugin to pixelate images', function() {
		let currentFileIndex = 0;
		let maxFileIndex = 0;
		let done = this.async();

		let options = this.options({
			suffix: '_pixelated',
			skipExisting: true,
			size: 10,
			quality: 100
		});

		let pixelate = (files, outputDirectory) => {
			const filepath = files[currentFileIndex];
			const baseFileName = path.basename(filepath);
			const extension = path.extname(filepath);
			const outputFile = path.normalize(outputDirectory + path.basename(filepath, extension) + options.suffix + extension);
			const outputFileExists = fs.existsSync(outputFile);
			currentFileIndex++;

			grunt.log.write('\tProcessing file ' + chalk.bold(filepath));

			if (outputFileExists && options.skipExisting) {
				grunt.log.write(' => ' + chalk.bold(outputFile) + ' ... ');
				grunt.log.writeln(chalk.yellow('SKIPPED! Target file exists!'));
				processNext(files, outputDirectory);
			} else {
				jimp.read(filepath).then(function (image) {
					image.pixelate(options.size).quality(options.quality).write(outputFile, () => {
						grunt.log.write(' => ' + chalk.bold(outputFile) + ' ... ');
						grunt.log.writeln(chalk.green('OK'));
						processNext(files, outputDirectory);
					});
				}).catch(function (err) {
					grunt.log.writeln(chalk.red(err));
					processNext(files, outputDirectory);
				});
			}
		};

		let processNext = (files, outputDirectory) => {
			if (currentFileIndex < maxFileIndex) {
				pixelate(files, outputDirectory);
			} else {
				done();
			}
		};

		for (let i = 0; i < this.files.length; i++) {
			const file = this.files[i];
			const files = file.src;
			currentFileIndex = 0;
			maxFileIndex = files.length;
			processNext(files, file.dest);
		}
	});

};
