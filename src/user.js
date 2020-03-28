// const Pantry = require('../src/pantry');
// let ingredientsData = require('../data/ingredients')

class User {
  constructor(user, ingredientsData) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = new Pantry(user.pantry, ingredientsData);
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }


  addToMyFavoriteRecipes(recipe) {
    this.favoriteRecipes.push(recipe);
  }

  removeFromMyFavoriteRecipes(recipe) {
    let removedRecipe = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(removedRecipe, 1);
  }

  addToRecipesToCook(recipe) {
    this.recipesToCook.push(recipe);
  }



  filterMyRecipesByTag(userRecipes, tag){
    let foundRecipe;
    userRecipes.forEach(recipe=>{
     recipe.tags.includes(tag) ? foundRecipe = recipe : null;
   });
   return foundRecipe;
  }

}



if (typeof module !== 'undefined') {
  module.exports = User;
}
