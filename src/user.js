const Pantry = require('../src/pantry');
let rawIngredientsData = require('../data/ingredients')

class User {
  constructor(user, rawIngredientsData) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = new Pantry(user.pantry, rawIngredientsData);
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }


  addToMyFavoriteRecipes(recipe) {
    this.favoriteRecipes.push(recipe);
  }



  filterMyRecipesByTag(array, tag){
        let foundRecipe;
        array.forEach(recipe=>{
         recipe.tags.includes(tag) ? foundRecipe = recipe : null;
      })
      return foundRecipe
  }

}







module.exports = User;
