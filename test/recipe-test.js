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


});
