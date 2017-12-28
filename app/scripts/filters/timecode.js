(function() {
     function timecode() {
         return function(seconds) {

           timer = buzz.toTimer(seconds);

             return timer;
         };
     }

     angular
         .module('pomodoro-2017')
         .filter('timecode', timecode);
 })();
