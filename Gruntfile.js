module.exports = grunt => {
  grunt.initConfig({
    // pug task
    pug: {
      compile: {
        options: {
          data: {
            debug: true
          }
        },
        files: [{
          src: '*.pug',
          cwd: 'src/pug/',
          dest: 'dist',
          expand: true,
          ext: '.html'
        }]
      }
    },

    // sass task
    sass: {
      dist: {
        options: {
          style: 'inline'
        },
        files: [{
          src: '*.sass',
          cwd: 'src/sass/',
          dest: 'dist/css',
          expand: true,
          ext: '.css'
        }]
      }
    },

    // uglify task (js minify)
    uglify: {
      my_target: {
        files: {
          'dist/js/app.min.js': ['src/js/app.js']
        }
      }
    },

    // copy task (copy src/libraries to dist/libraries)
    copy: {
      main: {
        expand: true,
        cwd: 'src',
        src: ['libraries/**'],
        dest: 'dist/'
      }
    },

    // image compress task (compress all image src/images to dist/images)
    imagemin : {
      dynamic: {
          files: [{
              expand: true,
              cwd: 'src/',
              src: ['images/**/*.{png,jpg,gif}'],
              dest: 'dist'
          }]
      }
    },

    // auto refresh view on change in dist directory
    browserSync: {
      dev: {
        bsFiles: {
            src : [
                'dist/**.*'
            ]
        },
        options: {
            watchTask: true,
            server: './dist'
        }
      }
    },

    // watch change inside directory to run task
    watch: {
      pug: {
        files: ['src/pug/**/*.pug'],
        tasks: ['pug']
      },
      sass: {
        files: ['src/sass/**/*.sass'],
        tasks: ['sass']
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['uglify']
      },
      copy: {
        files: ['src/libraries/**'],
        tasks: ['copy']
      },
      imagemin: {
        files: ['src/images/**'],
        tasks: ['imagemin']
      }
    }
  });

  // initial
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  //register default task
  grunt.registerTask('default', ['pug', 'sass', 'uglify', 'copy', 'imagemin', 'browserSync', 'watch'])
};

