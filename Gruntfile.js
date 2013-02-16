var fs = require('fs')
  , path = require('path');

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-crypt');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('build', ['encrypt', 'uglify', 'copy']);
  grunt.registerTask('default', ['clean', 'build']);
  var gruntConfig = {
    pkg:grunt.file.readJSON('package.json'),
    clean:{
      default:'dist'
    },
    crypt:{
      files:[
        {
          dir:'src',
          include:'jqwerty.js',
          encryptedExtension:'.encrypted'
        }
      ],
      options:{
        key:grunt.cli.options.key
      }
    },
    copy:{
      build:{
        files:[
          {
            src:['dist/jqwerty.min.js'],
            dest:'demo/jqwerty.min.js'
          }
        ]
      }
    },
    uglify:{
      options:{
        compress:true,
        mangle:true
      },
      build:{
        src:['src/jqwerty.js'],
        dest:'dist/jqwerty.min.js'
      }
    }
  };
  grunt.initConfig(gruntConfig);
};
