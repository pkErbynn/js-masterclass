import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js'; // default import..not curly brase {}

import 'regenerator-runtime/runtime'; // for polifilling async/await
import 'core-js/stable'; // polifilling everything else
import { async } from 'regenerator-runtime';
import searchView from './views/searchView.js';

const recipeContainer = document.querySelector('.recipe');


//API Documentation: https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const recipeController = async function () { // get recipe    
  try {
    const id = window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderLoadingSpinner();
    
    // 1. Loading recipe 
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
    recipeView.renderSuccessMessage();
  } catch (error) {
    recipeView.renderError()
  }
};

const searchResultsController = async function() {
  try {
    resultsView.renderLoadingSpinner();

    // 1. get search query
    const query = searchView.getQuery();
    if(!query) return;

    // 2. load search results
    await model.loadSearchResults(query);
    console.log(model.state.search.results);

    // 3. render search results
    resultsView.render(model.state.search.results);
  } catch (error) {
    console.log('search error');
    console.log(error);
  }
}
searchResultsController();

const init = function() {
  recipeView.addRenderHandler(recipeController);
  searchView.addSearchHandler(searchResultsController);
}

init();