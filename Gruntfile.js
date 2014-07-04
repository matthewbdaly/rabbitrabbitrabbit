module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        jslint: {
            client: {
                src: [
                    'Gruntfile.js',
                    'index.js'
                ],
                directives: {
                    browser: false,
                    node: true,
                    nomen: true,
                    unparam: true,
                    sloppy: true,
                    predef: [
                        'jQuery',
                        '$',
                        '_',
                        'window',
                        'module',
                        'document',
                        'it',
                        'before',
                        'after',
                        'describe',
                        'alert',
                        'Backbone',
                        'App',
                        'Message',
                        'Messages',
                        'MessageListView',
                        'io'
                    ]
                },
                options: {
                    junit: "coverage/jslint.xml",
                    checkstyle: "coverage/checkstyle.xml"
                }
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-jslint');

    // Register tasks
    grunt.registerTask('test', ['jslint']);
};
