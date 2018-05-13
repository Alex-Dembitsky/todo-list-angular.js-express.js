import angular from "angular";
import uiRouter from "angular-ui-router";
import ngMaterial from "angular-material";
import "angular-aria";
import "angular-animate";

import todoCtrl from "./controllers/todo.controller.js";
import appConfig from "./app.config.js";
import "angular-material/angular-material.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/app.less";

angular.module("app", [uiRouter, ngMaterial]).controller("todoCtrl", todoCtrl).config(appConfig);
