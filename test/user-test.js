const chai = require('chai');
const expect = chai.expect;

const User = require('../src/user');
const Recipe = require('../src/recipe');
const Pantry = require('../src/pantry');

// const userData = require('../data/users');
const recipeData = require('../data/recipes');
// const ingredients = require('../data/ingredients')

const singleUserData =
{
  "name": "Saige O'Kon",
  "id": 1,
  "pantry": [
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
  ]
};


const ingredients = [
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

describe('User', function(){
  let user;
  let userInfo;
  let recipe1;
  let recipe2;
  let pantry;

  beforeEach(function() {
    user = new User(singleUserData);
    // pantry = new Pantry(ingredients)
  })

  it('should be a function', function(){
    expect(User).to.be.a('function');
  });

  it('should be instance of User', function(){
    expect(user).to.be.an.instanceof(User);
  });

  it('should initialize with a name', function(){
    expect(user.name).to.equal('Saige O\'Kon')
  });

  it('should initialize with an id', function(){
    expect(user.id).to.equal(1);
  });

  it.skip('should initialize with a personal pantry', function(){
    console.log(user);
    expect(user.pantry).to.deep.equal()
  });

  it('should initilize with an empty favoriteRecipes', function(){
    expect(user.favoriteRecipes).to.deep.equal([]);
  });


  it('should start with empty recipes to cook', function(){
    expect(user.recipesToCook).to.deep.equal([])
  });


  describe('addToMyFavoriteRecipes Method', function(){

    it('should be able to add recipes to favoriteRecipes', function(){
      expect(user.favoriteRecipes.length).to.deep.eq(0);
      recipe1 = new Recipe(recipeData[0]);
      user.addToMyFavoriteRecipes(recipe1)
      expect(user.favoriteRecipes.length).to.deep.eq(1);
    });


  });


});
