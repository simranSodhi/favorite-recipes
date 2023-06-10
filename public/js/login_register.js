$(document).ready(function(){

      var userEmail;
      var userPassword;
      var userName; 
      var userID;


    //Shows Login form
    $("#login_bnt,#mobile_login").on("click",function(){

        $("#shadowBG").fadeIn();
        $("#login_box").fadeIn();
        $("#login_form").fadeIn();

    });

    //Shows Register form
    $("#register_btn,mobile_register").on("click",function(){

        $("#shadowBG").fadeIn(300);
        $("#login_box").fadeIn(400);
        $("#register_form").fadeIn(600);

    });
   
    //Hide Everything
    $("#shadowBG").on("click",function(){

        $("#shadowBG,#login_box,#login_form,#register_form").fadeOut();
        
    });

    const auth = firebase.auth();

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    //Login with google
    $("#loginGoogle").on("click",function(){
        auth.signInWithPopup(googleProvider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
      
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log("Google Login");
          console.log(user);

          saveInternalUser(user.uid,user.displayName,user.email);

          $("#shadowBG,#login_box,#login_form,#register_form").fadeOut();
          showLoginInfo();

         
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    });

    //Creating account with email and password
    $("#create_account").on("click", function(){

      userEmail = $("#newUser_email").val();
      userPassword = $("#newUser_password").val();
      userName = $("#newUser_name").val();

      auth.createUserWithEmailAndPassword(userEmail, userPassword)
        .then((userCredential) => {
          // Signed in 
          let user = userCredential.user;
          console.log(user.uid);
          
          //Saves user info in the database
          addUser(userName,user.uid);
          //Saves info in Internal Storage
          saveInternalUser(user.uid,userName,userEmail);
          showLoginInfo();
          $("#shadowBG,#login_box,#login_form,#register_form").fadeOut();
          checkUserStatus(user);

        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
       });

    });

    $("#loginEmail").on("click", function(){

        userEmail = $("#login_email").val();
        userPassword = $("#login_password").val();
        
        auth.signInWithEmailAndPassword(userEmail, userPassword)
        .then((userCredential) => {
          // Signed in
          let user = userCredential.user;
          savePartialInternalUser(user.uid, userEmail);
          $("#shadowBG,#login_box,#login_form,#register_form").fadeOut();
          checkUserStatus(user);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
     
        setTimeout(getUserFromId(), 2000)


    });

    function checkUserStatus(user){

      auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
        } else {
         
        }
      });
    }


    function logOffScreen(){

      $("#small_userName").text("");
      $("#small_userName").hide();
      $("#small_profile_pic").hide();
      $("#user_top_corner").hide();

      $("#login_register_area").show();
      
    }

    function showLoginInfo(){

      $("#small_userName").text(getInternalUsername());
      $("#small_userName").show();
      $("#small_profile_pic").show();
      $("#user_top_corner").show();

      $("#login_register_area").hide();
      
      
    }

    function checkInternalStorage(){
      if(getInternalUserStatus() != "logged"){
        console.log("cannot find user")
        logOffScreen();
      }else{
        console.log("User found")
        showLoginInfo();
      }
    }

    checkInternalStorage();

    function getUserFromId(){

      console.log(getInternalUserId());
      let userName;
      var docRef = db.collection("Users").doc(getInternalUserId());

      docRef.get().then((doc) => {
          if (doc.exists) {
              
            userName = doc.data().name;
            saveUserName(userName);
              
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
              userName = "User not found"
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });

      return userName;
    }

});