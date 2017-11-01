# grunt-pixelate

> A grunt plugin to pixelate images using [jimp](https://www.npmjs.com/package/jimp)

## Getting Started
This plugin requires Grunt `~1.0.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-pixelate --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pixelate');
```


## The "pixelate" task

### Overview
In your project's Gruntfile, add a section named `pixelate` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  pixelate: {
    options: {
		suffix: '_pixelated',
		skipExisting: true,
		size: 10,
		quality: 100
    },
    example_target: {
    	options: {
			suffix: '-pixelated-big-pixels',
			size: 100
		},
		files: {
			'assets/output/': 'assets/input/**/*.jpg'
		}
    },
  },
});
```

### Options

#### options.suffix
Type: `String`
Default value: `'_pixelated'`

This string value will be appened to the output file name.

#### options.skipExisting
Type: `Boolean`
Default value: `true`

Indicates whether existing files should be skipped or not.

#### options.size
Type: `Integer`
Default value: `10`

The size of the pixelation.

#### options.relativeSize
Type: `Boolean`
Default value: `false`

If `true` the value of `options.size` will be relative to the image width. 
For example:

```
	options.relativeSize: true,
	options.size: 10
	
	--> means that the desired pixelation will be 10% of the image width
```

#### options.quality
Type: `Integer`
Default value: `100`

The output quality for the image.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## NOTE
The images included in the "assets/input" directory are copyright by Tino Wehe. You are **NOT allowed** to use them outside of this git repository.
