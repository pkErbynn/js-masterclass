import { View } from './view';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {    // search result view
    _parentElement = document.querySelector('.results');
    _errorMessage = "No recipes found for this query! Please try again ;)";

    _generateMarkup(){
        console.log('results view', this._data);
        return this._data.map(this._generateSingleSearchMarkup).join('');
    }

    _generateSingleSearchMarkup(result) {
        return `
        <li class="preview">
            <a class="preview__link" href="#${result.id}">
            <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
            </div>
            </a>
        </li>
        `;
    }
}

export default new ResultsView();   // only single instance to caller

{/* <a class="preview__link preview__link--active" href="#${result.id}"> - help get recipe id via the url address*/}