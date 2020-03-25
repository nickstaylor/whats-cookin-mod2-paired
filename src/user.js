const Pantry = require('../src/pantry')

class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = new Pantry(user.pantry);
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }


  addToMyFavoriteRecipes(recipe) {
    this.favoriteRecipes.push(recipe);
  }





}










module.exports = User;
