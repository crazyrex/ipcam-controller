/**
* Service class to execute a single action
* @module CameraService
* @author Luigi Bifulco
*/
var factory = require("./CameraFactory.js");
var Step = require("./Step.js");
var Promise = require("promise");

var defaultDuration = null;
/**
  @constructor
  @argument {!Object} config
  @argument {?CameraControl} camera @see CameraControl
*/
function CameraService(config,camera){
  var ip  = config.ip;
  var name = config.name;
  var type = config.type;
  var user = config.user;
  var auth = config.pwd;
  defaultDuration = config.duration;
  if(!camera){
    var camera = factory.createSingletonCamera(name,type,{
      host:{ip: ip},
      credentials: {login: user, pwd: auth}
    });
    this.camera =camera;
  }
  this.camera =camera;
  console.log(camera);
}

/**
  @function

*/
CameraService.execute = function(service,action,d){
  var camera =service.camera;
  var duration = d||defaultDuration;
  console.log("creating step: "+action+" - "+duration);
  var type = camera.getActionType(action);
  var val = camera.getActionValue(action);
  var url = camera.decode(type,val,false);
  var s = new Step(url,duration);
  var promise = new Promise(function (resolve, reject) {
    console.log("step started");
    Step.execute(s).then(resolve);
  });
  return promise;
}

module.exports = CameraService;
