let mainSection = document.querySelector('.main-recipe-card-container')
let searchBox = document.querySelector('.search-input')
var bodyContainer = document.querySelector('body');
let favoriteBtn = document.querySelector("add-recipe-to-favorite-btn");
let searchByTagField = document.querySelector('#tags');
let enterBtn = document.querySelector('#enter')
let navBar = document.querySelector('#nav-bar')
let allRecipes = [];
let userMoney = 10000
let totalCost = 0;
let seeInstructionsAgain = false;
let randomNumber = ((Math.ceil(Math.random() * 49)));
const user = new User(usersData[randomNumber], ingredientsData)

let userName = document.querySelector('.user-name')


let welcomeTheUser = () => {
  let userFullName = `${user.name}`
  let userFirstName = userFullName.split(" ").shift();
  userName.insertAdjacentHTML("afterbegin", `Hi <span class= "first-name">${userFirstName}!</span> What's Cookin?`);
}


let eventHandler = (event) => {
  let target = event.target.classList
  if (target.contains('view-recipe')) {
    displayRecipeDetails()
  } else if (event.target.id === 'pantry-btn') {
    displayUserPantry();
  } else if (target.contains("all-recipes-btn")) {
    displayRecipes(allRecipes);
  } else if (event.target.classList.contains("add-recipe-to-favorite-btn")) {
    changeBtnColor(event)
    addRecipeToFavorites(event);
  } else if (event.target.id === 'favorites-btn') {
    displayFavoriteRecipes()
  } else if (event.target.id === "enter") {
    enterSite()
  } else if (target.contains('cook-recipe')) {
    checkPantryIngredients()
  } else if (target.contains('instructions-again')) {
    seeInstructionsAgain = true
    unhideInstructions();
  } else if (target.contains('purchase-items')) {
    unhideInstructions()
  } else if (target.contains('close-recipe')) {
    displayRecipes(recipeData);
  }
}


const enterSite = () => {
  let welcomeBanner = document.querySelector('.welcome-banner')
  welcomeBanner.classList.add('hidden');
  navBar.classList.remove("hidden");
  displayRecipes(allRecipes);
}


const changeBtnColor = (event) => {
  if (event.target.style.color !== "green") {
    event.target.style.color = "green"
  } else {
    event.target.style.color = "#1D9AF2"
  }
};


const findUniqueIngredients = (recipeIngredients, userIngredients) => {
  return recipeIngredients.reduce((partialIngredients, recipeIngredient) => {
    userIngredients.forEach(userIngredient => {
      if (userIngredient.id === recipeIngredient.id && userIngredient.amount < recipeIngredient.amount) {
        partialIngredients.push({
          id: userIngredient.id,
          name: userIngredient.name,
          amountNeeded: recipeIngredient.amount - userIngredient.amount,
          totalCost: (recipeIngredient.estimatedCostInCents * (recipeIngredient.amount - userIngredient.amount)) * .01
        })
      }
    })
    return partialIngredients
  }, [])
}

const compareLikeIngredients = (recipeIngredients, userIngredients) => {
  recipeIngredients.forEach(recipeIngredient => {
    userIngredients.forEach(userIngredient => {
      if (userIngredient.id == recipeIngredient.id) {
        console.log(userIngredient.id)
        console.log(recipeIngredient.id)
        const value = recipeIngredients.indexOf(recipeIngredient)
        recipeIngredients.splice(value, 1)
      }
    })
  })
  return recipeIngredients
}

const checkPantryIngredients = () => {
  let checkPantrySection = document.querySelector('.pop-up-recipe-bottom');
  checkPantrySection.innerHTML = "";
  let missingIngredients = [];
  let partialIngredients = [];
  let idOfClickedRecipe = event.target.id.split("-")[0];
  let selectedRecipe = allRecipes.find(recipe => {
    return recipe.id === Number(idOfClickedRecipe)
  })
  console.log('UserPantry:' + user.pantry.ingredients.length)
  console.log('RecipeIngredients:' + selectedRecipe.ingredients.length);
  console.log(selectedRecipe.ingredients);

  let recipeIngredients = selectedRecipe.ingredients;
  let userIngredients = user.pantry.ingredients

  findUniqueIngredients(recipeIngredients, userIngredients)
  compareLikeIngredients(recipeIngredients, userIngredients)
  missingIngredients = [...missingIngredients, ...recipeIngredients]
  displayPantryRecipeInfo(missingIngredients, partialIngredients, selectedRecipe)
}



