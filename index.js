import { recipesData } from './data.js';

const foodRadios = document.getElementById('Food-radios');
const recipesModallInner = document.getElementById('recipe-modal-inner');
const drinkModallInner = document.getElementById('drink-modal-inner');
const recipesModal = document.getElementById('Recipes-modal');
const drinksModal = document.getElementById('drink-modal');
const recipeModalCloseBtn = document.getElementById('recipe-modal-close-btn');
const drinkModalCloseBtn = document.getElementById('drink-modal-close-btn');
const getRecipesBtn = document.getElementById('get-Recipe-btn');
const main = document.querySelector('main');
const choixBox = document.querySelector('.choix-box');
const switchModeBtn = document.getElementById('theme-toggle-btn');
const switchModeText = document.getElementById('switch-mode-btn');
const addDrinkOption = document.getElementById('drink-only-option');

foodRadios.addEventListener('change', highlightCheckedOption);

recipeModalCloseBtn.addEventListener('click', closeAllModals)

drinkModalCloseBtn.addEventListener('click', closeDrinkModal)

getRecipesBtn.addEventListener('click', renderRecipes)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio');
    for (let radio of radios){
        radio.classList.remove('highlight');
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight');
}

function closeAllModals(){
    recipesModal.style.display = 'none';
    closeDrinkModal();
}
function closeDrinkModal(){
    if(addDrinkOption.checked){
        drinksModal.style.display = 'none';
    }
}
function renderRecipes(){
    const recipeObject = getSingleIngredientObject()
    if(recipeObject){
        recipesModallInner.innerHTML =  `
        <h2>${recipeObject.alt}</h2>
        <img 
        class="recipe-img" 
        src="./${recipeObject.image}"
        alt="${recipeObject.alt}"
        >
        <div class="ingredients-holder">
            <span>Ingredients</span><br>
            <div class="Ingredients">
                ${recipeObject.madeOf}
            </div>
        </div>
        <div class="recipe-holder">
            <span>Recipe</span><br>
            <div class="recipe">
                ${recipeObject.recipe}
            </div>
        </div>
        
    `
    recipesModal.style.display = 'block'
    const addDrink = addDrinkOption.checked
    if(addDrink){
        renderDrink(recipeObject);
    }
    }
}
function renderDrink(object){
    setTimeout(function(){
        drinkModallInner.innerHTML =  `
        <h2>${object.drinks[0]}</h2>
        <img 
        class="recipe-img" 
        src="./${object.drinks[1]}"
        alt="${object.drinks[0]}"
        >        
        `
        drinksModal.style.display = 'block'
    },2000);
}
function getSingleIngredientObject(){
    const IngredientsArray = getMatchingIngredientsArray();
    if(IngredientsArray){
        if(IngredientsArray.length === 1){
            return IngredientsArray[0];// get one object
        }
        else{
            const randomNumber = Math.floor(Math.random() * IngredientsArray.length);
            return IngredientsArray[randomNumber];
        }
    }
}

function getMatchingIngredientsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedIngredient = document.querySelector('input[type="radio"]:checked').value
        
        const IngredientsArray = recipesData.filter(function(ele){
            return ele.Ingredients.includes(selectedIngredient)
        });

        return IngredientsArray // return all the array  containes objects having selectedIngredient in there ingredients

    } 
}

function getIngredientsArray(recipes){
    const IngredientsArray = [];    
    for (let Recipe of recipes){
        for (let recipe of Recipe.Ingredients){
            if (!IngredientsArray.includes(recipe)){//remove the repeat
                IngredientsArray.push(recipe);
            }
        }
    }
    return IngredientsArray;
}

function renderIngredientsRadios(recipes){
        
    let radioItems = ``;
    const Ingredients = getIngredientsArray(recipes);
    for (let ingredient of Ingredients){
        let imageLink = getUnicImageForUnicIngredient(ingredient);
        radioItems += `
        <div class="item">
            <img src="${imageLink}" alt="">
            <div class="radio">
                <label for="${ingredient}">${ingredient}</label>
                <input
                type="radio"
                id="${ingredient}"
                value="${ingredient}"
                name="Ingredient"
                >
            </div>
        </div>
        `;
    }
    foodRadios.innerHTML = radioItems;
}
function getUnicImageForUnicIngredient(ingredient){
    if(ingredient === 'Chicken'){
        return 'images/chicken-face.jpg';
    }else if(ingredient === 'Rice'){
        return 'images/rice-face.jpg';
    }else if(ingredient === 'Potatoes'){
        return 'images/potatoes-face.jpg';
    }else if(ingredient === 'Tomatoes'){
        return 'images/tomatos-face.jpg';
    }else if(ingredient === 'Chocolate'){
        return 'images/choclate-face.jpg';
    }

}

renderIngredientsRadios(recipesData);

// Theme Mode Switch
switchModeBtn.addEventListener("click", toggleMode);

function toggleMode() {
    const item = document.querySelectorAll('.item');
    main.classList.toggle("light-mode");
    choixBox.classList.toggle("dark-mode");
    item.forEach(function(ele){
        ele.classList.toggle("dark-mode");
    })
    switchModeText.textContent = main.classList.contains("light-mode") ? "dark_mode" : "light_mode";
    switchModeBtn.classList.toggle('rotate');
}




