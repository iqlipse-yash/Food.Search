const searchbox = document.querySelector('.searchbox');
const searchbtn = document.querySelector('.searchbtn');
const recipecontainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeclosebtn = document.querySelector('.recipe-close-btn');


//function to get recipes
const fetchRecipes = async (query) => {
    recipecontainer.innerHTML = "<h2>fetching recipess...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipecontainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        //adding eventlistner to recipe
        button.addEventListener('click', ()=>{
            openRecipePopup(meal);
        });

        recipecontainer.appendChild(recipeDiv);
    });
}

const fetchIngredients = (meal) => {
    let ingredient = "";
    for (let i =1;i<=20;i++){
        const ingredients = meal[`strIngredient${i}`];
        if(ingredients){
            const measure = meal[`strMeasure${i}`];
            ingredientsList +=`<li>${measure}${ingredient}</li>`
        }
        else{
            break;
        }
        return ingredientsList;
    }
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <h3>Ingredients</h3>
    `
    recipeDetailsContent.parentElement.style.display = "block";

}

searchbtn.addEventListener('click' , (e) => {
    e.preventDefault();
    const searchInput = searchbox.value.trim();
    fetchRecipes(searchInput);
});