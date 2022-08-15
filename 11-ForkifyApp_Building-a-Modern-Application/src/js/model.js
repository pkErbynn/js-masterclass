// Model and Service Layer

import { async } from "regenerator-runtime"
import { APP_URL } from "./config";
import { RESULT_PER_PAGE } from "./config";
import { getJSON } from "./helper";

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
export const loadRecipe = async function(id) {
    try {
        const data = await getJSON(`${APP_URL}${id}`);

        let { recipe } = data.data;
        state.recipe = {
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          sourceUrl: recipe.source_url,
          image: recipe.image_url,
          servings: recipe.servings,
          cookingTime: recipe.cooking_time,
          ingredients: recipe.ingredients
        }
        console.log("recipes", state.recipe);

        // if the incoming rendering recipe is found in the bookmark array, make its bookmark status as true
        // that's the reason for the bookmark array
        console.log('bkmark', state.bookmarks);
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

export const bookmarkRecipe = function(recipe) {
    state.bookmarks.push(recipe);

    // bookmark current recipe -  // extra check to see if the incoming recipe (from browser) == to the state data in memory (from api)
    if(recipe.id == state.recipe.id){
        state.recipe.isBookmarked = true;
    }
}

export const deleteBookmarkedRecipe = function(id) {  // unbookmark
    const index = state.bookmarks.findIndex(recipe => recipe.id === id);
    if(!(index >= 0)) return; // guard clause

    state.bookmarks.splice(index, 1);   // core part of delete...splice not slice

    // unbookmark current recipe on page with xtra validation
    if(state.recipe.id == id){
        state.recipe.isBookmarked = false;
    }
}