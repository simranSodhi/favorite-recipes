$(document).ready(function(){


//getting parameter id from url

var url_string = window.location;
var url = new URL(url_string);
var recipeId = url.searchParams.get("id");

var thisRecipe;

var docRef = db.collection("Recepies").doc(recipeId);

docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        thisRecipe = doc.data();

        $("h1").text(thisRecipe.recipeName);
        $("#recipe_image").css("background-image", "url("+thisRecipe.recipePhoto+")");
        $("#howtodo_text").text(thisRecipe.howToDo);
        $("#diff").text(thisRecipe.difficulty);
        $("#timePrep").text(thisRecipe.time);
        
        thisRecipe.ingridients.forEach(getIngridients);
        
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});


//Loads ingridients
function getIngridients(item, index) {
    $("#ingridients_list").append("<li>"+item+"</li>");
}

//Add favorite
$("#fav_btn").click(function(){

    addAsFavorite(recipeId)
    $("#fav_btn").fadeOut();

});


});