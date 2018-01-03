(function() {
    function HomeCtrl(Task, $scope, $firebaseArray, $interval, TIMES) {

    var ref = firebase.database().ref().child("tasks");

      $scope.tasks = $firebaseArray(ref);

      this.addTask = function() {
        Task.add(this.newTask);
        this.newTask.$value = null;
      };

  // Default timer status and button state when the page is loaded

      this.clock = TIMES.WORK_SESSION;

      this.sessions = 0;

      this.timer = null;

      this.buttonMsg = "Start Timer";

      this.timerRunning = false;

      this.onBreak = false;

      $scope.tasks = $firebaseArray(ref);

      $scope.addTask = function() {
        $scope.tasks.$add({
          text: $scope.newText
      });
    };

  // Declaring variable and tying it to the appropriate mp3 file using Buzz

      var mySound = new buzz.sound( "/assets/sounds/ding.mp3", {
            preload: true
         });

  // $scope.$watch listens to the clock and when it's value becomes 0 plays the mySound sound

         $scope.$watch('home.clock', function(newValue, oldValue){
             newValue === 0 ? mySound.play() : this.clock
         });

  // Start time function initiated when 'Start Time / Start a new session' button is clicked

      this.startWorkTimer = function() {
          this.timerRunning = true;
          this.buttonMsg = "Reset Timer";
          this.clock -= 1;
          this.timer = $interval(function () {
              this.clock -= 1;
              if (this.clock === -1) {
                $interval.cancel(this.timer);
                this.timerRunning = false;
                this.onBreak = true;
                this.sessions ++;
                  if (this.sessions == 4) {
                    this.buttonMsg = "4 in a row - enjoy your longer break :)";
                    this.clock = TIMES.LONG_BREAK;
                  } else {
                    this.buttonMsg = "Start your break!";
                    this.clock = TIMES.SHORT_BREAK;
                  }
              }
          }.bind(this), 1000);
      }

  // Reset time function initiated when when work timer is running and 'Reset Timer' button is clicked

      this.resetWorkTimer = function() {
          if (angular.isDefined(this.timer)) {
                 $interval.cancel(this.timer);
                 this.clock = TIMES.WORK_SESSION;
                 this.timerRunning = false;
                 this.buttonMsg = 'Start Timer'
          }
      }

  // Break time function initiated when when work timer gets to 0 and 'Start Break' button is clicked

      this.startBreakTimer = function() {
          this.timerRunning = true;
          this.clock -= 1;
          this.buttonMsg = "Reset Break";
          this.timer = $interval(function () {
              this.clock -= 1;
              if(this.clock === -1) {
                 $interval.cancel(this.timer);
                 this.timerRunning = false;
                 this.onBreak = false;
                 this.buttonMsg = "Start a New Session!"
                 this.clock = TIMES.WORK_SESSION;
                 this.sessions == 4 ? this.sessions = 0 : this.sessions
              }
          }.bind(this), 1000);
       }

   // Reset time function initiated when when break timer is running and 'Reset Break' button is clicked

      this.resetBreakTimer = function() {
          if (angular.isDefined(this.timer)) {
              $interval.cancel(this.timer);
              this.timerRunning = false;
              this.buttonMsg = 'Start Break'
              this.sessions == 4 ? this.clock = TIMES.LONG_BREAK : this.clock = TIMES.SHORT_BREAK
          }
       }


    }

    angular
        // dependencies set in app.js; only need to retrieve the already-defined module
        .module('pomodoro-2017')
        // inject as many dependencies as our controller in the array below
        // last item in the array must be the callback function that executes when the controller is initialized
        .controller('HomeCtrl', ['Task', '$scope', '$firebaseArray', '$interval', 'TIMES', HomeCtrl]);
})();
