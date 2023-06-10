$(document).ready(function(){

    var userProfileId = getInternalUserId();

    if(getInternalUserStatus() != "logged"){
        console.log("cannot find user")
        logOffScreen();
      }else{
        console.log("User found")
        showLoginInfo();
      }


      function showLoginInfo(){

        $("#small_userName").text(getInternalUsername());
        $("#small_userName").show();
        $("#small_profile_pic").show();
  
        $("#login_register_area").hide();

        $("#userNameProfile").text(getInternalUsername());
        $("#emailProfile").text(getInternalUserEmail());
        
      }

      $("#logOffbtn").click(function(){
        alert("I was cliked");
        clearInternalStorage();
        //firebase.auth().signOut;
        window.location.assign("index.html")
      });


      //Loading all recipes of this user
      function loadRecipes(userId){

        db.collection("Recepies").where("authorId","==",userId)
        
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
        
                recipe = doc.data();
                console.log(doc.data());
    
                $(".recipe-container-profile").append(
                    '<div><a href="recipe.html?id='+doc.id+'"><div class="image-recipe-profile" style="background-image: url('+recipe.recipePhoto+');"></div></a></div>'
                );   
            });
        });
       
      }
      
       loadRecipes(userProfileId);
});