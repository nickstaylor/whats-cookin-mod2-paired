console.log('Hello world');

let mainSection = document.querySelector('.main-recipe-card-container')
let searchBox = document.querySelector('.search-input')
var bodyContainer = document.querySelector('body');


let randomNumber = ((Math.ceil(Math.random() * 49)));
console.log(randomNumber);


const user = new User(usersData[randomNumber], ingredientsData)
let userName = document.querySelector('.user-name')
console.log(user);

let allRecipes = [];

let welcomeTheUser = () => {
  let userFullName = `${user.name}`
  let userFirstName = userFullName.split(" ").pop();
  userName.insertAdjacentHTML("afterbegin", `Hi <span class= "first-name">${userFirstName}</span> What's Cookin?`);
}

let eventHandler = (event)=>{
  if (event.target.classList.contains('view-recipe')){
      mainSection.innerHTML = " ";

      //iterate over recipe DOM array, match ID of recipe button to recipe, do a find()
      //looking for the recipe, assign to a variable, call out variable properties  (ex: foundrecipe.name, etc)
      //
      mainSection.insertAdjacentHTML("afterbegin", `
      <div class="pop-up-recipe-container hidden">
          <img class ="full-recipe-img" src="https://spoonacular.com/recipeImages/595736-556x370.jpg" alt="dummy image" />
          <h2>Loaded Chocolate Chip Pudding Cookie Cups</h2>
            <section class="ingred-instructions">
              <div class="ingredients-list">
                <ul>
                  <li>1.5c wheat flour - total cost: $4.63</li>
                </ul>

              </div>
              <div class="instructions-list">
                <ol>
                  <li>1. In a large mixing bowl, whisk together the dry ingredients
                  (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of
                  a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar
                  and brown sugar and cream until light and fluffy.</li>
                </ol>
              </div>`)
  }
}


let displayRecipes = (recipeData) => {

  recipeData.forEach(recipe => {
      let singleRecipe = new Recipe(recipe)
      allRecipes.push(singleRecipe);
    mainSection.insertAdjacentHTML("afterbegin",`
    <div class="recipe-container tilt-in-top-1">
      <img class="recipe-image" src="${singleRecipe.image}" alt="">
      <h2>${singleRecipe.name}</h2>
      <div class="recipe-nav">
        <button class="view-recipe" id="${singleRecipe.id}" type="button" name="button">View Recipe</button>
        <button type="button" name="button">+/- My Favorites</button>
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
