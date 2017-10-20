var Environment = require('FuseJS/Environment');
var qreader = require('Qreader');
var Observable = require('FuseJS/Observable');
var Backend = require("JS/Backend");

function load() {
  if(!Environment.desktop){
    qreader.scan().then(function(res) {

      Backend.setRegisteredUser(res).then(function(d){ resolve(d); }).catch(function(err){ reject(err); });


    });
  }else{
    var res = {
      "nombre": "Sergio",
      "apellidos": "Clebal",
      "codigo": "asdfg",
      "avatar": "https://pbs.twimg.com/profile_images/896919727817322496/zQGd1tjT_400x400.jpg"
    };
    Backend.setRegisteredUser(JSON.stringify(res)).then(function(d){ resolve(d); }).catch(function(err){ reject(err); });
    router.goto("concerts");
  }
}

module.exports = {
  load: load
}
