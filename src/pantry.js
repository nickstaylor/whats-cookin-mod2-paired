// let rawIngredientsData = ingredientsData !== undefined ? ingredientsData : require('../data/ingredients')

// let rawIngredientsData = require('../data/ingredients')

class Pantry {
  constructor(userIngredients) {
    this.ingredients = this.generateFullIngredientList(userIngredients);
  }

  generateFullIngredientList(partialIngredients) {
      return partialIngredients.map(ingredient => {

      let matchedIngredient = ingredientsData.find(rawIngredient =>{
          return ingredient.ingredient === rawIngredient.id
        })

        return {name:matchedIngredient.name,
                id: matchedIngredient.id,
                estimatedCostInCents: matchedIngredient.estimatedCostInCents,
                amount: ingredient.amount
              };
    })
  }

}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
