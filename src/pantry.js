// let rawIngredientsData = ingredientsData !== undefined ? ingredientsData : require('../data/ingredients')
let listOfIngredients = [
  {
  "id": 11477,
  "name": "wheat flour",
  "estimatedCostInCents": 142
  },
  {
  "id": 18372,
  "name": "bicarbonate of soda",
  "estimatedCostInCents": 582
  },
  {
  "id": 20081,
  "name": "eggs",
  "estimatedCostInCents": 472
  },
  {
  "id": 19335,
  "name": "sucrose",
  "estimatedCostInCents": 902
  },
  {
  "id": 19206,
  "name": "instant vanilla pudding",
  "estimatedCostInCents": 660
  }
];
let rawIngredientsData = require('../data/ingredients')

class Pantry {
  constructor(userIngredients) {
    this.ingredients = this.generateFullIngredientList(userIngredients);
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
