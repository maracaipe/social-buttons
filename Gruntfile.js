module.exports = function(grunt) {


  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
    '* Licenses: Apache 2.0, MIT <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    
    concat: {
      social_buttons: {
        src: ['src/**/*.html'],
        dest: 'dist/all.html'
      },
      polymer:{
        options: {
          banner: '<%= banner %>',
          stripBanners: true
        },
        src: ['bower_components/platform/platform.js', 'bower_components/polymer/polymer.js'],
        dest: 'dist/polymer.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      polymer: {
        src: '<%= concat.polymer.dest %>',
        dest: 'dist/polymer.min.js'
      }
    },

    watch: {
      social_buttons: {
        files: ['src/**/*.html'],
        tasks: ['default']
      }
    }
  });

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');


grunt.registerTask('default', ['concat', 'uglify']);
grunt.registerTask('wattch', ['watch']);
};