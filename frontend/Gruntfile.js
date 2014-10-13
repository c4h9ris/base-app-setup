module.exports = function(grunt) {

    var js_files = [
                    // Load first
                    'src/js/main.js'
                ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        "watch": {
            css: {
                files: 'src/scss/**/*.scss',
                tasks: ['compass'],
            },
            js: {
                files: 'src/js/**/*.js',
                tasks: ['concat'],
            }
        },


        "compass": {
            options: {
                config: 'config.rb',
                force: false
            },
            dist: {
                options: {}
            },
            production: {
                options: {
                    outputStyle: 'compressed',
                    lineComments: false
                }
            }
        },


        // Run in development to concantenate ONLY
        "concat": {
            dist: {
                src: js_files,
                dest: '../app/js/main.min.js',
            }
        },


        "closure-compiler": {
            frontend: {
                js: js_files,
                jsOutputFile: '../app/js/main.min.js',
                maxBuffer: 500,
                noreport: true,
                options: {
                    // compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    compilation_level: 'SIMPLE_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT'
                }
            }
       }


    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-closure-compiler');

    // Create debug & production versions
    grunt.registerTask('production', ['compass:production', 'closure-compiler']);

    grunt.registerTask('default', ['watch']);

};