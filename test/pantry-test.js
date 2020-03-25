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
    const pantry = new Pantry(userPantryIngredients);
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should generate full ingredients list', function(){
    const pantry = new Pantry(userPantryIngredients);
    expect(pantry.ingredients).to.be.deep.eq([
  {
    name: 'zucchini squash',
    id: 11477,
    estimatedCostInCents: 742,
    amount: 4
  },
  {
    name: 'flat leaf parsley leaves',
    id: 11297,
    estimatedCostInCents: 1030,
    amount: 4
  },
  {
    name: 'kosher salt',
    id: 1082047,
    estimatedCostInCents: 972,
    amount: 10
  },
  {
    name: 'wheat flour',
    id: 20081,
    estimatedCostInCents: 142,
    amount: 5
  },
  {
    name: 'whole garlic clove',
    id: 11215,
    estimatedCostInCents: 220,
    amount: 5
  }
]);


  })


});
