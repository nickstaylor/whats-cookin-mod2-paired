let ingredientsData = require('../data/ingredients')

class Pantry {
  constructor(userIngredients) {
    this.ingredients = this.generateFullIngredientList(userIngredients);
  }

// do we have the ingrdients.  If we do have enough, great, then pull up
//instructions.  If we don't then we return what the user is lacking and cost.


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
