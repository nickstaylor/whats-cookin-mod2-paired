let rawIngredientsData = ingredientsData !== undefined ? ingredientsData : require('../data/ingredients')

class Pantry {
  constructor(ingredients) {
    this.ingredients = this.generateFullIngredientList(ingredients);
  }

  generateFullIngredientList(partialIngredients) {
      return partialIngredients.map(ingredient => {

      let mathedIngredient = rawIngredientsData.find(rawIngredient =>{
          return ingredient.ingredient === rawIngredient.id
        })

        return {name:mathedIngredient.name,
                id: mathedIngredient.id,
                estimatedCostInCents: mathedIngredient.mathedIngredient,
                amount: ingredient.amount
              };
    })
  }

}

module.exports = Pantry
