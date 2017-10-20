var Observable = require("FuseJS/Observable");
var Backend = require("JS/Backend");

var concerts = Observable();

Backend.getConcerts().then(function(data){

  data.forEach(function(item){
    concerts.add(item);
  })

}).catch(function(err){
  console.log("Error: " + err);
})

module.exports = {
  concerts: concerts,
  goItem: function(arg) {
    router.push("concerts", {}, "concert", arg.data);
  }
}
