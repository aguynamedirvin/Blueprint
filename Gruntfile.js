module.exports = function (grunt) {

    const sass = require('node-sass');

    grunt.initConfig({


        /**
            Configuration
        **/
        pkg: grunt.file.readJSON('package.json'),


        /**
            Paths
            Use ex: '<%= path.src.js %>/main.js' -> 'src/js/main.js'
        **/
        path: {
            // Source
            src: {
                css: 'sass',
                img: 'images',
                js: 'js',
                fonts: 'fonts',
                html: 'html',
            },

            // Distribution
            dist: {
                css: 'dist/assets/css',
                img: 'dist/assets/images',
                js: 'dist/assets/js',
                fonts: 'dist/assets/fonts',
                html: 'dist',
            }
        },


        /**
            Watch our files for changes and live-reload
            https://github.com/gruntjs/grunt-contrib-watch
        **/
        watch: {
            options: {
                livereload: true,
            },

            gruntfile: {
                files: 'Gruntfile.js',
                options: {
                    reload: true
                }
            },

            css: {
                files: ['<%= path.src.css %>/**/*.{sass,scss,css}'],
                tasks: ['sass'],
                options: {
                    livereload: true,
                },
            },

            js: {
                files: '<%= path.src.js %>/**/*.js',
                tasks: ['uglify:default'],
            },

            html: {
                files: '<%= path.src.html %>/**/*.html',
                tasks: ['includes'],
                options: {
                    livereload: true,
                },
            },
        },


        /**
            Compile our SASS
            https://github.com/sindresorhus/grunt-sass
        **/
        sass: {
            options: {
                implementation: sass,
                outputStyle: 'expanded',
                sourceMap: true,
            },
            default: {
                files: {
                    '<%= path.dist.css %>/main.css': '<%= path.src.css %>/main.sass'
                }
            }
        },


        /**
            Remove un-used CSS
            https://github.com/addyosmani/grunt-uncss
        **/
        uncss: {
            dist: {
                options: {
                    ignore: ['.js-*'],
                },
                files: {
                    '<%= path.dist.css %>/main.css': '<%= path.dist.html %>/**/*.html'
                }
            }
        },


        /**
            Finish off our CSS with PostCSS (& plugins)
            https://github.com/nDmitry/grunt-postcss
        **/
        postcss: {
            default: {
                src: '<%= path.dist.css %>/*.css',
            },
            dist: {
                options: {
                    processors: [
                        /**
                         * Plugins:
                         *
                         * AutoPrefixer: 
                         * Pixrem: https://github.com/robwierzbowski/node-pixrem
                         * CSSNano: https://github.com/ben-eb/cssnano
                         * CSS MqPacker: https://github.com/hail2u/node-css-mqpacker
                         */
                        require('autoprefixer')({ // Add vendor prefixes
                            browsers: [
                                'last 2 versions',
                                'ie 8-9',
                            ]
                        }),
                        require('pixrem')(),                    // Add fallback units for rem
                        require('cssnano')(),                   // Minify our css
                        require('css-mqpacker')({sort: true}),  // Combine media queries
                    ]
                },
                src: '<%= path.dist.css %>/*.css',
            }
        },


        /**
            Minify our images
            https://github.com/gruntjs/grunt-contrib-imagemin
        **/
        imagemin: {
            default: {
                options: {
                    optimizationLevel: 5
                },
                files: [{
                    expand: true,
                    cwd: '<%= path.src.img %>/',
                    src: ['**/*.{png,jpg,jpeg,gif,svg}'],
                    dest: '<%= path.dist.img %>'
                }]
            }
        },


        /**
            Concatenate HTML files
            https://github.com/vanetix/grunt-includes
        **/
        includes: {
            default: {
                files: [{
                    cwd: '<%= path.src.html %>/',
                    src: '*.html',
                    dest: '<%= path.dist.html %>',
                    flatten: true
                }]
            }
        },


        /**
            Copy files
            https://github.com/gruntjs/grunt-contrib-copy
        **/
        copy: {
            default: {
                files: [
                    {
                        expand: true,
                        src: ['<%= path.src.fonts %>/**/*', '<%= path.src.img %>/**/*'],
                        dest: 'dist/assets/',
                    }
                ],
            },
        },


        /**
            Minify JS files
            https://github.com/gruntjs/grunt-contrib-uglify
        **/
        uglify: {
            options: {
                mangle: {
                    except: ['jQuery']
                }
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= path.dist.js %>',
                    src: '**/*.js',
                    dest: '<%= path.dist.js %>'
                }]
            }
        },


    });


    /**
     * Load Grunt tasks automatically
     */
    require('load-grunt-tasks')(grunt);


    /**
     * Register tasks
     */

    // Build our CSS and JS files
    grunt.registerTask('build', ['includes', 'sass', 'postcss:default', 'copy']);

    // Watch our files and compile if any changes
    grunt.registerTask('default', ['build', 'watch']);

    // Production - Build the files for production use
    grunt.registerTask('production', ['includes', 'sass', 'uncss', 'postcss:dist', 'imagemin', 'uglify']);

}
