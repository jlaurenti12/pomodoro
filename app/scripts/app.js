(function() {
    function config($locationProvider, $stateProvider) {

      // configure how the application handles URLs in the browser
      $locationProvider
        .html5Mode({
          enabled: true,
          requireBase: false
        });

      // configure the state behavior
      $stateProvider
        // state name
        .state('time', {
          url: '/time',
          // controller paired to the state using 'controller as' syntax
          controller: 'TimeCtrl as time',
          templateUrl: '/templates/time.html'
        })

        .state('landing', {
          url: '/',
          templateUrl: '/templates/landing.html'
        });
    }
    angular
        // dependencies are injected into the app by adding script source, then adding them to the array below
        .module('pomodoro-2017', ['ui.router', 'firebase', 'ngMaterial'])
        // constant values that can be used in other parts of the app that include TIMES
        .constant('TIMES', {
         'WORK_SESSION': 1500,
         'SHORT_BREAK': 300,
         'LONG_BREAK': 1800
        })
        // makes sure the providers are accessible throughout the application
        .config(config);
})();
