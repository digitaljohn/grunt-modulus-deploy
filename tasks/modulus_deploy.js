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

  grunt.registerMultiTask('modulus_deploy', 'Allows deployment to modulus.io from Grunt.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    var done = this.async();


    var child = spawn("modulus", ["deploy"]);

    child.stdout.on("data", function (data) {
      console.log("spawnSTDOUT:", JSON.stringify(data));
    });

    child.stderr.on("data", function (data) {
      console.log("spawnSTDERR:", JSON.stringify(data));
    });

    child.on("exit", function (code) {
      console.log("spawnEXIT:", code);

      done();

    });



    // ls = childProcess.exec('modulus deploy', function (error, stdout, stderr) {
    //   if (error) {
    //     console.log(error.stack);
    //     console.log('Error code: '+error.code);
    //     console.log('Signal received: '+error.signal);
    //   }
    //   console.log('Child Process STDOUT: '+stdout);
    //   console.log('Child Process STDERR: '+stderr);
    // });

    // ls.on('exit', function (code) {
    //   console.log('Child process exited with exit code '+code);
    // });



    // // Iterate over all specified file groups.
    // this.files.forEach(function(f) {
    //   // Concat specified files.
    //   var src = f.src.filter(function(filepath) {
    //     // Warn on and remove invalid source files (if nonull was set).
    //     if (!grunt.file.exists(filepath)) {
    //       grunt.log.warn('Source file "' + filepath + '" not found.');
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }).map(function(filepath) {
    //     // Read file source.
    //     return grunt.file.read(filepath);
    //   }).join(grunt.util.normalizelf(options.separator));

    //   // Handle options.
    //   src += options.punctuation;

    //   // Write the destination file.
    //   grunt.file.write(f.dest, src);

    //   // Print a success message.
    //   grunt.log.writeln('File "' + f.dest + '" created.');
    // });
  });

};
