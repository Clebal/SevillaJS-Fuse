var Observable = require('FuseJS/Observable');
var Backend = require("JS/Backend");

var comments = Observable({});

var inputComment = Observable();

var id = Observable();

var item = this.Parameter.map(function(data){

  comments.clear();

  id = data.id;

  Backend.getComments(data.id).then(function(aux){

    if(aux != null){
      aux.forEach(function(comment){
        comments.add(comment);
      })
    }

  });

  return data;

});

function goBack(){
  router.goBack();
}

function regComment(){

  console.log(id);
  console.log(inputComment.value);

  Backend.getRegisteredUser().then(function(user){
    comments.add({autor: user.nombre, avatar: user.avatar, comment: inputComment.value})
  }).catch(function(err){
    console.log("Error regComment: " + err);
  })

  Backend.setComment(id, inputComment.value).then(function(d){ inputComment.value = ""; }).catch(function(err){ console.log(err); });

}

module.exports = {
  goBack: goBack,
  item: item,
  comments: comments,
  inputComment: inputComment,
  regComment: regComment
}
