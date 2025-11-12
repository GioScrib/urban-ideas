// Karma configuration file
// Questo file può sostituire o integrare karma.conf.js esistente

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // Configurazione Jasmine
        random: false, // Disabilita esecuzione random dei test
        seed: 42, // Seed per risultati riproducibili
        stopSpecOnExpectationFailure: false,
        stopOnSpecFailure: false,
        timeoutInterval: 10000
      },
      clearContext: false // mantieni il Jasmine Spec Runner output visibile nel browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // rimuove tracce duplicate
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/urban-ideas'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly' },
        { type: 'json' }
      ],
      check: {
        global: {
          statements: 60,
          branches: 55,
          functions: 60,
          lines: 60
        }
      }
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage'
        ]
      }
    },
    restartOnFileChange: true,
    singleRun: false,
    browserNoActivityTimeout: 30000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    captureTimeout: 210000
  });
};
