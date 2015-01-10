module.exports = function(grunt) {

  // configuracion general
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['app/scripts/js/*.js'],
        dest: 'dist/scripts/js/built.js',
        nonull: true,
      },
    },

    uglify: {
      build: {
          src: 'dist/scripts/js/built.js',
          dest: 'dist/scripts/js/built.min.js'
      }
    },

    imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: 'app/images/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'dist/images/'
        }]
      }
    },

    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          'app/css/main.css': 'app/css/scss/main.scss'
        }
      },
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/css/main.css': 'app/css/scss/main.scss'
        }
      }
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

  // en terminal 'grunt' por defecto:
  grunt.registerTask('default', [
    'concat',
    'uglify',
    'imagemin',
    'sass'
  ]);

};
