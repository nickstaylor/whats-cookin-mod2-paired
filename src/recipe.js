let rawIngredientsDataRecipe;
if (typeof module !== 'undefined') {
  rawIngredientsDataRecipe = require('../data/ingredients')
} else {
  rawIngredientsDataRecipe = ingredientsData
}


class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = this.generateFullIngredientList(recipe.ingredients);
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
    this.isFavorited = false;
  }

  generateFullIngredientList(partialIngredients) {
    return partialIngredients.map(ingredient => {
      let matchedIngredient = rawIngredientsDataRecipe.find(rawIngredient => {
        return ingredient.id === rawIngredient.id
      })
      return {
        name: matchedIngredient.name,
        id: ingredient.id,
        amount: ingredient.quantity.amount,
        unit: ingredient.quantity.unit,
        estimatedCostInCents: matchedIngredient.estimatedCostInCents,
        totalCost: Number(((matchedIngredient.estimatedCostInCents * .01) *
          ingredient.quantity.amount).toFixed(2))
      };

    })
  }

  changeFavoriteStatus() {
    this.isFavorited = !this.isFavorited
  }


}


if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
