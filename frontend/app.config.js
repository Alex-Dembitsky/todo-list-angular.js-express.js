function config($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("main", {
      url: "/",
      template: require("./controllers/todo.page.html"),
      controller: "todoCtrl",
      title: ""
    });
}

export default ["$stateProvider", "$urlRouterProvider", "$locationProvider", config];