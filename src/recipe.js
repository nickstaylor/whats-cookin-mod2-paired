let rawIngredientsData = require('../data/ingredients')

class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image
    this.ingredients = this.generateFullIngredientList(recipe.ingredients)
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
    this.isFavorited = false;
  }

  calculateCostOfIngredientsNeeded(){
  // takes all new ingredients that were needed to complete a recipe and calculates the total cost
  }

  generateFullIngredientList(partialIngredients) {
    return partialIngredients.map(ingredient => {
      let matchedIngredient = rawIngredientsData.find(rawIngredient =>{
      return ingredient.id === rawIngredient.id
      })
      return {name:matchedIngredient.name,
              id: ingredient.id,
              amount: ingredient.quantity.amount,
              unit: ingredient.quantity.unit,
              estimatedCostInCents: matchedIngredient.estimatedCostInCents
            };

      })
    }










}

module.exports = Recipe;
