let mainSection = document.querySelector('.main-recipe-card-container')
let searchBox = document.querySelector('.search-input')
var bodyContainer = document.querySelector('body');
let favoriteBtn = document.querySelector("add-recipe-to-favorite-btn");
let allRecipes = [];
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
    displayRecipes(allRecipes);
  } else if (event.target.classList.contains("add-recipe-to-favorite-btn")) {
    changeBtnColor(event)
    addRecipeToFavorites(event);
  } else if (event.target.id === 'favorites-btn') {
    displayFavoriteRecipes()
  }
}


const changeBtnColor = (event) => {
  if(event.target.style.color !== "green") {
    event.target.style.color = "green"
  } else {
    event.target.style.color = "#1D9AF2"
  }
}

const displayFavoriteRecipes = () => {
  mainSection.innerHTML = " ";
  user.favoriteRecipes.forEach(recipe => {
    if(recipe.isFavorited === true) {
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
    }
    let favoriteBtn = document.querySelector('.add-recipe-to-favorite-btn')
    favoriteBtn.style.color = "green";
  });
}


let displayUserPantry = () => {
  mainSection.innerHTML = " ";
  let userMoney = 10000
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
  console.log(recipeTotalCost)
  console.log(ingredientsDisplayed);

  mainSection.insertAdjacentHTML("afterbegin", `
  <div class="pop-up-recipe-container">
    <section class="pop-up-top">
      <h2>${selectedRecipe.name}</h2>
      <button class="add-recipe-to-favorite-btn" id="${selectedRecipe.id}-view" type="button" name="button">+/- My Favorites</button>
      <button type="button" name="cook-recipe">Cook Recipe</button>
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
      <button class="check pantry" type="button" name="check-pantry">Check My Pantry</button>
    </section>
  </div>`)
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
    matchedRecipe.changeFavoriteStatus();
    console.log(user.favoriteRecipes);
  } else {
      favoritedRecipe.changeFavoriteStatus();
      updateRecepiesArray(favoritedRecipe)
      user.addToMyFavoriteRecipes(favoritedRecipe);
      // console.log(favoritedRecipe);
    }
}

const updateRecepiesArray = (favoritedRecipe) => {
    let matchedRecipe = allRecipes.find(recipe => {
     return recipe.id === favoritedRecipe.id
    })
    console.log("Favorited Recepie",favoritedRecipe);
    console.log(allRecipes);
    let value = allRecipes.indexOf(matchedRecipe)
    allRecipes[value] = favoritedRecipe;
    // console.log(value);
    // allRecipes.splice(value, 1, favoritedRecipe)
    // console.log(value);
    // console.log(favoritedRecipe);
    // console.log(allRecipes);
}


const fillUpRecipeArray = (recipeData) => {
  recipeData.forEach(recipe => {
    let singleRecipe = new Recipe(recipe)
    allRecipes.push(singleRecipe);
  });
}

let displayRecipes = (allRecipes) => {
  mainSection.innerHTML = " ";
  allRecipes.forEach(recipe => {
    // debugger
    if(recipe.isFavorited === true) {
        mainSection.insertAdjacentHTML("afterbegin",`
        <div class="recipe-container tilt-in-top-1">
          <img class="recipe-image" src="${recipe.image}" alt="">
          <h2>${recipe.name}</h2>
          <div class="recipe-nav">
            <button class="view-recipe" id="${recipe.id}-view" type="button" name="button">View Recipe</button>
            <button class="add-recipe-to-favorite-btn" id="${recipe.id}-favorite" type="button" name="button">+/- My Favorites</button>
            <button type="button" name="button">+/- Recipes to Cook</button>
          </div>
        </div>
        `);
      let favoriteBtn = document.querySelector('.add-recipe-to-favorite-btn')
      favoriteBtn.style.color = "green";
    } else {
      mainSection.insertAdjacentHTML("afterbegin",`
      <div class="recipe-container tilt-in-top-1">
        <img class="recipe-image" src="${recipe.image}" alt="">
        <h2>${recipe.name}</h2>
        <div class="recipe-nav">
          <button class="view-recipe" id="${recipe.id}-view" type="button" name="button">View Recipe</button>
          <button class="add-recipe-to-favorite-btn" id="${recipe.id}-favorite" type="button" name="button">+/- My Favorites</button>
          <button type="button" name="button">+/- Recipes to Cook</button>
        </div>
      </div>
      `);
    }
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
fillUpRecipeArray(recipeData)
displayRecipes(allRecipes);
