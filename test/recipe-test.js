const chai = require('chai');
const expect = chai.expect;

const Recipe = require('../src/recipe');

const recipeData = require('../data/recipes');
let rawIngredientsData = require('../data/ingredients')

describe('Recipe Class', function(){
  let singleRecipe;
  let recipe;

  beforeEach(function(){
    singleRecipe = recipeData[0]
    recipe = new Recipe(singleRecipe);
  });

  it('should be a function', function(){
    expect(Recipe).to.be.a('function')
  });

  it('should be an instance of Recipe', function(){
    expect(recipe).to.be.an.instanceof(Recipe)
  });

  it('should initilize with an ID', function(){
    expect(recipe.id).to.eq(595736);
  });

  it('should initialize with a recipe image', function(){
    expect(recipe.image).to.eq(singleRecipe.image);
  });

  it.skip('should initialize with an array of ingredients', function(){
    expect(recipe.ingredients).to.deep.eq(singleRecipe.ingredients);
    // console.log(singleRecipe.ingredients)
  });

  it('should initialize with an array of instructions', function(){
    expect(recipe.instructions).to.deep.eq(singleRecipe.instructions)
  });

  it('should initialize with a name', function(){
    expect(recipe.name).to.eq("Loaded Chocolate Chip Pudding Cookie Cups");
  });

  it('should initialize with tags', function(){
    expect(recipe.tags).to.deep.eq([
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
    ])
  });

  it('should start off as not favorited', function(){
    expect(recipe.isFavorited).to.eq(false);
  });

describe('Generate a full ingredients list method', function(){

  it('should build a full ingredients list', function(){
    expect(recipe.ingredients).to.deep.eq([
  {
    name: 'wheat flour',
    id: 20081,
    amount: 1.5,
    unit: 'c',
    estimatedCostInCents: 142,
    totalCost: 2.13
  },
  {
    name: 'bicarbonate of soda',
    id: 18372,
    amount: 0.5,
    unit: 'tsp',
    estimatedCostInCents: 582,
    totalCost: 2.91
  },
  {
    name: 'eggs',
    id: 1123,
    amount: 1,
    unit: 'large',
    estimatedCostInCents: 472,
    totalCost: 4.72
  },
  {
    name: 'sucrose',
    id: 19335,
    amount: 0.5,
    unit: 'c',
    estimatedCostInCents: 902,
    totalCost: 4.51
  },
  {
    name: 'instant vanilla pudding',
    id: 19206,
    amount: 3,
    unit: 'Tbsp',
    estimatedCostInCents: 660,
    totalCost: 19.8
  },
  {
    name: 'brown sugar',
    id: 19334,
    amount: 0.5,
    unit: 'c',
    estimatedCostInCents: 559,
    totalCost: 2.79
  },
  {
    name: 'salt',
    id: 2047,
    amount: 0.5,
    unit: 'tsp',
    estimatedCostInCents: 280,
    totalCost: 1.4
  },
  {
    name: 'fine sea salt',
    id: 1012047,
    amount: 24,
    unit: 'servings',
    estimatedCostInCents: 528,
    totalCost: 126.72
  },
  {
    name: 'semi sweet chips',
    id: 10019903,
    amount: 2,
    unit: 'c',
    estimatedCostInCents: 253,
    totalCost: 5.06
  },
  {
    name: 'unsalted butter',
    id: 1145,
    amount: 0.5,
    unit: 'c',
    estimatedCostInCents: 617,
    totalCost: 3.08
  },
  {
    name: 'vanilla',
    id: 2050,
    amount: 0.5,
    unit: 'tsp',
    estimatedCostInCents: 926,
    totalCost: 4.63
  }
]);
  })
})

describe('changeFavoriteStatus Method', function(){

  it('should toggle favorite status', function(){
    expect(recipe.isFavorited).to.eq(false)
    recipe.changeFavoriteStatus()
    expect(recipe.isFavorited).to.eq(true)
    recipe.changeFavoriteStatus()
    expect(recipe.isFavorited).to.eq(false)
  });

});



});
