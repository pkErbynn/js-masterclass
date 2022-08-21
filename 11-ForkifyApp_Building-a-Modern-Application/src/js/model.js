// Model and Service Layer

import { async } from "regenerator-runtime"
import { API_KEY, APP_URL } from "./config";
import { RESULT_PER_PAGE } from "./config";
import { getJSON, postJSON } from "./helper";

//////// model //////////////
export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RESULT_PER_PAGE,
        pageNumber: 1   // 1 as default
    },
    bookmarks: []
}

/////// services ////////////////

const createRecipeObject = function (data) {
    let { recipe } = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe?.key && {key: recipe?.key})  // create object if exists **
    }
}

export const loadRecipe = async function(id) {
    try {
        const data = await getJSON(`${APP_URL}${id}`);

        state.recipe = createRecipeObject(data);
        console.log("loaded recipes", state.recipe);

        // if the incoming rendering recipe is found in the bookmark array, make its bookmark status as true
        // that's the reason for the bookmark array
        if(state.bookmarks.some(bkmark => bkmark.id === id)) {
            state.recipe.isBookmarked = true;
        } else {
            state.recipe.isBookmarked = false;
        }
    } catch (error) {
        console.error(`${error} (something went wrong)`)
        throw error;
    }
}

export const loadSearchResults = async function(query) {
    try {
        const data = await getJSON(`${APP_URL}?search=${query}`);
        state.search.query = query;
        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            };
        });

        state.search.pageNumber = 1; // when a new recipe is searched...page has to be reset to 1
    } catch (error) {
        throw error;
    }
}

// for pagination
export const getSearchResultPage = function(pageNumber = state.search.pageNumber){
    state.search.pageNumber = pageNumber;

    const start = (pageNumber - 1) * state.search.resultsPerPage;
    const end = pageNumber * state.search.resultsPerPage;

    console.log('per page', state.search.results.slice(start, end));    // diff b/n start and end is 10
    return state.search.results.slice(start, end);
}

export const updateServings = function(newServings){
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    });

    state.recipe.servings = newServings;
}

// no need to export cus it's a private method
const persistBookmarks = function(){
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

export const bookmarkRecipe = function(recipe) {
    state.bookmarks.push(recipe);

    // bookmark current recipe -  // extra check to see if the incoming recipe (from browser) == to the state data in memory (from api)
    if(recipe.id == state.recipe.id){
        state.recipe.isBookmarked = true;
    }

    persistBookmarks();
}

export const deleteBookmarkedRecipe = function(id) {  // unbookmark
    const index = state.bookmarks.findIndex(recipe => recipe.id === id);
    if(!(index >= 0)) return; // guard clause

    state.bookmarks.splice(index, 1);   // core part of delete...splice not slice

    // unbookmark current recipe on page with xtra validation
    if(state.recipe.id == id){
        state.recipe.isBookmarked = false;
    }

    persistBookmarks();
}

export const postRecipe = async function (newRecipe) {
    try {
        const ingredientsArr = Object.entries(newRecipe);  //to convert from obj to entries
        const ingredients = ingredientsArr.filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
                                        .map(ingredient => {
                                            const ingredientArr = ingredient[1].replaceAll(' ', '').split(',');
                                            if(ingredientArr.length !== 3) {
                                                throw new Error('Invalid ingredient format. Please use the correct format :)')
                                            }
                                            const [quantity, unit, description] = ingredientArr;
                                            return { quantity: quantity ? +quantity : null, unit, description }  // enhanched literal
                                        });
        
        const recipe = {
            title: newRecipe.title,
            publisher: newRecipe.publisher,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            servings: +newRecipe.servings,
            cooking_time: +newRecipe.cookingTime,
            ingredients: ingredients
        }
        const data = await postJSON(`${APP_URL}?key=${API_KEY}`, recipe);
        console.log('data:', data);
        state.recipe = createRecipeObject(data);
        bookmarkRecipe(state.recipe);
    } catch (error) {
        throw error;
    }
}

const init = function() {
    const storage = localStorage.getItem('bookmarks');
    if(storage) {
        state.bookmarks = JSON.parse(storage);
    }
}
init();

// used under dev mode
// const clearBookmarksFromLocalStorage = function () {
//     localStorage.clear('bookmarks');
// };
// clearBookmarksFromLocalStorage();

