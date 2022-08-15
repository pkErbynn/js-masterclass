import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js'; // default import..not curly brase {}

import 'regenerator-runtime/runtime'; // for polifilling async/await
import 'core-js/stable'; // polifilling everything else
import { async } from 'regenerator-runtime';
import searchView from './views/searchView.js';
import paginationButtonView from './views/paginationButtonView.js';

const recipeContainer = document.querySelector('.recipe');


//API Documentation: https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const recipesController = async function () { // get recipe    
  try {
    const id = window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderLoadingSpinner();
    
    // 0. update results view (on left pane) whenever clicked
    resultsView.update(model.getSearchResultPage()); // pagination result
    // resultsView.render(model.getSearchResultPage()); // causes page to flicker

    // 1. Loading recipe 
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
    // recipeView.renderSuccessMessage();
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

    // 3. render search results
    resultsView.render(model.getSearchResultPage());  // pagination result

    // 4. render initial pagination buttons
    paginationButtonView.render(model.state.search); 
  } catch (error) {
    console.log('search error');
    console.log(error);
  }
}

const paginationButtonsController = function(goToPageNumberResponseFromHandler) {
  // 1. render NEW search results
  resultsView.render(model.getSearchResultPage(goToPageNumberResponseFromHandler));  // pagination result

  // 2. render NEW pagination buttons
  paginationButtonView.render(model.state.search); 
}

const updateServingsController = function (newServings) {
  // update recipe servings in model service
  model.updateServings(newServings);

  // re-render view
  recipeView.update(model.state.recipe);  // instead of re-rendering the whole page, only the changed sections will be re-rendered for efficient loading
  // recipeView.render(model.state.recipe);
}

const bookmarksController = function() {
  console.log('before bk', model.state.bookmarks);
  if(!model.state.recipe.isBookmarked) {
    model.bookmarkRecipe(model.state.recipe);
  } else {
    model.deleteBookmarkedRecipe(model.state.recipe.id)
  }
  console.log('after bk', model.state.bookmarks);

  console.log(model.state.recipe);

  recipeView.update(model.state.recipe);
}

const init = function() {
  recipeView.addRenderHandler(recipesController);  // pub-sub, event-driven way
  searchView.addSearchHandler(searchResultsController); // pub-sub, event-driven
  paginationButtonView.addPaginationHandler(paginationButtonsController); // pub-sub, event-driven
  recipeView.addUpdateServingsHandler(updateServingsController); // pub-sub, event-driven
  recipeView.addBookmarkHandler(bookmarksController);
}

init();



//==== MVC Pattern in short
// UI render successfully (in Views)
// UI has event handlers (in Views for async executions)
// Controller (in Controller) is registered as listener/handler to event handlers (in Views)
    // Some controllers are even registered when the ui is rendered/loaded first
// Controller later is called and then inturn, calls services in the model data layer (in Model file)