const displayPantryRecipeInfo = (missingIngredients, partialIngredients, selectedRecipe) => {
  let checkPantrySection = document.querySelector('.pop-up-recipe-bottom');
  checkPantrySection.innerHTML = "";
  let costSection = document.querySelector('.instructions-list');


  if (missingIngredients.length === 0 && partialIngredients.length === 0) {
    checkPantrySection.insertAdjacentHTML("afterbegin", `
    <h4>You have all of the ingredients! Enjoy Cooking!</h4> `)
  } else {
    costSection.innerHTML = "";
    let neededIngredients = '<ol>'
    missingIngredients.forEach(ingredient => {
      totalCost += Number(((ingredient.estimatedCostInCents * .01) *
        ingredient.amount).toFixed(2))
      neededIngredients = neededIngredients + '<li>' + ingredient.name + ' <b>Cost</b>: $' +
        Number(((ingredient.estimatedCostInCents * .01) *
          ingredient.amount).toFixed(2)) + '</li>';
      console.log(totalCost)
    });
    partialIngredients.forEach(ingredient => {
      console.log(totalCost)
      totalCost += ingredient.totalCost
      neededIngredients = neededIngredients + '<li>' + ingredient.name + ' <b>Cost</b>: $' +
        ingredient.totalCost + '</li>'
      neededIngredients = neededIngredients + '</ol>';
    });
    console.log(neededIngredients)
    console.log(totalCost);

    userMoney = Number(userMoney.toFixed(2));
    costSection.insertAdjacentHTML("afterbegin", `
    <section class ="cost-list">
    <h2>Great! You only need a few things:</h2>
     ${neededIngredients}
     <h2><b>Total Cost</b>: ${Number(totalCost.toFixed(2))}</h2>
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
  let selectedRecipe = allRecipes.find(recipe => {
    return recipe.id === Number(idOfClickedRecipe)
  })
  let instructionsDisplayed = '<ol>'
  selectedRecipe.instructions.forEach(instruction => {
    instructionsDisplayed = instructionsDisplayed + '<li class="pop-up-instructions">' +
      instruction.instruction + '</li>'
  });
  instructionsDisplayed = instructionsDisplayed + '</ol>'

  costSection.insertAdjacentHTML("afterbegin", `
    <h2>Recipe Instructions</h2>
    ${instructionsDisplayed}
  </section>
  `)

  if (seeInstructionsAgain === true) {
    checkPantrySection.insertAdjacentHTML("afterbegin", `
    <h4>Does your pantry have all the ingredients?</h4>
    <button class="cook-recipe" id="${selectedRecipe.id}-view"
    type="button" name="cook-recipe">Cook Recipe!</button>
    `)
  } else {
    let moneyBalance = Number(userMoney.toFixed(2)) - Number(totalCost.toFixed(2))
    moneyBalance = Number(moneyBalance.toFixed(2));
    checkPantrySection.insertAdjacentHTML("afterbegin", `
    <h2>You have <span class="user-money">$${moneyBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> remaining in your account.  Let's Cook!</h2>
    `)

  }
  seeInstructionsAgain = false;
  userMoney = userMoney - totalCost;
  totalCost = 0
}


const displayFavoriteRecipes = () => {
  mainSection.innerHTML = " ";
  user.favoriteRecipes.forEach(recipe => {
    if (recipe.isFavorited === true) {
      mainSection.insertAdjacentHTML("afterbegin", `
    <div class="recipe-container tilt-in-top-1">
      <img class="recipe-image" src="${recipe.image}" alt="">
      <h2>${recipe.name}</h2>
      <div class="recipe-nav">
        <button class="view-recipe" id="${recipe.id}-view" type="button" name="button">View Recipe</button>
        <button class= "add-recipe-to-favorite-btn" id="${recipe.id}-favorite" type="button" name="button">+/- My Favorites</button>
      </div>
    </div>
    `);
    }
    let favoriteBtn = document.querySelector('.add-recipe-to-favorite-btn')
    favoriteBtn.style.color = "green";
  });
}


const searchByTag = () => {
  let selectedTag = searchByTagField.value
  let matchedRecipes = user.filterMyRecipesByTag(allRecipes, selectedTag);
  displayRecipes(matchedRecipes)
}


let displayUserPantry = () => {
  console.log(userMoney)
  mainSection.innerHTML = " ";
  let userFullName = `${user.name}`
  let userFirstName = userFullName.split(" ").shift();
  userMoney = Number(userMoney.toFixed(2))
  mainSection.insertAdjacentHTML("afterbegin", `
  <h1 class="pantry-headline">Hi <span class="first-name">${userFirstName}!</span>
    You have <span class="user-money">
    $${userMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> to
    buy more groceries. Cook it up!</h1>`)

  user.pantry.ingredients.forEach(ingredient => {
    mainSection.insertAdjacentHTML("beforeend", `
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
  let selectedRecipe = allRecipes.find(recipe => {
    return recipe.id === Number(idOfClickedRecipe)
  })
  let instructionsDisplayed = '<ol>'
  selectedRecipe.instructions.forEach(instruction => {
    instructionsDisplayed = instructionsDisplayed + '<li class="pop-up-instructions">' +
      instruction.instruction + '</li>'
  });
  instructionsDisplayed = instructionsDisplayed + '</ol>';

  let ingredientsDisplayed = '<ul>'
  let recipeTotalCost = 0;
  selectedRecipe.ingredients.forEach(ingredient => {
    recipeTotalCost += ingredient.totalCost
    ingredientsDisplayed = ingredientsDisplayed + '<li class="pop-up-ingredients">' +
      Number(ingredient.amount.toFixed(2)) + ingredient.unit + ' ' + ingredient.name +
      '. <b>Total cost</b>: $' + ingredient.totalCost + '</li>'
  });
  ingredientsDisplayed = ingredientsDisplayed + '</ul>';
  console.log(Number(recipeTotalCost.toFixed(2)))

  mainSection.insertAdjacentHTML("afterbegin", `
  <div class="pop-up-recipe-container">
    <section class="pop-up-top">
      <h2>${selectedRecipe.name}</h2>
      <button class="pop-up-fav-btn add-recipe-to-favorite-btn" id="${selectedRecipe.id}-view" type="button" name="button">+/- My Favorites</button>
      <button class="close-recipe" id="${selectedRecipe.id}-view" type="button" name="close-recipe">Close Recipe</button>
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
}



const addRecipeToFavorites = (event) => {
  let idOfClickedRecipe = event.target.id.split("-")[0];
  let favoritedRecipe = allRecipes.find(recipe => {
    return recipe.id === Number(idOfClickedRecipe);
  })
  let matchedRecipe = user.favoriteRecipes.find(favoriteRecipe => {
    return favoriteRecipe.id === favoritedRecipe.id
  })
  if (matchedRecipe) {
    user.removeFromMyFavoriteRecipes(matchedRecipe)
    matchedRecipe.changeFavoriteStatus();
  } else {
    favoritedRecipe.changeFavoriteStatus();
    updateRecepiesArray(favoritedRecipe)
    user.addToMyFavoriteRecipes(favoritedRecipe);
  }
}

const updateRecepiesArray = (favoritedRecipe) => {
  let matchedRecipe = allRecipes.find(recipe => {
    return recipe.id === favoritedRecipe.id
  })
  let value = allRecipes.indexOf(matchedRecipe)
  allRecipes[value] = favoritedRecipe;
}

const fillUpRecipeArray = (recipeData) => {
  recipeData.forEach(recipe => {
    let singleRecipe = new Recipe(recipe)
    allRecipes.push(singleRecipe);
  });
}

let displayRecipes = (recipesArry) => {
  mainSection.innerHTML = " ";
  recipesArry.forEach(recipe => {
    if (recipe.isFavorited === true) {
      mainSection.insertAdjacentHTML("afterbegin", `
        <div class="recipe-container tilt-in-top-1">
          <img class="recipe-image" src="${recipe.image}" alt="">
          <h2>${recipe.name}</h2>
          <div class="recipe-nav">
            <button class="view-recipe" id="${recipe.id}-view" type="button" name="button">View Recipe</button>
            <button class="add-recipe-to-favorite-btn" id="${recipe.id}-favorite" type="button" name="button">+/- My Favorites</button>
          </div>
        </div>
        `);
      let favoriteBtn = document.querySelector('.add-recipe-to-favorite-btn')
      favoriteBtn.style.color = "green";
    } else {
      mainSection.insertAdjacentHTML("afterbegin", `
      <div class="recipe-container tilt-in-top-1">
        <img class="recipe-image" src="${recipe.image}" alt="">
        <h2>${recipe.name}</h2>
        <div class="recipe-nav">
          <button class="view-recipe" id="${recipe.id}-view" type="button" name="button">View Recipe</button>
          <button class="add-recipe-to-favorite-btn" id="${recipe.id}-favorite" type="button" name="button">+/- My Favorites</button>
        </div>`)
    }
  });
};

// let displayRecipes = (recipeData) => {
//   mainSection.innerHTML = " "
//   recipeData.forEach(recipe => {
//     let singleRecipe = new Recipe(recipe)
//     allRecipes.push(singleRecipe);
//     mainSection.insertAdjacentHTML("afterbegin", `
//     <div class="recipe-container tilt-in-top-1">
//       <img class="recipe-image" src="${singleRecipe.image}" alt="">
//       <h2>${singleRecipe.name}</h2>
//       <div class="recipe-nav">
//         <button class="view-recipe" id="${singleRecipe.id}-view" type="button" name="button">View Recipe</button>
//         <button class="add-recipe-to-favorite-btn" id="${singleRecipe.id}-favorite" type="button" name="button">+/- My Favorites</button>
//       </div>
//       `);
//   })
// }


const executeSearch = () => {
  let filter = searchBox.value.toUpperCase();
  let recipeName = [...document.getElementsByTagName('h2')]
  recipeName.forEach(name => {
    if (name.innerText.toUpperCase().indexOf(filter) > -1) {
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
