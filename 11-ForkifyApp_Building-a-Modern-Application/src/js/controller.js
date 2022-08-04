import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'regenerator-runtime/runtime'; // for polifilling async/await
import 'core-js/stable'; // polifilling everything else

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


//API Documentation: https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const recipeController = async function () { // get recipe
    
  try {
    const id = window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderLoadingSpinner();
    
    // 1. Loading recipe 
    await model.loadRecipe("5ed6604591c37cdc054bc886");
    const {recipe} = model.state;

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error)
  }
}

recipeController();

['load', 'hashchange'].forEach(ev => window.addEventListener(ev, recipeController))