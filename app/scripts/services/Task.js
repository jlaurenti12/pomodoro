(function() {
  function Task($firebaseArray) {

    var Task = {};
    var ref = firebase.database().ref().child("tasks");

    // download tasks into a synchronized array
    var tasks = $firebaseArray(ref);

    // sets tasks equal to all the tasks in the array
    Task.all = tasks;

    // function for adding tasks to the array
    Task.add = function(task) {
      tasks.$add(task);
    };

    Task.complete = function(task) {
      task.$remove(task);
    };

    return Task;
  }

  angular
    .module('pomodoro-2017')
    .factory('Task', ['$firebaseArray', Task]);
})();
