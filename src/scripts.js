let mainSection = document.querySelector('.main-recipe-card-container')
let searchBox = document.querySelector('.search-input')
var bodyContainer = document.querySelector('body');
let allRecipes = [];
let userMoney = 1000
let seeInstructionsAgain = false;
// let purchaseItemsToCook = false;
let randomNumber = ((Math.ceil(Math.random() * 49)));
const user = new User(usersData[randomNumber], ingredientsData)
let userName = document.querySelector('.user-name')
console.log(user);


let welcomeTheUser = () => {
  let userFullName = `${user.name}`
  let userFirstName = userFullName.split(" ").shift();
  userName.insertAdjacentHTML("afterbegin", `Hi <span class= "first-name">${userFirstName}!</span> What's Cookin?`);
}


let eventHandler = (event)=>{
  let target = event.target.classList
  if (target.contains('view-recipe')){
    displayRecipeDetails()
  } else if (event.target.id ==='pantry-btn'){
    displayUserPantry();
  } else if(target.contains("all-recipes-btn")) {
    displayRecipes(recipeData);
  } else if (event.target.classList.contains("add-recipe-to-favorite-btn")) {
    addRecipeToFavorites(event);
  } else if (event.target.id === 'favorites-btn') {
    displayFavoriteRecipes()
  } else if (target.contains('cook-recipe')) {
    checkPantryIngredients()
  } else if (target.contains('instructions-again')){
    seeInstructionsAgain = true
    unhideInstructions();
  } else if (target.contains('purchase-items')){
    // seeInstructionsAgain = false
    unhideInstructions()
  }
}

const checkPantryIngredients = () => {
  let checkPantrySection = document.querySelector('.pop-up-recipe-bottom');
  checkPantrySection.innerHTML = "";
  let missingIngredients = [];
  let partialIngredients = [];
  let idOfClickedRecipe = event.target.id.split("-")[0];
  let selectedRecipe = allRecipes.find(recipe=>{
    return recipe.id === Number(idOfClickedRecipe)
  })
  console.log('UserPantry:' + user.pantry.ingredients.length)
  console.log('RecipeIngredients:' + selectedRecipe.ingredients.length);
  console.log(selectedRecipe.ingredients);

  //make this its own function
  // compareLikeIngredients(selectedRecipe.ingredients)

  selectedRecipe.ingredients.forEach(recipe=>{
    user.pantry.ingredients.forEach(user=>{
      if (user.id === recipe.id && user.amount < recipe.amount) {
        console.log(user.name + " userAmount: "+ user.amount)
        console.log(recipe.name + " recipeAmount: "+ recipe.amount)
        partialIngredients.push({id: user.id,
        name: user.name,
        amountNeeded: recipe.amount - user.amount,
        totalCost: (recipe.estimatedCostInCents * (recipe.amount - user.amount)) * .01})
      }
    })
  })


  ///functionCompareLikeIngredients(array1, array2)
  let userPantry = user.pantry.ingredients
  let recipePantry = selectedRecipe.ingredients
  if (selectedRecipe.ingredients.length > user.pantry.ingredients.length){
      selectedRecipe.ingredients.forEach(recipe=>{
      user.pantry.ingredients.forEach(ingredient=>{
        if (ingredient.id == recipe.id){
      console.log(ingredient.id)
      console.log(recipe.id)
        const value = selectedRecipe.ingredients.indexOf(recipe)
        selectedRecipe.ingredients.splice(value, 1)
        }
    })
  })} else {
      user.pantry.ingredients.forEach(ingredient=>{
      selectedRecipe.ingredients.forEach(recipe=>{
        if (ingredient.id == recipe.id){
      console.log(ingredient.id)
      console.log(recipe.id)
        const value = selectedRecipe.ingredients.indexOf(recipe)
        selectedRecipe.ingredients.splice(value, 1)
        }
      })
    })
  }
  missingIngredients.push.apply(missingIngredients,selectedRecipe.ingredients)
  displayPantryRecipeInfo(missingIngredients, partialIngredients, selectedRecipe)
}



