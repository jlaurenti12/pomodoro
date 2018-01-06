(function() {
    function RightCtrl($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
        });
    };
  }

  angular
      .module('pomodoro-2017')
      .controller('RightCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', RightCtrl]);
})();
