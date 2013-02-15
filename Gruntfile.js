var fs = require('fs')
  , path = require('path');

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
  var gruntConfig = {
    pkg:'<json:package.json>',
    clean:{
      default:'dist'
    },
    uglify:{
      options:{
        compress:true,
        mangle: true
      },
      dist:{
        src:['src/jqwerty.js'],
        dest:'dist/jqwerty.min.js'
      }
    }
  };
  grunt.initConfig(gruntConfig);
};
