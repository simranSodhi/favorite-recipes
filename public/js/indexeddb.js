var internalDB;
var request = window.indexedDB.open("UserInfo", 1);

request.onerror = function(event) {
    console.log("error: ");
 };
 
 request.onsuccess = function(event) {
    internalDB = request.result;
    console.log("success: "+ internalDB);
 };
 
 request.onupgradeneeded = function(event) {
    var internalDB = event.target.result;
    var objectStore = internalDB.createObjectStore("user", {keyPath: "id"});
 }


function saveData(userId,userName,userEmail){

    let user = {id: userId, name: userName, email: userEmail}

    var request = internalDB.transaction(["user"], "readwrite")
   .objectStore("user")
   .add({ id: user.id, name: user.name, email: user.email });
   
   request.onsuccess = function(event) {
      console.log("User created");
      console.log(user);
   };
   
   request.onerror = function(event) {
      alert("Unable to add data\r\n User already exists in your database! ");
   }


}

function readData(){
    
        var transaction = db.transaction(["user"]);
        var objectStore = transaction.objectStore("user");
        var request = objectStore.get(localStorage.getItem("userId"));
        
        request.onerror = function(event) {
           alert("Unable to retrieve user from internal database!");
        };
        
        request.onsuccess = function(event) {
           if(request.result) {
            console.log("Internal Storage:")
             console.log(request.result)
           } else {
            console.log("Could not retrieve information")
           }
        };
     
}

function clearInternalDatabase(){
        // open a read/write db transaction, ready for clearing the data
    var transaction = db.transaction(["UserInfo"], "readwrite");

    // report on the success of the transaction completing, when everything is done
    transaction.oncomplete = function(event) {
        console.log("Database cleared")
    };

    transaction.onerror = function(event) {
        console.log(transaction.error);
    }
    // create an object store on the transaction
    var objectStore = transaction.objectStore("UserInfo");

    // Make a request to clear all the data out of the object store
    var objectStoreRequest = objectStore.clear();

    objectStoreRequest.onsuccess = function(event) {
    };
}

//We are only using this code below:

function saveInternalUser(id,name,email){
    localStorage.setItem("userId", id);
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("Status","logged");
}

function savePartialInternalUser(id,email){
    localStorage.setItem("userId", id);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("Status","logged");
}

function saveUserName(name){
    localStorage.setItem("userName", name);
}

function getInternalUsername(){
    let username = localStorage.getItem("userName");
    return username;
}

function getInternalUserId(){
    let userId = localStorage.getItem("userId");
    return userId;
}

function getInternalUserEmail(){
    let userEmail = localStorage.getItem("userEmail");
    return userEmail;
}

function getInternalUserStatus(){
    let userStatus = localStorage.getItem("Status");
    return userStatus;
}

function clearInternalStorage(){
    localStorage.getItem("favorites");
    localStorage.setItem("userName", "");
    localStorage.setItem("userEmail", "");
    localStorage.setItem("Status","");
}

function addAsFavorite(recipeId){
    let arr  = {recipesIds:[recipeId]};
    let favs = localStorage.getItem("favorites");

    if(favs == "" || favs == null){
        localStorage.setItem("favorites", JSON.stringify(arr));
    }else{
        let list = JSON.parse(favs);
        list.recipesIds.push(recipeId)
        localStorage.setItem("favorites", JSON.stringify(list));
    }
}

function getFavorites(){
    let favorites = localStorage.getItem("favorites");
    return JSON.parse(favorites);
}