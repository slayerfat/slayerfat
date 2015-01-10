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

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['<%= config.app %>/scripts/js/*.js'],
        dest: '<%= config.dist %>/scripts/js/built.js',
        nonull: true,
      },
    },

    uglify: {
      dist: {
          src: '<%= config.dist %>/scripts/js/built.js',
          dest: '<%= config.dist %>/scripts/js/built.min.js'
      }
    },
    // optimizar imagenes
    imagemin: {
      dev: {
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
            dest: '<%= config.dist %>/images/'
        }]
      }
    },

    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%= config.app %>/css/main.css': '<%= config.app %>/css/scss/main.scss'
        }
      },
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%= config.dist %>/css/main.css': '<%= config.app %>/css/scss/main.scss'
        }
      }
    },

    // inyecta dependencias al archivo
    wiredep: {
      target: {
        src: '<%= config.app %>/index.php' // point to your HTML file.
      }
    },

    useminPrepare: {
      html: '<%= config.app %>/index.html',
      options: {
        dest: '<%= config.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
    },

    watch: {
      files: ['<%= concat.dist.src %>'],
      tasks: ['concat']
    }

  });

  // actividades o tareas o funciones o lo que sea:
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-usemin');

  // en terminal 'grunt build':
  grunt.registerTask('build', [
    'concat',
    'uglify',
    'imagemin:dist',
    'sass:dist'
  ]);
  // en terminal 'grunt' por defecto:
  grunt.registerTask('default', [
    'concat',
    'uglify',
    'imagemin:dev',
    'sass:dev',
    'useminPrepare',
    'usemin'
  ]);

};
