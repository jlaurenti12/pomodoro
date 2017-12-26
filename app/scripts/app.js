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
        .state('home', {
          url: '/',
          // controller paired to the state using 'controller as' syntax
          controller: 'HomeCtrl as home',
          templateUrl: '/templates/home.html'
        });
    }
    angular
        // dependencies are injected into the app by adding script source, then adding them to the array below
        .module('pomodoro-2017', ['ui.router', 'firebase'])
        // makes sure the providers are accessible throughout the application
        .config(config);
})();
