import { View } from './view';
import icons from 'url:../../img/icons.svg';

// unused class 

export class PreviewView extends View {    // search result view on left pane

    _parentElement = '';
    _errorMessage = '';

    _generateMarkup(){
        return this._data.map(this._generateSingleMarkup).join('');
    }

    _generateSingleMarkup(result) {
        const urlId = window.location.hash.slice(1);
        return `
            <li class="preview">
                <a class="preview__link ${result.id === urlId ? 'preview__link--active' : ''}" href="#${result.id}">
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


/* <a class="preview__link preview__link--active" href="#${result.id}"> - help get recipe id via the url address*/