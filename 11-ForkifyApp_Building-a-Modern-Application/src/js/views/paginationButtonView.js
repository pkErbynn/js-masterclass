import { View } from "./view";
import icons from 'url:../../img/icons.svg';


class PaginationButtonView extends View{
    _parentElement = document.querySelector('.pagination');

    addPaginationHandler(handler) {
        this._parentElement.addEventListener('click', e => {
            const sourceBtn = e.target.closest('.btn--inline');
            if(!sourceBtn) return; // guard clause

            const goToPageBtnNumber = +sourceBtn.dataset.goto;  // accessing data attribute
            handler(goToPageBtnNumber); // passing data to handler for further process
        })
    }

    _generateMarkup() {
        const numOfPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        const currentPage = this._data.pageNumber;

        // page one with no other subsequent page
        if(currentPage === 1 && numOfPages > 1) {
            return `
            <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button> 
            `;
        }

        // only page one
        if(numOfPages === 1){
            return ''
        }

        // last page
        if(currentPage === numOfPages && numOfPages > 1){
            return `
            <button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}.svg#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
            </button>
            `
        }

        // other pages - middle of the pages
        if(currentPage < numOfPages){
            return `
                <button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}.svg#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
                <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button> 
            `
        }
    }
}

export default new PaginationButtonView();