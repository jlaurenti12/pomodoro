(function() {
  function Task($firebaseArray) {

    var Task = {};
    var ref = firebase.database().ref().child("tasks");

    // download tasks into a synchronized array
    var tasks = $firebaseArray(ref);

    Task.all = tasks;

    Task.add = function(task) {
      tasks.$add(task);
    };

    return Task;
  }

  angular
    .module('pomodoro-2017')
    .factory('Task', ['$firebaseArray', Task]);
})();
