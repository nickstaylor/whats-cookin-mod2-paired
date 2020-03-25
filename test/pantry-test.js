const chai = require('chai');
const expect = chai.expect;

const Pantry = require('../src/pantry');

let userPantryIngredients = [
  {
    "ingredient": 11477,
    "amount": 4
  },
  {
    "ingredient": 11297,
    "amount": 4
  },
  {
    "ingredient": 1082047,
    "amount": 10
  },
  {
    "ingredient": 20081,
    "amount": 5
  },
  {
    "ingredient": 11215,
    "amount": 5
  }
];

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

describe('Pantry', function(){

  it('should be a function', function(){
    expect(Pantry).to.be.a("function");
  });
  it('should be an instance of Pantry', function(){
    const pantry = new Pantry(listOfIngredients);
    expect(pantry).to.be.an.instanceof(Pantry);

  })


});
