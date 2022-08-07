class SearchView {
    #parentEl = document.querySelector('.search');

    getQuery() {
        return this.#parentEl.querySelector('.search__field').value;
    }

    addSearchHandler(handler){
        this.#parentEl.addEventListener('submit', e => {
            e.preventDefault(); // prevent page reload
            handler();
        })
    }
}

export default new SearchView();