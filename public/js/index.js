$(document).ready(function(){

    var recipe;
    db.collection("Recepies").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
    
            recipe = doc.data();

            console.log(doc.data());

            $(".recipe-container").append(
            
            '<div>'+
                '<a href="recipe.html?id='+doc.id+'">'+
                '<div class="image-recipe" style="background-image: url('+ recipe.recipePhoto +')"></div>'+
                '<div class="description">'+
                  '<div class="recipe-info">'+
                    '<h3 class="recipe_name">'+recipe.recipeName+'</h3>'+
                    '<p class="recipe_author">Made by '+ recipe.author +'</p>'+
                  '</div>'+
                  '<div class="recipe-details">'+
                    '<div class="recipe-difficulty">'+
                        '<img class="detail_image" src="img/difficulty.png"/>'+
                        '<p class="detail_text">'+ recipe.difficulty +'</p>'+
                    '</div>'+
                    '<div class="recipe-time">'+
                        '<img class="detail_image" src="img/time.png" />'+
                        '<p class="detail_text">'+ recipe.time +'</p>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '</a>'+
            '</div>'
            );
    
            
        });
      });


      

     

});