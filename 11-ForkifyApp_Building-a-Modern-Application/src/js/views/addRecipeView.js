import { View } from './view';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _successMessage = 'Recipe was uploaded successfully :)'

    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _addRecipeFormBtn = document.querySelector('.nav__btn--add-recipe');
    _closeFormBtn = document.querySelector('.btn--close-modal');

    constructor(){  // registering and listening to click event 
        super();
        this._addShowWindowHandler();
        this._addHideWindowHandler();
    }

    toggleWindowDisplay() {
        this._overlay.classList.toggle('hidden'); // add/remove hidden class
        this._window.classList.toggle('hidden'); // add/remove hidden class
    }

    _addShowWindowHandler(){ // no controller as handler cus it has nothing to deal with api/feteching data in first place
        this._addRecipeFormBtn.addEventListener('click', this.toggleWindowDisplay.bind(this)); // .bind(this) ***
    }

    _addHideWindowHandler(){ // no controoler + has two ways of closing form
        this._closeFormBtn.addEventListener('click', this.toggleWindowDisplay.bind(this)); // .bind(this) ***
        this._overlay.addEventListener('click', this.toggleWindowDisplay.bind(this)); // .bind(this) ***
    }

    _addPostRecipeHandler(handler){ // post recipe...related to api to calls so need a handler parameter
        this._parentElement.addEventListener('submit', e => {
            e.preventDefault(); // prevent form refresh
            const dataArr = [...new FormData(this._parentElement)]; // 'this' refer to the caller, _parentElement. Bind would have been object of this entire class
            const dataObj = Object.fromEntries(dataArr);
            handler(dataObj);   // passing data to handler/listener
        })
    }

    _generateMarkup(){
    }
}

export default new AddRecipeView();   // only single instance to caller + constructor execution
