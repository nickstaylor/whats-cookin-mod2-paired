const chai = require('chai');
const expect = chai.expect;

const Recipe = require('../src/recipe');

const recipeData = require('../data/recipes');

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


});
