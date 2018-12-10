// JavaScript
define(["angular","js/qlik"], function (angular, qlik) {

  // defines controller class
  function AppCtrl() {
    this.name = "App List";
    this.apps = [];
    this.setupErrorHandling();
    this.populateAppList();
  }

  AppCtrl.prototype.setupErrorHandling = function() {
    var self = this;
    qlik.setOnError(function (e) {
      self.error = "Qlik Error: " + e.message;
    });
  }

  AppCtrl.prototype.populateAppList = function() {
    var self = this;
    qlik.getAppList(function (list) {
      self.apps = list;
    });
  }

  // define the angular module with its controller
  var app = angular.module('myAngularModule', []);
  app.controller('AppCtrl', AppCtrl);
})