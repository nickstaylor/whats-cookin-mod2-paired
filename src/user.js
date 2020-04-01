if(typeof module !== 'undefined') {
  Pantry = require('../src/pantry')
}

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



  filterMyRecipesByTag(userRecipes, tag) {
    return userRecipes.filter(recipe => {
      return recipe.tags.includes(tag)
    })
  }
}



if (typeof module !== 'undefined') {
  module.exports = User;
}