const displayPantryRecipeInfo = (missingIngredients, partialIngredients, selectedRecipe) =>{
  let checkPantrySection = document.querySelector('.pop-up-recipe-bottom');
  checkPantrySection.innerHTML = "";
  let costSection = document.querySelector('.instructions-list');
  costSection.innerHTML = "";

  if (missingIngredients.length === 0 && partialIngredients.length === 0){

    checkPantrySection.insertAdjacentHTML("afterbegin", `
    <h4>You have all of the ingredients! Enjoy Cooking!</h4> `)
  } else {

    let neededIngredients = '<ol>'
    missingIngredients.forEach(ingredient=>{
      neededIngredients = neededIngredients + '<li>' + ingredient.name + ' <b>Cost</b>: $' +
       Number(((ingredient.estimatedCostInCents*.01)*
       ingredient.amount).toFixed(2)) + '</li>'
    });
    neededIngredients = neededIngredients + '</ol>';
    console.log(neededIngredients)


    costSection.insertAdjacentHTML("afterbegin", `
    <section class ="cost-list">
    <h2>Great! You only need a few things:</h2>
     ${neededIngredients}
      </section>`)
      checkPantrySection.insertAdjacentHTML("afterbegin", `
        <h4>You have $${userMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} to purchase.</h4>
        <button class="purchase-items" id="${selectedRecipe.id}-view" type="button" name="purchase-items">Purchase Items</button>
        <button class="instructions-again" id="${selectedRecipe.id}-view" type="button" name="instructions-again">See Instructions Again</button>
      `)
  console.log(missingIngredients)
  console.log(partialIngredients)
  console.log(selectedRecipe)
  }

}

const unhideInstructions = () => {

  let costSection = document.querySelector('.instructions-list')
  costSection.innerHTML = ""
  let checkPantrySection = document.querySelector('.pop-up-recipe-bottom')
  checkPantrySection.innerHTML = ""
  let idOfClickedRecipe = event.target.id.split("-")[0];
  let selectedRecipe = allRecipes.find(recipe=>{
    return recipe.id === Number(idOfClickedRecipe)
  })
  let instructionsDisplayed = '<ol>'
  selectedRecipe.instructions.forEach(instruction=>{
    instructionsDisplayed = instructionsDisplayed + '<li class="pop-up-instructions">' +
    instruction.instruction + '</li>'
  });
  instructionsDisplayed = instructionsDisplayed + '</ol>'

    costSection.insertAdjacentHTML("afterbegin", `
    <h2>Recipe Instructions</h2>
    ${instructionsDisplayed}
  </section>
  `)

  if (seeInstructionsAgain === true){
    checkPantrySection.insertAdjacentHTML("afterbegin", `
    <h4>Does your pantry have all the ingredients?</h4>
    <button class="cook-recipe" id="${selectedRecipe.id}-view"
    type="button" name="cook-recipce">Cook Recipe!</button>
    `)
  } else { //enter in cost amount here and enjoy cokking message
    checkPantrySection.insertAdjacentHTML("afterbegin", `
    <h4>Let's Cook!</h4>
    `)
  }
  seeInstructionsAgain = false;
}


const displayFavoriteRecipes = () => {
  mainSection.innerHTML = " ";
  user.favoriteRecipes.forEach(recipe => {
  mainSection.insertAdjacentHTML("afterbegin",`
    <div class="recipe-container tilt-in-top-1">
      <img class="recipe-image" src="${recipe.image}" alt="">
      <h2>${recipe.name}</h2>
      <div class="recipe-nav">
        <button class="view-recipe" id="${recipe.id}-view" type="button" name="button">View Recipe</button>
        <button class= "add-recipe-to-favorite-btn" id="${recipe.id}-favorite" type="button" name="button">+/- My Favorites</button>
        <button type="button" name="button">+/- Recipes to Cook</button>
      </div>
    </div>
    `);
  });
}


let displayUserPantry = () => {
  mainSection.innerHTML = " ";
  let userFullName = `${user.name}`
  let userFirstName = userFullName.split(" ").shift();
  mainSection.insertAdjacentHTML("afterbegin", `
  <h1 class="pantry-headline">Hi <span class="first-name">${userFirstName}!</span>
    You have <span class="user-money">
    $${userMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> to
    buy more groceries. Cook it up!</h1>`)

  user.pantry.ingredients.forEach(ingredient => {
    mainSection.insertAdjacentHTML("beforeend",`
    <div class="ingredient-container">
      <h2><span class="ingredient-span">Name: </span> ${ingredient.name}</h2>
      <h3><span class="ingredient-span">Quantity: </span> ${ingredient.amount}</h3>
    </div>
    `);
  });
}


