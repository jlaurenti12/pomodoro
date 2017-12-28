(function() {
    function HomeCtrl($firebaseArray, $interval) {

  // Default timer status and button state when the page is loaded

      this.clock = 10;

      this.timer = null;

      this.buttonMsg = "Start Timer";

      this.timerRunning = false;

  // Start time function initiated when button is clicked

      this.startTimer = function() {
          this.timerRunning = true;
          this.buttonMsg = "Reset Timer"
          this.clock = 9;
          this.timer = $interval(function () {
              this.clock -= 1;
              if (this.clock === 0) {
                $interval.cancel(this.timer);
              }
          }.bind(this), 1000);
      }

  // Reset time function initiated when when timer is running and button is clicked

      this.resetTimer = function() {
          if (angular.isDefined(this.timer)) {
                 $interval.cancel(this.timer);
                 this.clock = 10;
                 this.timerRunning = false;
                 this.buttonMsg = 'Start Timer'
          }
      }
    }

    angular
        // dependencies set in app.js; only need to retrieve the already-defined module
        .module('pomodoro-2017')
        // inject as many dependencies as our controller in the array below
        // last item in the array must be the callback function that executes when the controller is initialized
        .controller('HomeCtrl', ['$firebaseArray', '$interval', HomeCtrl]);
})();
