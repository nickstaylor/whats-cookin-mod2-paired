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





}










module.exports = User;
