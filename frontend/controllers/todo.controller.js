todoCtrl.$inject = ["$scope", "$http"];

function todoCtrl($scope, $http) {

    let refreshTasksList = function () {
        $http.get("/taskslist").then(function successCallback(response) {
            $scope.tasks = response.data;
        }, function errorCallback(error) {
            alert("Server is not available " + error);
        });
    };

    refreshTasksList();

    $scope.addTask = function () {
        $http.post("/taskslist", $scope.task).then(function successCallback() {
            refreshTasksList();
            $scope.task.taskName = "";
            $scope.task.taskDescription = "";
        }, function errorCallback(error) {
            alert("Server is not available " + error);
        });
    };

    $scope.removeTask = function (id) {
        $http.delete("/taskslist/" + id).then(function successCallback() {
            refreshTasksList();
        }, function errorCallback(error) {
            alert("Server is not available " + error);
        });
    };
}

export default todoCtrl;
