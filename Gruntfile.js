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
        mocha_istanbul: {
            coverage: {
                src: 'test', // the folder, not the files,
                options: {
                    mask: '*.js',
                    reportFormats: ['cobertura', 'html', 'lcovonly']
                }
            }
        },
        coveralls: {
            options: {
                src: 'coverage/lcov.info',
                force: false
            },
            app: {
                src: 'coverage/lcov.info'
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-mocha-istanbul');

    // Register tasks
    grunt.registerTask('test', ['jslint', 'mocha_istanbul:coverage', 'coveralls']);
};
