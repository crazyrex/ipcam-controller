var factory = require('./src/CameraFactory.js')
var Service = require('./src/CameraService.js')
var Scheduler = require('./src/scheduler.js')
var Types = require('./src/scheduler.js')
var Promise = require("promise");

function IpCameraController(){
  this.camera = null;
  this.service = null;
}

IpCameraController.prototype.addType = function(name,typeSpec){
  Types.addType(name,typeSpec);
}

IpCameraController.prototype.createCamera = function(name,type,config){
  var ip  = config.ip;
  var name = config.name;
  var type = config.type;
  var user = config.user;
  var auth = config.pwd;
  this.camera = factory.createCamera(name,type, { host:{ip: ip},
    credentials: {login: user, pwd: auth}});
    this.service = new Service({},this.camera);
  }

  IpCameraController.prototype.action = function(action,duration){
    Service.execute(this.service,action,duration);
  }

  IpCameraController.prototype.schedule = function(action,when,times){
    Scheduler.schedule(action,when,times);
  }

  IpCameraController.prototype.moveLeftFor = function(duration){
    var self = this;
    var promise = new Promise(function (resolve, reject) {
      self.action("moveLeft",duration).then(resolve);
    });
    return promise;
  }

  IpCameraController.prototype.moveRightFor = function(duration){
    var self = this;
    var promise = new Promise(function (resolve, reject) {
      self.action("moveRight",duration).then(resolve);
    });
    return promise;
  }

  module.exports = new IpCameraController();
