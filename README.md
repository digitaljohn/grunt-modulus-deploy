# grunt-modulus-deploy

> Allows deployment to modulus.io from Grunt.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-modulus-deploy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-modulus-deploy');
```

## Environment Variables

This plugin requires you add environment variables to authenticate with modulus.

###MODULUS_USER
 - The username you use when logging into modulus. If you use a github login, then this is your github username

###MODULUS_PWD
 - The password you use when logging into modulus. If you use a github login, then this is your github password

## The "modulus-deploy" task

### Overview
In your project's Gruntfile, add a section named `modulus-deploy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  modulus-deploy: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.project
Type: `String`

The name of the modulus project to deploy.

### Usage Examples

#### Default Options
In this example, a target `stage` is defined. When the task runs, it attempts to deploy the site to the modulus project named `my-site-stage`

```js
grunt.initConfig({
  modulus-deploy: {
    stage: {
      options: {
      	project: "my-site-stage"
      }
    },
  },
});
```



## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
