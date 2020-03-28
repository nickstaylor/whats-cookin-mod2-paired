console.log('Hello world');

let mainSection = document.querySelector('.main-recipe-card-container')
let searchBox = document.querySelector('.search-input')

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



let displayRecipes = (recipeData) => {

  recipeData.forEach(recipe => {
      let singleRecipe = new Recipe(recipe)
      allRecipes.push(singleRecipe)
      console.log(allRecipes);
    mainSection.insertAdjacentHTML("afterbegin",`
    <div class="recipe-container tilt-in-top-1">
      <img class="recipe-image" src="${singleRecipe.image}" alt="">
      <h2>${singleRecipe.name}</h2>
      <div class="recipe-nav">
        <button id="${singleRecipe.id}" type="button" name="button">View Recipe</button>
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



searchBox.addEventListener("keyup", executeSearch);

welcomeTheUser();
displayRecipes(recipeData);
