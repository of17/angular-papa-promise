'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd ") %>\n' +
            '<%= pkg.homepage %> */',

        clean: {
            preBuild: 'dist',
            postBuild: '.tmp'
        },

        uglify: {
            options: {
                banner: '<%= banner %>',
                sourceMap: true
            },
            dist: {
                src: '.tmp/src/<%= pkg.name %>.js',
                dest: '.tmp/src/<%= pkg.name %>.min.js'
            }
        },

        usebanner: {
            default: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>',
                    linebreak: true
                },
                files: {
                    src: ['.tmp/**/*.js']
                }
            }
        },

        ngAnnotate: {
            options: {
                banner: '<%= banner %>',
                singleQuotes: true
            },
            default: {
                files: [{
                    expand: true,
                    src: 'src/*.js',
                    dest: '.tmp/'
                }]
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: '.tmp/src',
                    src: '**',
                    dest: 'dist',
                    filter: 'isFile'
                }],
            },
        },

        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: ['pkg'],
                commit: false,
                createTag: false,
                push: false
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    'src/{,*/}*.js'
                ]
            },
            test: {
                src: ['test/spec/**/*.spec.js']
            }
        },

        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }
    });

    grunt.registerTask('test', [
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:preBuild',
        'ngAnnotate',
        'usebanner',
        'uglify',
        'copy',
        'clean:postBuild'
    ]);

    grunt.registerTask('default', [
        'test',
        'build'
    ]);
};