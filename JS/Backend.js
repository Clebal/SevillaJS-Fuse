var FileSystem = require("FuseJS/FileSystem");

var path = FileSystem.dataDirectory + "/";

var concerts = [{"id":1,"artista":"Armin van Buuren","imagen":"https://bodyheightweight.com/wp-content/uploads/2016/07/armin-van-buuren-height-weight-body-measurements.jpg","fechahora":"22/06 - 20:30"},{"id":2,"artista":"Eric Prydz","imagen":"http://www.billboard.com/files/media/eric-prydz-toronto-billboard-1548.jpg","fechahora":"22/06 - 23:00"},{"id":3,"artista":"Steve Angello","imagen":"https://edmred.com/wp-content/uploads/2016/03/Steve-Angello-Tomorrowland-2015-e1438204030185.jpg","fechahora":"23/06 - 01:00"},{"id":4,"artista":"Joris Voorn","imagen":"http://www.deephouseamsterdam.com/wp-content/uploads/2017/05/Joris-Voorn-Spectrum-Radio-featured.jpg","fechahora":"23/06 - 02:00"},{"id":5,"artista":"Nicky Romero","imagen":"http://mdmelectro.com/wp-content/uploads/2017/07/Nicky-Romero.jpg","fechahora":"23/06 - 03:30"},{"id":6,"artista":"Minus Militia","imagen":"https://i.ytimg.com/vi/RrBWMFgw1W0/maxresdefault.jpg","fechahora":"23/06 - 19:00"},{"id":7,"artista":"LNY TNZ","imagen":"https://a.cdn.miamimusicweek.com/production/artist/814/image/LNY-TNZ.jpg","fechahora":"23/06 - 21:30"}];

var comments = {"1":[{"autor":"Eduardo","avatar":"https://www.w3schools.com/w3css/img_avatar3.png","comment":"Buah chaval, menudo artista!"},{"autor":"Paco","avatar":"https://www.w3schools.com/w3css/img_avatar1.png","comment":"Menudo artista!"}],"2":[{"autor":"Manuel","avatar":"https://www.w3schools.com/w3css/img_avatar4.png","comment":"Deseando que llegue al dia, una pena que se pise con Dimitri"}],"3":[],"4":[{"autor":"Jonathan","avatar":"https://www.w3schools.com/w3css/img_avatar5.png","comment":"Madre mia el bisho"}],"5":[{"autor":"Sergio","avatar":"https://www.w3schools.com/w3css/img_avatar6.png","comment":"Buah chaval, menudo artista!"}],"6":[],"7":[{"autor":"Eduardo","avatar":"https://www.w3schools.com/w3css/img_avatar2.png","comment":"Buah chaval, menudo artista!"}]};

FileSystem.exists(path + "concerts.json").then(function(data){
  if(!data){
    FileSystem.writeTextToFile(path + "concerts.json", JSON.stringify(concerts)).then(function(d){}).catch(function(err){});
    FileSystem.writeTextToFile(path + "comments.json", JSON.stringify(comments)).then(function(d){}).catch(function(err){});
  }
}).catch(function(err){
  console.log(err);
})

function check(router){

  FileSystem.exists(path + "registeredUser.json").then(function(data){
    if(!data){
      router.goto("principal");
    }else{
      router.goto("concerts")
    }
  }).catch(function(err){
    console.log("Error: " + err);
  })

}

function getRegisteredUser(){

  return new Promise(function(resolve,reject){

    FileSystem.readTextFromFile(path + 'registeredUser.json').then(function(data){
      resolve(JSON.parse(data));
    }).catch(function(err){
      reject(err);
    })

  })

}

function setRegisteredUser(user){

  return new Promise(function(resolve, reject){

    FileSystem.writeTextToFile(path + "registeredUser.json", user).then(function(d){ resolve(d); }).catch(function(err){ reject(err); });

  })

}

function getConcerts() {

  return new Promise(function(resolve,reject){

    FileSystem.readTextFromFile(path + 'concerts.json').then(function(data){
      resolve(JSON.parse(data));
    }).catch(function(err){
      reject(err);
    })

  })

}

function getAllComments(){

  return new Promise(function(resolve,reject){

    FileSystem.readTextFromFile(path + 'comments.json').then(function(data){
      resolve(JSON.parse(data));
    }).catch(function(err){
      reject(err);
    })

  })

}

function getComments(id){

  return new Promise(function(resolve,reject){

    FileSystem.readTextFromFile(path + 'comments.json').then(function(data){
      resolve(JSON.parse(data)[id]);
    }).catch(function(err){
      reject(err);
    })

  })

}

function setComment(id, comment) {

  return new Promise(function(resolve, reject){

    getRegisteredUser().then(function(user){

      getAllComments().then(function(aux){

        aux[id].push({autor: user.nombre, avatar: user.avatar, comment: comment})

        FileSystem.writeTextToFile(path + "comments.json", JSON.stringify(aux)).then(function(d){ resolve(d); }).catch(function(err){ reject("Error setComment: " + err)});

      })

    }).catch(function(err){
      reject(err);
    })

  })

}

module.exports = {
  check: check,
  getRegisteredUser: getRegisteredUser,
  setRegisteredUser: setRegisteredUser,
  getConcerts: getConcerts,
  getAllComments: getAllComments,
  getComments: getComments,
  setComment: setComment
}
