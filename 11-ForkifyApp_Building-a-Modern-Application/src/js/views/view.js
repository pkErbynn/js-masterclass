import icons from 'url:../../img/icons.svg';

export class View {
    _data;

    render(data) {
      this._data = data;
      const markup = this._generateMarkup();  // access from child class
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);   // parentElement var accessed from child class
    }

    _clear(){
      this._parentElement.innerHTML = ''; // empty container before inserting new markup
    }

    renderLoadingSpinner() {
      const markup = `
      <div class="spinner">
          <svg>
          <use href="${icons}#icon-loader"></use>
          </svg>
      </div>
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);  // insert element as first child element
    }

    renderError(message = this._errorMessage) { // nice trick on default param
      const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);  // insert element as first child element
    }
  
    renderSuccessMessage(message = this._sucessMessage) { // nice trick on default param
      const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
      `;
      // this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);  // insert element as first child element
    }
}