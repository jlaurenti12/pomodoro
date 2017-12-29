(function() {
    function HomeCtrl($firebaseArray, $interval) {

  // Default timer status and button state when the page is loaded

      this.clock = 10;

      this.timer = null;

      this.buttonMsg = "Start Timer";

      this.timerRunning = false;

      this.onBreak = false;

  // Start time function initiated when 'Start Time / Start a new session' button is clicked

      this.startWorkTimer = function() {
          this.timerRunning = true;
          this.buttonMsg = "Reset Timer";
          this.clock = 9;
          this.timer = $interval(function () {
              this.clock -= 1;
              if (this.clock === 0) {
                $interval.cancel(this.timer);
                this.timerRunning = false;
                this.onBreak = true;
                this.buttonMsg = "Take a Break - You Earned it!";
                this.clock = 5;
              }
          }.bind(this), 1000);
      }

  // Reset time function initiated when when work timer is running and 'Reset Timer' button is clicked

      this.resetWorkTimer = function() {
          if (angular.isDefined(this.timer)) {
                 $interval.cancel(this.timer);
                 this.clock = 10;
                 this.timerRunning = false;
                 this.buttonMsg = 'Start Timer'
          }
      }

  // Break time function initiated when when work timer gets to 0 and 'Start Break' button is clicked

      this.startBreakTimer = function() {
          this.timerRunning = true;
          this.clock = 4;
          this.buttonMsg = "Reset Break";
          this.timer = $interval(function () {
              this.clock -= 1;
              if(this.clock === 0) {
                 $interval.cancel(this.timer);
                 this.timerRunning = false;
                 this.onBreak = false;
                 this.buttonMsg = "Start a New Session!"
                 this.clock = 10;
              }
          }.bind(this), 1000);
       }

   // Reset time function initiated when when break timer is running and 'Reset Break' button is clicked

      this.resetBreakTimer = function() {
          if (angular.isDefined(this.timer)) {
              $interval.cancel(this.timer);
              this.clock = 5;
              this.timerRunning = false;
              this.buttonMsg = 'Start Break'
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
