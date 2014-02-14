/*
 * grunt-modulus-deploy
 * https://github.com/digitaljohn/grunt-modulus-deploy
 *
 * Copyright (c) 2014 DigitalJohn
 * Licensed under the MIT license.
 */

'use strict';

var childProcess = require('child_process');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

    grunt.registerTask('modulus_deploy', 'Allows deployment to modulus.io from Grunt.', function() {
        var options = this.options({
              project: null
        });

        var done = this.async();


        var args = ["deploy"];
        if(options.project){
            options.push("-p");
            args.push(options.project);
        }


        var child = childProcess.spawn("modulus", args);

        child.stdout.pipe( process.stdout );

        child.stderr.on("data", function (data) {
            console.log(data.toString());
        });

        child.on("exit", function (code) {
            done( code === 0 );
        });

  });

};
