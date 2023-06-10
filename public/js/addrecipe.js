$(document).ready(function(){

    var ImgName, ImgUrl;
    var files = [];
    var reader = new FileReader();
    

    var photoLink ="https://firebasestorage.googleapis.com/v0/b/browser-project-4439b.appspot.com/o/Images%2Fdish.png?alt=media&token=da0f8715-ee7e-41d5-947c-7656131e4c30";

    //Add ingridient
    let ingridient_container = '<div class="ingridient_container"><button type="button" id="removeIngridient">-</button><input type="text" class="ingridient"><br></div>'

    $("#addIngridient").click(function(){
        $(".ingridient_container:last").after(ingridient_container);
    });

    //Remove ingridient
    $(document).on("click","#removeIngridient",function(){
        $(this).parent().remove();
    });



    //----------------------IMAGE SELECTION PROCESS-----------------------------------------------// 
    
    document.getElementById("select_image").onclick = function(e){
        var input = document.createElement('input');
        input.type='file';
        

        input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function() {
            $("#select_image").css("background-image", "url(" + reader.result + ")");

        }
        reader.readAsDataURL(files[0]);
        }
        input.click();
    }

    //----------------------UPLOAD PROCESS------------------------------------------------------//     
//----------------------UPLOADING PICTURE TO THE STORAGE------------------------------------//   

function uploadImage(){
    var d = new Date();
    var n = d.getTime();
    ImgName = n
    var uploadTask = firebase.storage().ref('Images/' +ImgName+".jpg").put(files[0]);
    uploadTask.on('state_changed',function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
      },  
      function(error){
        alert('error in saving the image');
      },  
      function(){
          uploadTask.snapshot.ref.getDownloadURL().then(function(url){
            ImgUrl = url;
            photoLink = ImgUrl;
            console.log(photoLink);

          });
      
  });
}

//Upload photo btn
$("#uploadPhoto").click(function(){

    uploadImage();
    console.log(photoLink);

});



    //Send information to the database
    $("#create_recipe_btn").click(function(){
        var ingridients = [];
        var time;

        let recipeName = $("#rname").val();
        let recipeDiff = $("#difficulty").val();
        let hours = $("#hours").val();
        let minutes = $("#minutes").val();
        let howTo = $("#how").val();

        let authorName = getInternalUsername();
        let authorId = getInternalUserId();
        
        //Create an array of ingridients
        $(".ingridient").each(function(i){
            let newIngridient = $(this).val();
            ingridients.push(newIngridient)
        });
        if(hours == "" || hours == 0){
            time = minutes+"m"
        }else if(minutes == "" || minutes == 0){
            time = hours+"h"
        }else{
            time = hours+"h "+minutes+"m"
        }

        
        console.log(ImgUrl);
        console.log(ImgName);

        addNewRecipe(recipeName,recipeDiff,ingridients,photoLink,time,howTo,authorName,authorId);
        
    });

    function addNewRecipe(name,dif,ingridientsArray,photoLink,timeItTakes,howToMakeit,creatorName,creatorId){

        db.collection("Recepies").add({
          recipeName: name,
          difficulty:dif,
          ingridients:ingridientsArray,
          recipePhoto:photoLink,
          time:timeItTakes,
          howToDo:howToMakeit,
          author :creatorName,
          authorId: creatorId
      })
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          //updatePhoto(docRef.id);
      });
    }

    function updatePhoto(id,imageLink){
        var changeRecipe = db.collection("Recepies").doc(id);

        // Set the "capital" field of the city 'DC'
        return changeRecipe.update({
            recipePhoto: imageLink
        })
        .then(() => {
            console.log("Image updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

});