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
                    predef: [
                        'jQuery',
                        '$',
                        '_',
                        'window',
                        'module',
                        'document'
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
    grunt.registerTask('test', ['jslint', 'jasmine']);
};
