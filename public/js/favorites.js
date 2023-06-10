$(document).ready(function(){

var favObj = getFavorites().recipesIds;

console.log(favObj);

for (var id in favObj){

    console.log(favObj[id]);
    console.log("MAvQbF4WVuipuRnKTycE");

    var docRef = db.collection("Recepies").doc(favObj[id]);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());


            $(".recipe-container-favorite").append(
                
                '<div class="favorite-wrap">'+
                '<a href="recipe.html?id='+doc.id+'">'+
                '<div class="image-recipe-favorite" style="background-image: url('+doc.data().recipePhoto+')"></div>'+
                '</a>'+
                '<div class="description-favorite">'+
                '<div class="recipe-info-favorite">'+
                '<h3 class="recipe_name-favorite">'+doc.data().recipeName+'</h3>'+
                '<p class="recipe_author-favorite">Made by '+doc.data().author+'</p>'+
                '</div>'+
                '<div class="recipe-details-favorite">'+
                '<div class="recipe-difficulty-favorite">'+
                '<img class="detail_image-favorite" src="img/difficulty.png"/>'+
                '<p class="detail_text-favorite">'+doc.data().difficulty+'</p>'+
                '</div>'+
                '<div class="recipe-time-favorite">'+
                '<img class="detail_image-favorite" src="img/time.png" />'+
                '<p class="detail_text-favorite">'+doc.data().time+'</p>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="delete-favorite">'+
                '</div>'+
                '</div>'
                

            );
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

}



///






});