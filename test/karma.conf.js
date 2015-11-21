module.exports = function (config) {
    'use strict';

    config.set({
        autoWatch: true,

        basePath: '../',

        frameworks: ['jasmine'],

        files: [
            'bower_components/angular/angular.js',
            'bower_components/papaparse/papaparse.js',
            'bower_components/angular-mocks/angular-mocks.js',

            'src/**/*.js',
            'test/spec/**/*.js'
        ],

        exclude: [''],

        // web server port
        port: 5678,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            // 'Chrome',
            'PhantomJS'
        ],

        // Which plugins to enable
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        colors: true,

        logLevel: config.LOG_INFO,

        // Uncomment the following lines if you are using grunt's server to run the tests
        // proxies: {
        //   '/': 'http://localhost:9000/'
        // },
        // URL root prevent conflicts with the site root
        // urlRoot: '_karma_'
    });
};