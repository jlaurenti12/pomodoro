(function() {
    function HomeCtrl() {
    }

    angular
        // dependencies set in app.js; only need to retrieve the already-defined module
        .module('pomodoro-2017')
        // inject as many dependencies as our controller in the array below
        // last item in the array must be the callback function that executes when the controller is initialized
        .controller('HomeCtrl', [HomeCtrl]);
})();
