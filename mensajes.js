$("#login").click(function(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
})

function writeNewPost(uid, username, picture, title, body, filtro) {
    // A post entry.
    var postData = {
      author: username,
      uid: uid,
      body: body,
      title: title,
      starCount: 0,
      authorPic: picture,
      indice: filtro,
    };
  
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
  
    return firebase.database().ref().update(updates);
  }

$("#mensaje").click(function(){
    var userId = firebase.auth().currentUser.uid;
    var filtro = getRandomInt(1,3);
    writeNewPost(userId,"usuario","http://url/img","hola","que onda?",filtro);
})

$("#leer").click(function(){
    var indice1Objects = firebase.database().ref('posts').orderByChild("indice").equalTo(1);
    indice1Objects.off('child_added');
    indice1Objects.on('child_added', function(data) {
        console.log({"objeto de indice 1": data.val()});
    });

    var indice2Objects = firebase.database().ref('posts').orderByChild("indice").equalTo(2);
    indice2Objects.off('child_added');
    indice2Objects.on('child_added', function(data) {
        console.log({"objeto de indice 2": data.val()});
    });
})

$("#logout").click(function(){
    firebase.auth().signOut();
    console.log("logout");
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}