// let rawIngredientsData = ingredientsData !== undefined ? ingredientsData : require('../data/ingredients')

let rawIngredientsData = require('../data/ingredients')

class Pantry {
  constructor(ingredients) {
    this.ingredients = this.generateFullIngredientList(ingredients);
  }

  generateFullIngredientList(partialIngredients) {
      return partialIngredients.map(ingredient => {

      let matchedIngredient = rawIngredientsData.find(rawIngredient =>{
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

module.exports = Pantry
