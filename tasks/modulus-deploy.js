/*
 * grunt-modulus-deploy
 * https://github.com/digitaljohn/grunt-modulus-deploy
 *
 * Copyright (c) 2014 DigitalJohn
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec;
var path = require('path');

var username = process.env.MODULUS_USER;
var password = process.env.MODULUS_PWD;

var runCmd = function(cmd, cb) {
    console.log(cmd);
    var cp = exec(cmd, execOptions, function(err, stdout, stderr) {
        if(err) {
            console.log(err);
            cb(err);
        } else {
            console.log('Finished.');
            cb();
        }
    });

    captureOutput(cp.stdout, process.stdout);
    captureOutput(cp.stderr, process.stderr);
};

var captureOutput = function(child, output) {
    child.pipe(output);
};

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('modulus-deploy', 'Allows deployment to modulus.io from Grunt.', function() {
        var options = this.options();

        var done = this.async();


        var modulusPath = path.relative(process.cwd(), path.join(__dirname, '../', 'node_modules', 'modulus', 'bin', 'modulus'));

        var loginCmd = modulusPath + ' login'
                    + ' --username ' + username
                    + ' --password ' + password;

        var deployCmd = modulusPath + ' deploy'
                    + ' -p ' + options.project;

        runCmd(loginCmd, function(err){
            if(err){
                done(false);
            }else{
                runCmd(deployCmd, function(err){
                    if(err){
                        done(false);
                    }else{
                        done(true);
                    }
                });
            }
        });

    });

};
