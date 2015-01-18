module.exports = function(grunt) {

  // paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // configuracion general
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Project settings
    config: config,

    phplint:{
      app: ['<%= config.app %>/**/*.php']
    },
    concat: {
      options: {
        separator: ';',
      },
      app: {
        src: ['<%= config.app %>/scripts/js/*.js'],
        dest: '<%= config.app %>/scripts/js/build/main.js',
        nonull: true,
      },
      dist: {
        src: ['<%= config.app %>/scripts/js/*.js'],
        dest: '<%= config.dist %>/<%= pkg.version %>/scripts/js/build/main.js',
        nonull: true,
      },
    },

    uglify: {
      app: {
          src: '<%= config.app %>/scripts/js/build/main.js',
          dest: '<%= config.app %>/scripts/js/build/build.min.js'
      },
      dist: {
          src: '<%= config.app %>/scripts/js/build/main.js',
          dest: '<%= config.dist %>/<%= pkg.version %>/scripts/js/build/build.min.js'
      }
    },
    // optimizar imagenes
    imagemin: {
      app: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= config.app %>/images/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= config.dist %>/<%= pkg.version %>/images/'
        }]
      }
    },

    // sass: {
    //   app: {
    //     options: {
    //       style: 'expanded',
    //       loadPath: ['bower_components/foundation/scss']
    //     },
    //     files: {
    //       '<%= config.app %>/css/main.css': '<%= config.app %>/css/scss/main.scss'
    //     }
    //   },
    //   dist: {
    //     options: {
    //       style: 'compressed'
    //     },
    //     files: {
    //       '<%= config.dist %>/<%= pkg.version %>/css/main.css': '<%= config.app %>/css/scss/main.scss'
    //     }
    //   }
    // },
    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      app: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          '<%= config.app %>/css/main.css': '<%= config.app %>/css/scss/main.scss'
        }        
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          '<%= config.dist %>/<%= pkg.version %>/css/main.css': '<%= config.app %>/css/scss/main.scss'
        }
      }
    },

    // inyecta dependencias al archivo
    wiredep: {
      head: {
        src: '<%= config.app %>/scripts/php/head.php'
      },
      tail: {
        src: '<%= config.app %>/scripts/php/tail.php'
      },
      options: {
        ignorePath: '/../..',
        // https://github.com/taptapship/wiredep#configuration
      }
    },

    copy: {
      index:{
        src: '<%= config.app %>/index.php',
        dest: '<%= config.dist %>/<%= pkg.version %>/index.php'
      },
      head:{
        src: '<%= config.app %>/scripts/php/head.php',
        dest: '<%= config.dist %>/<%= pkg.version %>/scripts/php/head.php'
      },
      tail: {
        src: '<%= config.app %>/scripts/php/tail.php',
        dest: '<%= config.dist %>/<%= pkg.version %>/scripts/php/tail.php'
      },
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },
      php: {
        files: ['<%= config.app %>/**/*.php'],
        tasks: ['phplint'],
        options: {
          livereload: true,
          spawn: false,
        }
      },
      js: {
        files: [
          '<%= concat.app.src %>',
          '<%= uglify.app.src %>',
        ],
        tasks: ['concat:app', 'uglify:app'],
        options: {
          livereload: true,
          spawn: false,
        }
      },
      css: {
        files: [
          '<%= config.app %>/css/scss/**/*.scss'
        ],
        tasks: ['sass:app'],
        options: {
          livereload: true,
          spawn: false,
        }
      },
    }

  });

  // actividades o tareas o funciones o lo que sea:
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-phplint');

  // en terminal 'grunt php':
  grunt.registerTask('php', [
    'phplint',
    'sass:app',
    'wiredep',
    'concat:app',
    'uglify:app',
    'imagemin:dist',
  ]);
  // en terminal 'grunt build':
  grunt.registerTask('build', [
    'phplint',
    'sass:dist',
    'wiredep',
    'concat:dist',
    'uglify:dist',
    'imagemin:dist',
  ]);
  // en terminal 'grunt' por defecto:
  grunt.registerTask('default', [
    'sass:app',
    'wiredep',
    'concat:app',
    'uglify:app',
    'imagemin:dist',
  ]);

};
