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
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'xunit'
                },
                src: 'test/test.js'
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-mocha-test');

    // Register tasks
    grunt.registerTask('test', ['jslint', 'mochaTest']);
};
