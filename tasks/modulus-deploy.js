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

var execOptions = {};

var runCmd = function(cmd, okString, cb) {
    var cp = exec(cmd, execOptions, function(err, stdout, stderr) {
        if(err) {
            console.log(err);
            cb(err);
        } else {
            if(stdout.indexOf(okString) != -1){
                cb();
            }else{
                cb(true);
            }
        }
    });

    captureOutput(cp.stdout, process.stdout);
    captureOutput(cp.stderr, process.stderr);
};

var captureOutput = function(child, output) {
    child.pipe(output);
};

module.exports = function(grunt) {

    grunt.registerMultiTask('modulus-deploy', 'Allows deployment to modulus.io from Grunt.', function() {
        var options = this.options();

        var done = this.async();


        var modulusPath = path.relative(process.cwd(), path.join(__dirname, '../', 'node_modules', 'modulus', 'bin', 'modulus'));

        var loginCmd = modulusPath + ' login'
                    + ' --username ' + username
                    + ' --password ' + password;

        var deployCmd = modulusPath + ' deploy'
                    + ' -p ' + options.project;

        runCmd(loginCmd, 'Signed in as user', function(err){
            if(err){
                done(false);
            }else{
                runCmd(deployCmd, options.project+' running at', function(err){
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