let displayRecipeDetails = () => {
  let idOfClickedRecipe = event.target.id.split("-")[0];
  mainSection.innerHTML = " ";
  let selectedRecipe = allRecipes.find(recipe=>{
    return recipe.id === Number(idOfClickedRecipe)
  })
  console.log(selectedRecipe)
  let instructionsDisplayed = '<ol>'
  selectedRecipe.instructions.forEach(instruction=>{
    instructionsDisplayed = instructionsDisplayed + '<li class="pop-up-instructions">' +
    instruction.instruction + '</li>'
  });
  instructionsDisplayed = instructionsDisplayed + '</ol>';

  let ingredientsDisplayed = '<ul>'
  let recipeTotalCost = 0;
  selectedRecipe.ingredients.forEach(ingredient=>{
    recipeTotalCost += ingredient.totalCost
    ingredientsDisplayed = ingredientsDisplayed + '<li class="pop-up-ingredients">' +
    Number(ingredient.amount.toFixed(2)) + ingredient.unit + ' ' + ingredient.name +
    '. Total cost: $' + ingredient.totalCost + '</li>'
  });
  ingredientsDisplayed = ingredientsDisplayed + '</ul>';
  console.log(Number(recipeTotalCost.toFixed(2)))

  mainSection.insertAdjacentHTML("afterbegin", `
  <div class="pop-up-recipe-container">
    <section class="pop-up-top">
      <h2>${selectedRecipe.name}</h2>
      <button class="pop-up-fav-btn add-recipe-to-favorite-btn" id="${selectedRecipe.id}-view" type="button" name="button">+/- My Favorites</button>
    </section>
    <section class="ingred-image-box">
      <img class ="full-recipe-img" src="${selectedRecipe.image}"
       alt="${selectedRecipe.name}" />
       <h3>Ingredients</h3>
      <div class="ingredients-list">
        ${ingredientsDisplayed}
      <h3>Recipe Total Cost: $${Number(recipeTotalCost.toFixed(2))}.</h3>
      </div>
    </section>
    <section class="instructions-list">
      <h2>Recipe Instructions</h2>
      ${instructionsDisplayed}
    </section>
    <section class ="pop-up-recipe-bottom">
      <h4>Does your pantry have all the ingredients?</h4>
      <button class="cook-recipe" id="${selectedRecipe.id}-view" type="button" name="cook-recipce">Cook Recipe!</button>
    </section>

  </div>`)
  return selectedRecipe
}

const addRecipeToFavorites = (event) => {
  let idOfClickedRecipe = event.target.id.split("-")[0];
  let favoritedRecipe = allRecipes.find( recipe => {
    return recipe.id === Number(idOfClickedRecipe);
  })
  let matchedRecipe = user.favoriteRecipes.find(favoriteRecipe => {
    return favoriteRecipe.id === favoritedRecipe.id
  })
  if(matchedRecipe) {
    user.removeFromMyFavoriteRecipes(matchedRecipe)
  } else {
      user.addToMyFavoriteRecipes(favoritedRecipe);
      console.log(user.favoriteRecipes);
    }
}



let displayRecipes = (recipeData) => {
  mainSection.innerHTML = " "
  recipeData.forEach(recipe => {
      let singleRecipe = new Recipe(recipe)
      allRecipes.push(singleRecipe);
    mainSection.insertAdjacentHTML("afterbegin",`
    <div class="recipe-container tilt-in-top-1">
      <img class="recipe-image" src="${singleRecipe.image}" alt="">
      <h2>${singleRecipe.name}</h2>
      <div class="recipe-nav">
        <button class="view-recipe" id="${singleRecipe.id}-view" type="button" name="button">View Recipe</button>
        <button class="add-recipe-to-favorite-btn" id="${singleRecipe.id}-favorite" type="button" name="button">+/- My Favorites</button>
        <button type="button" name="button">+/- Recipes to Cook</button>
      </div>
    </div>
    `);
  });
}

 const executeSearch = () => {
   let filter = searchBox.value.toUpperCase();
   let recipeName = [...document.getElementsByTagName('h2')]

   recipeName.forEach(name => {

     if(name.innerText.toUpperCase().indexOf(filter) > -1) {
     name.parentElement.closest('.recipe-container').style.display = "";
   } else {
     name.closest('.recipe-container').style.display = 'none';
   }

 });

};


bodyContainer.addEventListener('click', eventHandler);
searchBox.addEventListener("keyup", executeSearch);

welcomeTheUser();
displayRecipes(recipeData);
