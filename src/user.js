class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }


  addToMyFavoriteRecipes(recipe) {
    this.favoriteRecipes.push(recipe);
  }





}










module.exports = User;
